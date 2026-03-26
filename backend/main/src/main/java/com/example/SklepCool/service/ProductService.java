package com.example.SklepCool.service;

import com.example.SklepCool.dto.ProductDto;
import com.example.SklepCool.dto.request.ProductRequest;
import com.example.SklepCool.exception.NotFoundException;
import com.example.SklepCool.model.Product;
import com.example.SklepCool.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    public ProductDto getProductById(int id) {
        var product = getById(id);

        return mapToDto(product);
    }

    public Page<ProductDto> getProducts(Pageable pageable) {
        return repository.findAll(pageable)
                .map(this::mapToDto);
    }


    public void save(ProductRequest product) {
        var toSave = new Product(product.getName(), product.getPrice(), product.getQuantity(), product.getImageUrl());
        repository.save(toSave);
    }

    public void updateProduct(Integer id, ProductRequest request) {
        var product = getById(id);

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setImageUrl(request.getImageUrl());

        repository.save(product);
    }

    public void deleteProductById(int id) {
        var product = getById(id);

        repository.delete(product);
    }

    private Product getById(Integer id) {
        return repository.findById(id).orElseThrow(() ->
                new NotFoundException("Product with id: %d not found".formatted(id)));
    }

    private ProductDto mapToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .imageUrl(product.getImageUrl())
                .build();
    }

}

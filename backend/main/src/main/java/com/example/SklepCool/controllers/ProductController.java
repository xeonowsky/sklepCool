package com.example.SklepCool.controllers;

import com.example.SklepCool.dto.ProductDto;
import com.example.SklepCool.dto.request.ProductRequest;
import com.example.SklepCool.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor

public class ProductController {

    private final ProductService productService;

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable UUID id) {
        return productService.getProductById(id);
    }

    @GetMapping
    public Page<ProductDto> getProducts(@PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC)
                                        Pageable pageable) {
        return productService.getProducts(pageable);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void saveProduct(@RequestBody @Valid ProductRequest product) {
        productService.save(product);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateProduct(@PathVariable UUID id, @RequestBody @Valid ProductRequest product) {
        productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable UUID id) {
        productService.deleteProductById(id);
    }

}

package com.example.SklepCool.controllers;

import com.example.SklepCool.dto.ProductDto;
import com.example.SklepCool.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v2/products")
public class ProductTest {

    private final ProductService productServiceTest;


    @RequestMapping
    @GetMapping
    public Page<ProductDto> getProducts(@PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC)
                                        Pageable pageable) {
        return productServiceTest.getProducts(pageable);
    }
}

package com.example.SklepCool.controllers;

import com.example.SklepCool.dto.request.ProductRequest;
import com.example.SklepCool.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/products")
public class ProductEdit {
    private final ProductService productService;
    @PostMapping
    public void saveProduct(@RequestBody @Valid ProductRequest product) {
        productService.save(product);
    }

    @PutMapping("/{id}")
    public void updateProduct(@PathVariable UUID id, @RequestBody @Valid ProductRequest product) {
        productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable UUID id) {
        productService.deleteProductById(id);
    }
}

package com.example.SklepCool.controllers;

import com.example.SklepCool.dto.CartDto;
import com.example.SklepCool.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public CartDto getCart(Authentication auth) {
        return cartService.getCartByUserId(auth);
    }

    @PostMapping("/{productId}")
    public void addProduct(Authentication auth, @PathVariable Integer productId) {
        cartService.addProduct(auth, productId);
    }

    @PutMapping("/decrease/{productId}")
    public void decreaseProduct(Authentication auth, @PathVariable Integer productId) {
        cartService.decreaseProduct(auth, productId);
    }

    @DeleteMapping("/{productId}")
    public void removeProduct(Authentication auth, @PathVariable Integer productId) {
        cartService.removeProduct(auth, productId);
    }

    @DeleteMapping
    public void clearCart(Authentication auth) {
        cartService.clearCart(auth);
    }
}

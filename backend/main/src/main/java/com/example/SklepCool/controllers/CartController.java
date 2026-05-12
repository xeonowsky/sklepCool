package com.example.SklepCool.controllers;

import com.example.SklepCool.dto.CartDto;
import com.example.SklepCool.dto.GuestCartDto;
import com.example.SklepCool.dto.ProductDto;
import com.example.SklepCool.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public CartDto getCart(Authentication auth) {
        System.out.println("USER: " + auth);
        return cartService.getCartByUserId(auth);
    }

    @PostMapping("/{productId}")
    public void addProduct(Authentication auth, @PathVariable UUID productId) {
        cartService.addProduct(auth, productId);
    }

    @PostMapping("/merge")
    public void mergeGuestCart(Authentication auth, @RequestBody GuestCartDto guestCart) {
        cartService.mergeGuestCart(auth, guestCart.getItems());
    }


    @PutMapping("/decrease/{productId}")
    public void decreaseProduct(Authentication auth, @PathVariable UUID productId) {
        cartService.decreaseProduct(auth, productId);
    }

    @DeleteMapping("/{productId}")
    public void removeProduct(Authentication auth, @PathVariable UUID productId) {
        cartService.removeProduct(auth, productId);
    }

    @DeleteMapping
    public void clearCart(Authentication auth) {
        cartService.clearCart(auth);
    }
}

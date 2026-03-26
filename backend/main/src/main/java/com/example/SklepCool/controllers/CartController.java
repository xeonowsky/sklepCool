package com.example.SklepCool.controllers;


import com.example.SklepCool.model.Cart;
import com.example.SklepCool.model.Product;
import com.example.SklepCool.service.CartService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public Cart getCart(HttpSession session){
        return cartService.getCart(session);
    }

    @PostMapping("/add")
    public void addProduct(@RequestBody Product product, HttpSession session){
        cartService.addProduct(session, product);
    }

    @DeleteMapping("/clear")
    public void clearCart(HttpSession session){
        cartService.clearCart(session);
    }
}
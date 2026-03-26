package com.example.SklepCool.service;


import com.example.SklepCool.model.Cart;
import com.example.SklepCool.model.Product;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private static final String CART_SESSION_KEY = "cart";

    public Cart getCart(HttpSession session){
        Cart cart = (Cart) session.getAttribute(CART_SESSION_KEY);

        if(cart == null){
            cart = new Cart();
            session.setAttribute(CART_SESSION_KEY, cart);
        }

        return cart;
    }

    public void addProduct(HttpSession session, Product product){
        Cart cart = getCart(session);
        cart.addProduct(product);
    }

    public void clearCart(HttpSession session){
        getCart(session).clearCart();
    }
}
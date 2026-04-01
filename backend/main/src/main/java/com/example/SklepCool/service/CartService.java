package com.example.SklepCool.service;

import com.example.SklepCool.dto.CartDto;
import com.example.SklepCool.exception.NotFoundException;
import com.example.SklepCool.mapper.CartItemMapper;
import com.example.SklepCool.mapper.ProductMapper;
import com.example.SklepCool.model.Cart;
import com.example.SklepCool.model.CartItem;
import com.example.SklepCool.repository.CartRepository;
import com.example.SklepCool.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository repository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final CartItemMapper cartItemMapper;

    public CartDto getCartByUserId(Authentication auth) {
        var userId = getUserId(auth);
        var cartEntity = getCart(userId);

        var cartItemsDto = cartItemMapper.mapToDtoList(cartEntity.getItems());

        return new CartDto(cartEntity.getId(), cartItemsDto);
    }

    public void addProduct(Authentication auth, Integer productId) {
        var userId = getUserId(auth);
        var cart = getCart(userId);
        var product = productRepository.getReferenceById(productId);

        var item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseGet(() -> {
                    var newItem = new CartItem();
                    newItem.setCart(cart);
                    newItem.setProduct(product);
                    newItem.setQuantity(0);
                    cart.getItems().add(newItem);
                    return newItem;
                });

        item.setQuantity(item.getQuantity() + 1);
        repository.save(cart);
    }

    public void decreaseProduct(Authentication auth, Integer productId) {
        var userId = getUserId(auth);
        var cart = getCart(userId);

        var item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Product not in cart"));

        if (item.getQuantity() > 1) {
            item.setQuantity(item.getQuantity() - 1);
        } else {
            cart.getItems().remove(item);
        }

        repository.save(cart);
    }

    public void removeProduct(Authentication auth, Integer productId) {
        var userId = getUserId(auth);
        var cart = getCart(userId);
        cart.getItems().removeIf(i -> i.getProduct().getId().equals(productId));
        repository.save(cart);
    }

    public void clearCart(Authentication auth) {
        var userId = getUserId(auth);
        var cart = getCart(userId);
        cart.getItems().clear();
        repository.save(cart);
    }

    private Integer getUserId(Authentication auth) {
        var email = auth.getName();
        return userService.findByEmail(email).getId();
    }

    private Cart getCart(Integer userId) {
        return repository.findByUserId(userId)
                .orElseGet(() -> {
                    var cart = new Cart();
                    cart.setUserId(userId);
                    return repository.save(cart);
                });
    }
}
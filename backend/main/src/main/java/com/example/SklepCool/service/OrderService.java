package com.example.SklepCool.service;

import com.example.SklepCool.dto.AvailableProductDto;
import com.example.SklepCool.dto.CreateOrderDto;
import com.example.SklepCool.dto.NotEnoughProductDto;
import com.example.SklepCool.exception.NotFoundException;
import com.example.SklepCool.model.CartItem;
import com.example.SklepCool.model.Order;
import com.example.SklepCool.model.OrderItem;
import com.example.SklepCool.model.Product;
import com.example.SklepCool.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;
    private final CartService cartService;
    private final UserService userService;
    private final ProductService productService;

    @Transactional
    public ResponseEntity<CreateOrderDto> createOrder(Authentication auth) {
        var userId = userService.getUserIdByAuth(auth);
        var currentCart = cartService.getCartByUserId(userId);

        if (currentCart.getItems().isEmpty()) {
            log.warn("Order creation failed: cart is empty for userId={}", userId);
            throw new NotFoundException("Cart is empty");
        }

        var order = new Order();
        order.setUserId(userId);

        var orderItems = new ArrayList<OrderItem>();
        var availableProducts = new ArrayList<ProductToOrder>();
        var notEnoughProducts = new ArrayList<NotEnoughProductDto>();

        for (var cartItem : currentCart.getItems()) {

            var product = productService.findByIdForUpdate(cartItem.getProduct().getId());

            if (product.getQuantity() < cartItem.getQuantity()) {
                log.warn("Not enough stock for product id={} (requested={}, available={})",
                        product.getId(), cartItem.getQuantity(), product.getQuantity());
                notEnoughProducts.add(new NotEnoughProductDto(product.getId(),
                        cartItem.getQuantity(), product.getQuantity()));
            }
            else {
                availableProducts.add(new ProductToOrder(product, cartItem));
            }
        }

        var available = availableProducts.stream()
                .map(product ->
                        new AvailableProductDto(product.product.getId(), product.product.getName(),
                                product.product.getPrice(), product.cartItem.getQuantity()))
                .toList();

        if (!notEnoughProducts.isEmpty()) {
            log.info("Order cannot be created: {} products lack stock", notEnoughProducts.size());

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new CreateOrderDto(available, notEnoughProducts));
        }

        log.info("All products available. Proceeding with order creation.");

        for (var productToOrder : availableProducts) {
            var product = productToOrder.product;
            var cartItem = productToOrder.cartItem;

            product.setQuantity(product.getQuantity() - cartItem.getQuantity());
            productService.save(product);

            var orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .priceAtPurchase(product.getPrice())
                    .build();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);

        repository.save(order);
        cartService.clearCart(auth);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(new CreateOrderDto(available));
    }

    private record ProductToOrder(Product product, CartItem cartItem) {
    }
}

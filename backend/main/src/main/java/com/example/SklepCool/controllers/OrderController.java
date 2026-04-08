package com.example.SklepCool.controllers;

import com.example.SklepCool.dto.CreateOrderDto;
import com.example.SklepCool.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @PostMapping
    public ResponseEntity<CreateOrderDto> createOrder(Authentication auth) {
        return service.createOrder(auth);
    }

}

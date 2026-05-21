package com.example.SklepCool.controllers;

import com.example.SklepCool.dto.CheckoutSessionDto;
import com.example.SklepCool.dto.PaymentStatusDto;
import com.example.SklepCool.service.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
@Slf4j
public class PaymentController {

    private final PaymentService service;

    @PostMapping("/checkout/{orderId}")
    public ResponseEntity<CheckoutSessionDto> createCheckout(Authentication auth, @PathVariable UUID orderId) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        try {
            return ResponseEntity.ok(service.createCheckoutSession(auth, orderId));
        } catch (StripeException ex) {
            log.error("Stripe error while creating checkout for order {}", orderId, ex);
            return ResponseEntity.status(502).build();
        }
    }

    @PostMapping("/confirm/{orderId}")
    public ResponseEntity<PaymentStatusDto> confirm(Authentication auth, @PathVariable UUID orderId) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        try {
            return ResponseEntity.ok(service.confirmPayment(auth, orderId));
        } catch (StripeException ex) {
            log.error("Stripe error while confirming payment for order {}", orderId, ex);
            return ResponseEntity.status(502).build();
        }
    }
}

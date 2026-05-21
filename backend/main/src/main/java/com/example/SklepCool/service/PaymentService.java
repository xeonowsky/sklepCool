package com.example.SklepCool.service;

import com.example.SklepCool.config.StripeProperties;
import com.example.SklepCool.dto.CheckoutSessionDto;
import com.example.SklepCool.dto.PaymentStatusDto;
import com.example.SklepCool.exception.NotFoundException;
import com.example.SklepCool.model.Order;
import com.example.SklepCool.model.OrderItem;
import com.example.SklepCool.repository.OrderRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentService {

    private static final String STATUS_PENDING = "PENDING";
    private static final String STATUS_PAID = "PAID";

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final StripeProperties stripeProperties;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Transactional
    public CheckoutSessionDto createCheckoutSession(Authentication auth, UUID orderId) throws StripeException {
        var userId = userService.getUserIdByAuth(auth);
        var order = getOwnedOrder(orderId, userId);

        if (STATUS_PAID.equals(order.getPaymentStatus())) {
            throw new IllegalStateException("Order is already paid");
        }

        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new NotFoundException("Order has no items");
        }

        var paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(frontendUrl + "/payment/success?orderId=" + orderId
                        + "&session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(frontendUrl + "/payment/cancel?orderId=" + orderId)
                .putMetadata("orderId", orderId.toString());

        for (OrderItem item : order.getItems()) {
            paramsBuilder.addLineItem(buildLineItem(item));
        }

        var session = Session.create(paramsBuilder.build());

        order.setStripeSessionId(session.getId());
        orderRepository.save(order);

        log.info("Created Stripe Checkout session {} for order {}", session.getId(), orderId);

        return new CheckoutSessionDto(session.getId(), session.getUrl());
    }

    @Transactional
    public PaymentStatusDto confirmPayment(Authentication auth, UUID orderId) throws StripeException {
        var userId = userService.getUserIdByAuth(auth);
        var order = getOwnedOrder(orderId, userId);

        if (STATUS_PAID.equals(order.getPaymentStatus())) {
            return new PaymentStatusDto(orderId, STATUS_PAID, true);
        }

        if (order.getStripeSessionId() == null) {
            return new PaymentStatusDto(orderId, order.getPaymentStatus(), false);
        }

        var session = Session.retrieve(order.getStripeSessionId());

        if ("paid".equals(session.getPaymentStatus())) {
            order.setPaymentStatus(STATUS_PAID);
            orderRepository.save(order);
            log.info("Order {} marked as PAID", orderId);
            return new PaymentStatusDto(orderId, STATUS_PAID, true);
        }

        return new PaymentStatusDto(orderId, STATUS_PENDING, false);
    }

    private SessionCreateParams.LineItem buildLineItem(OrderItem item) {
        var unitAmount = Math.round(item.getPriceAtPurchase() * 100);

        return SessionCreateParams.LineItem.builder()
                .setQuantity(item.getQuantity().longValue())
                .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency(stripeProperties.getCurrency())
                                .setUnitAmount(unitAmount)
                                .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName(item.getProduct().getName())
                                                .build())
                                .build())
                .build();
    }

    private Order getOwnedOrder(UUID orderId, Integer userId) {
        var order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found: " + orderId));

        if (!order.getUserId().equals(userId)) {
            throw new NotFoundException("Order not found: " + orderId);
        }

        return order;
    }
}

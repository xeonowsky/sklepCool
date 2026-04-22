package com.example.SklepCool.scheduled;

import com.example.SklepCool.config.CartProperties;
import com.example.SklepCool.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CartCleanupScheduled {

    private final CartService cartService;
    private final CartProperties cartProperties;

    @Scheduled(cron = "${cart.cleanup-cron}")
    public void cleanup() {
        var updateAtBefore = LocalDateTime.now().minusMinutes(cartProperties.getExpirationMinutes());
        var expiredCarts = cartService.getCartsByUpdatedAtBefore(updateAtBefore);

        if (!expiredCarts.isEmpty()) {
            cartService.clearCart(expiredCarts);
        }
    }
}

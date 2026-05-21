package com.example.SklepCool.settings;

import com.example.SklepCool.config.StripeProperties;
import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class StripeConfig {

    private final StripeProperties stripeProperties;

    @PostConstruct
    public void init() {
        if (StringUtils.hasText(stripeProperties.getSecretKey())) {
            Stripe.apiKey = stripeProperties.getSecretKey();
            log.info("Stripe API key configured.");
        } else {
            log.warn("Stripe secret key is not set. Payments will not work until STRIPE_SECRET_KEY is provided.");
        }
    }
}

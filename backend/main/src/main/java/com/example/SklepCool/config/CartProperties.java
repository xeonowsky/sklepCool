package com.example.SklepCool.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cart")
@Getter
@Setter
public class CartProperties {

    private Long expirationMinutes;
    private String cleanupCron;

}

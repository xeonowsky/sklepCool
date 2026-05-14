package com.example.SklepCool;

import com.example.SklepCool.config.CartProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@EnableScheduling
@EnableConfigurationProperties(value = {CartProperties.class})
@SpringBootApplication
public class SklepCoolApplication {

	public static void main(String[] args) {
		SpringApplication.run(SklepCoolApplication.class, args);
	}

}

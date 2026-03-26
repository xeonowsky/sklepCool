package com.example.SklepCool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SklepCoolApplication {

	public static void main(String[] args) {
		SpringApplication.run(SklepCoolApplication.class, args);
	}

}

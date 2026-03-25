package com.example.SklepCool.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Product {

    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    private Double price;

    private Integer quantity;

    @Column(name = "image_url")
    private String imageUrl;

    public Product(String name, Double price, Integer quantity, String imageUrl) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }
}

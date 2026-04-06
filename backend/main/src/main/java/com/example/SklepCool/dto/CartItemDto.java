package com.example.SklepCool.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {

    private UUID id;
    private ProductDto product;
    private Integer quantity;

}

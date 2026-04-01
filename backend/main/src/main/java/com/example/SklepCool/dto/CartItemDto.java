package com.example.SklepCool.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {

    private Integer id;
    private ProductDto product;
    private Integer quantity;

}

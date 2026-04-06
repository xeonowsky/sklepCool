package com.example.SklepCool.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CreateOrderDto {

    private List<AvailableProductDto> availableProducts;
    private List<NotEnoughProductDto> notEnoughProducts;

    public CreateOrderDto(List<AvailableProductDto> availableProducts, List<NotEnoughProductDto> notEnoughProducts) {
        this.availableProducts = availableProducts;
        this.notEnoughProducts = notEnoughProducts;
    }

    public CreateOrderDto(List<AvailableProductDto> availableProducts) {
        this.availableProducts = availableProducts;
    }
}

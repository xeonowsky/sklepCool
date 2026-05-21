package com.example.SklepCool.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class CreateOrderDto {

    private UUID orderId;
    private List<AvailableProductDto> availableProducts;
    private List<NotEnoughProductDto> notEnoughProducts;

    public CreateOrderDto(List<AvailableProductDto> availableProducts, List<NotEnoughProductDto> notEnoughProducts) {
        this.availableProducts = availableProducts;
        this.notEnoughProducts = notEnoughProducts;
    }

    public CreateOrderDto(List<AvailableProductDto> availableProducts) {
        this.availableProducts = availableProducts;
    }

    public CreateOrderDto(UUID orderId, List<AvailableProductDto> availableProducts) {
        this.orderId = orderId;
        this.availableProducts = availableProducts;
    }
}

package com.example.SklepCool.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotEnoughProductDto {

    private UUID productId;
    private Integer requestedQuantity;
    private Integer remainderQuantity;

}

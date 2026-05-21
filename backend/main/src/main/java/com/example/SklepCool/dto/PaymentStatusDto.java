package com.example.SklepCool.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentStatusDto {

    private UUID orderId;
    private String paymentStatus;
    private boolean paid;
}

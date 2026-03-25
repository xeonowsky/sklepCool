package com.example.SklepCool.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    @NotEmpty
    private String name;

    @NotNull
    @Positive
    private Double price;

    @NotNull
    @Positive
    private Integer quantity;

    @NotEmpty
    @Size(min = 5, max = 150)
    private String imageUrl;

}

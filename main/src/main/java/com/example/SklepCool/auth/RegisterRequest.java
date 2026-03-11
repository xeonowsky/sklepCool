package com.example.SklepCool.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @Email(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")
    @NotEmpty
    private String email;

    @NotEmpty
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "Hasło musi mieć minimum 8 znaków, jedną literę, jedną cyfrę i jeden znak specjalny")
    private String password;

}



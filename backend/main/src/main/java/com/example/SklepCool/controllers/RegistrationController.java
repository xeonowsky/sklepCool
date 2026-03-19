package com.example.SklepCool.controllers;

import com.example.SklepCool.auth.AuthenticationResponse;
import com.example.SklepCool.service.AuthenticationService;
import com.example.SklepCool.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class RegistrationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public AuthenticationResponse registerUser(@RequestBody RegisterRequest request) {
        return authenticationService.registration(request);
    }
}
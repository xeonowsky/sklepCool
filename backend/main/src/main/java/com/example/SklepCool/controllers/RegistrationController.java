package com.example.SklepCool.controllers;

import com.example.SklepCool.auth.AuthenticationResponse;
import com.example.SklepCool.service.AuthenticationService;
import com.example.SklepCool.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
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
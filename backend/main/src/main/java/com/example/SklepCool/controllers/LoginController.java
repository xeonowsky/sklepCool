package com.example.SklepCool.controllers;

import com.example.SklepCool.auth.AuthenticationRequest;
import com.example.SklepCool.auth.AuthenticationResponse;
import com.example.SklepCool.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class LoginController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request,
                                        HttpServletResponse response) {
        return authenticationService.authenticate(response, request);
    }

}
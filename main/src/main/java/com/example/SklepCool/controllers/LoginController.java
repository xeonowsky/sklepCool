package com.example.SklepCool.controllers;

import com.example.SklepCool.auth.AuthenticationRequest;
import com.example.SklepCool.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class LoginController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest loginRequest,
                                   HttpServletResponse response) {
        authenticationService.authenticate(response, loginRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
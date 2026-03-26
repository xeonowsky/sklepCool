package com.example.SklepCool.service;

import com.example.SklepCool.auth.AuthenticationRequest;
import com.example.SklepCool.auth.AuthenticationResponse;
import com.example.SklepCool.auth.RegisterRequest;
import com.example.SklepCool.exception.AuthentificationFailedException;
import com.example.SklepCool.model.Role;
import com.example.SklepCool.model.User;
import com.example.SklepCool.util.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse registration(RegisterRequest registerRequest) {
        var userAlreadyExist = userService.isExistByEmail(registerRequest.getEmail());

        if (userAlreadyExist) {
            throw new AuthentificationFailedException("User with email: %s already present"
                    .formatted(registerRequest.getEmail()), HttpStatus.CONFLICT.value());
        }

        var user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();

        try {
            var jwToken = jwtService.generateToken(user);
            userService.save(user);
            return new AuthenticationResponse(jwToken);
        } catch (Exception e) {
            throw new AuthentificationFailedException("Failed during registration process",
                    HttpStatus.BAD_REQUEST.value());
        }
    }

    public void authenticate(HttpServletResponse response, AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()));

            var user = userService.findByEmail(request.getEmail());

            var jwtToken = jwtService.generateToken(user);
            CookieUtil.addJwtCookie(response, jwtToken);

            new AuthenticationResponse(jwtToken);

        } catch (Exception e) {
            throw new AuthentificationFailedException("Failed during authentication process",
                    HttpStatus.UNAUTHORIZED.value());
        }
    }
}
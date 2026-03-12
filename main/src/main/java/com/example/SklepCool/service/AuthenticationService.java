package com.example.SklepCool.service;

import com.example.SklepCool.auth.AuthenticationRequest;
import com.example.SklepCool.auth.AuthenticationResponse;
import com.example.SklepCool.auth.RegisterRequest;
import com.example.SklepCool.exception.AuthentificationFailedException;
import com.example.SklepCool.model.Role;
import com.example.SklepCool.model.User;
import com.example.SklepCool.repository.UserRepository;
import com.example.SklepCool.util.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse registration(RegisterRequest registerRequest) {
        try {
            var user = User.builder()
                    .email(registerRequest.getEmail())
                    .password(passwordEncoder.encode(registerRequest.getPassword()))
                    .role(Role.USER)
                    .build();

            var jwToken = jwtService.generateToken(user);
            userRepository.save(user);

            return new AuthenticationResponse(jwToken);
        } catch (Exception e) {
            throw new AuthentificationFailedException(
                    "Failed during registration process",
                    HttpStatus.BAD_REQUEST.value());
        }
    }

    public void authenticate(HttpServletResponse response, AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()));

            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException(
                            "User not found with email: %s".formatted(request.getEmail())));

            var jwtToken = jwtService.generateToken(user);
            CookieUtil.addJwtCookie(response, jwtToken);

            new AuthenticationResponse(jwtToken);

        } catch (Exception e) {
            throw new AuthentificationFailedException(
                    "Failed during authentication process",
                    HttpStatus.UNAUTHORIZED.value());
        }
    }
}
package com.example.SklepCool.auth;

import com.example.SklepCool.Repositories.userRepository;
import com.example.SklepCool.model.SklepUser;
import com.example.SklepCool.model.role;
import com.example.SklepCool.services.jwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final userRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final jwtService JwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse registration(RegisterRequest registerRequest){
        var user = SklepUser.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .Role(role.USER)
                .build();

        var jwtoken = JwtService.generateToken(user);
        repository.save(user);
        return AuthenticationResponse.builder()
                .token(jwtoken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword())
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow(()-> new UsernameNotFoundException("User not found"));
        var jwtoken = JwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtoken)
                .build();
    }
}
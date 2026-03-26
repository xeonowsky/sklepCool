package com.example.SklepCool.service;

import com.example.SklepCool.exception.UserNotFoundException;
import com.example.SklepCool.model.User;
import com.example.SklepCool.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    public User findByEmail(String email) {
        return repository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found with email: %s"
                .formatted(email)));
    }

    public boolean isExistByEmail(String email) {
        return repository.existsByEmail(email);
    }

    public void save(User user) {
        repository.save(user);
    }
}

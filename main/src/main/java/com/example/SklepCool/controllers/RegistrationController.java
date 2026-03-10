package com.example.SklepCool.controllers;

import com.example.SklepCool.auth.AuthenticationService;
import com.example.SklepCool.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class RegistrationController {
    private final AuthenticationService authenticationService;

    @GetMapping("/registration")
    public String getRegister(Model model) {
        model.addAttribute("registerRequest", new RegisterRequest());
        return "rejestracja";
    }

    @PostMapping("/registration")
    public String rejestracjaUzytkownika(@ModelAttribute("registerRequest") RegisterRequest request, Model model) {
        try {
            authenticationService.registration(request);
            model.addAttribute("successMessage", "Rejestracja zakończona sukcesem");
            return "redirect:/api/v1/logowanie";
        } catch (Exception e) {
            model.addAttribute("error", "Błąd rejestracji: " + e.getMessage());
            return "rejestracja";
        }
    }
}

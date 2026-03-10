package com.example.SklepCool.controllers;

import com.example.SklepCool.auth.AuthenticationRequest;
import com.example.SklepCool.auth.AuthenticationResponse;
import com.example.SklepCool.auth.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class LoginController {

    private final AuthenticationService authenticationS;

    @GetMapping("/api/v1/logowanie")
    public String  logIn(Model model){
        model.addAttribute("loginRequest", new AuthenticationRequest());
        return "logowanie";
    }

    @PostMapping("/api/v1/logowanie")
    public String loginProcess(@ModelAttribute("loginRequest") AuthenticationRequest loginRequest, HttpServletResponse response, Model model){
        try {
            var authResponse = authenticationS.authenticate(loginRequest);

            var cookie = new Cookie("jwt", authResponse.getToken());
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(60*60*24);
            response.addCookie(cookie);

            model.addAttribute("successMessage","Pomyślnie zalogowano");
            return "redirect:/api/v1/home";

        } catch (Exception e){
            model.addAttribute("errorMessage","Nie udało ci się zalogować"+ e.getMessage());
            return "logowanie";
        }
    }
}
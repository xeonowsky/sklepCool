package com.example.SklepCool.exception;

public class AuthentificationFailedException extends RuntimeException {

    public AuthentificationFailedException(String message, int httpCode) {
        super(message);
    }

}

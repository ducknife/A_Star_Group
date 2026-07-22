package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.AccountResponse;
import com.astarsquad.backend.dto.LoginRequest;
import com.astarsquad.backend.dto.LoginResponse;
import com.astarsquad.backend.security.JwtService;
import com.astarsquad.backend.service.AccountService;
import com.astarsquad.backend.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.Instant;

/**
 * The JWT is delivered only via an HttpOnly cookie, never in a JSON response body —
 * this is the point of moving off localStorage, since client-side JS (and any XSS
 * payload) can no longer read the token at all.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AccountService accountService;

    @PostMapping("/login")
    public AccountResponse login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        LoginResponse result = authService.login(request);
        Duration maxAge = Duration.between(Instant.now(), result.expiresAt());
        response.addHeader(HttpHeaders.SET_COOKIE, authCookie(result.token(), maxAge).toString());
        return accountService.findByUsername(result.username());
    }

    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {
        response.addHeader(HttpHeaders.SET_COOKIE, authCookie("", Duration.ZERO).toString());
    }

    @GetMapping("/me")
    public AccountResponse me(Authentication authentication) {
        if (authentication == null) {
            throw new BadCredentialsException("Chưa đăng nhập.");
        }
        return accountService.findByUsername(authentication.getName());
    }

    private ResponseCookie authCookie(String token, Duration maxAge) {
        return ResponseCookie.from(JwtService.AUTH_COOKIE_NAME, token)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(maxAge)
                .build();
    }
}

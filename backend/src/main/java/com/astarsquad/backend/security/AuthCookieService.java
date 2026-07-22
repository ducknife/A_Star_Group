package com.astarsquad.backend.security;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.time.Duration;

/**
 * Builds the HttpOnly auth cookie consistently everywhere it's set (login, username
 * change, logout) so the cookie attributes never drift between call sites.
 */
@Component
public class AuthCookieService {

    public ResponseCookie build(String token, Duration maxAge) {
        return ResponseCookie.from(JwtService.AUTH_COOKIE_NAME, token)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(maxAge)
                .build();
    }
}

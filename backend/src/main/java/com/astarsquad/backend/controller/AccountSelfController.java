package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.AccountResponse;
import com.astarsquad.backend.dto.AccountSelfUpdateRequest;
import com.astarsquad.backend.security.AuthCookieService;
import com.astarsquad.backend.security.JwtService;
import com.astarsquad.backend.service.AccountService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.Instant;

/**
 * Self-service only: every method resolves the target account from the caller's own
 * authentication principal, never from a path/body parameter, so there is no way for
 * any role (including ADMIN) to reach another user's account through this controller.
 */
@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountSelfController {

    private final AccountService accountService;
    private final JwtService jwtService;
    private final AuthCookieService authCookieService;

    @GetMapping("/me")
    public AccountResponse me(Authentication authentication) {
        return accountService.findByUsername(authentication.getName());
    }

    @PutMapping("/me")
    public AccountResponse updateMe(
            @Valid @RequestBody AccountSelfUpdateRequest request,
            Authentication authentication,
            HttpServletResponse response
    ) {
        AccountService.SelfUpdateResult result = accountService.updateSelf(authentication.getName(), request);

        if (result.usernameChanged()) {
            // The JWT subject is the username, so it must be reissued under the new
            // name or the caller's next request would resolve to the old (now gone) one.
            String token = jwtService.generateToken(result.account().username(), result.account().role().name());
            Duration maxAge = Duration.between(Instant.now(), jwtService.extractExpiration(token));
            response.addHeader(HttpHeaders.SET_COOKIE, authCookieService.build(token, maxAge).toString());
        }

        return result.account();
    }
}

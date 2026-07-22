package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.AccountResponse;
import com.astarsquad.backend.dto.AccountSelfUpdateRequest;
import com.astarsquad.backend.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/me")
    public AccountResponse me(Authentication authentication) {
        return accountService.findByUsername(authentication.getName());
    }

    @PutMapping("/me")
    public AccountResponse updateMe(@Valid @RequestBody AccountSelfUpdateRequest request, Authentication authentication) {
        return accountService.updateSelf(authentication.getName(), request);
    }
}

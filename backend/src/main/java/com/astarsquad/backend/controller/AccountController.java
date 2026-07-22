package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.AccountRequest;
import com.astarsquad.backend.dto.AccountResponse;
import com.astarsquad.backend.dto.AccountRoleUpdateRequest;
import com.astarsquad.backend.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping
    public List<AccountResponse> findAll() {
        return accountService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AccountResponse create(@Valid @RequestBody AccountRequest request) {
        return accountService.create(request);
    }

    @PutMapping("/{id}/role")
    public AccountResponse updateRole(
            @PathVariable Long id,
            @Valid @RequestBody AccountRoleUpdateRequest request,
            Authentication authentication
    ) {
        return accountService.updateRole(id, request, authentication.getName());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, Authentication authentication) {
        accountService.delete(id, authentication.getName());
    }
}

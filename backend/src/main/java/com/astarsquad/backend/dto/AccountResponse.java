package com.astarsquad.backend.dto;

import com.astarsquad.backend.entity.Account;
import com.astarsquad.backend.entity.AccountRole;

import java.time.Instant;

public record AccountResponse(
        Long id,
        String username,
        AccountRole role,
        String displayName,
        Instant createdAt
) {
    public static AccountResponse from(Account a) {
        return new AccountResponse(a.getId(), a.getUsername(), a.getRole(), a.getDisplayName(), a.getCreatedAt());
    }
}

package com.astarsquad.backend.dto;

import jakarta.validation.constraints.Size;

/**
 * currentPassword is required only when newPassword is provided — verified in
 * AccountService before allowing the password change. username is optional; when
 * provided and different from the caller's current username, AccountService checks
 * it's not already taken and re-issues the auth cookie under the new identity.
 */
public record AccountSelfUpdateRequest(
        @Size(min = 3, max = 100) String username,
        @Size(max = 150) String displayName,
        String currentPassword,
        @Size(min = 6, max = 200) String newPassword
) {
}

package com.astarsquad.backend.dto;

import jakarta.validation.constraints.Size;

/**
 * currentPassword is required only when newPassword is provided — verified in
 * AccountService before allowing the password change.
 */
public record AccountSelfUpdateRequest(
        @Size(max = 150) String displayName,
        String currentPassword,
        @Size(min = 6, max = 200) String newPassword
) {
}

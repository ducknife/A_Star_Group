package com.astarsquad.backend.dto;

import com.astarsquad.backend.entity.AccountRole;
import jakarta.validation.constraints.NotNull;

public record AccountRoleUpdateRequest(
        @NotNull AccountRole role
) {
}

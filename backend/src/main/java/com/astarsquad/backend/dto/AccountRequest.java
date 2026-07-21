package com.astarsquad.backend.dto;

import com.astarsquad.backend.entity.AccountRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AccountRequest(
        @NotBlank @Size(min = 3, max = 100) String username,
        @NotBlank @Size(min = 6, max = 200) String password,
        @NotNull AccountRole role,
        @Size(max = 150) String displayName
) {
}

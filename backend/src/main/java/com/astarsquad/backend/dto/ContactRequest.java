package com.astarsquad.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank @Size(max = 150) String name,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(max = 2000) String message
) {
}

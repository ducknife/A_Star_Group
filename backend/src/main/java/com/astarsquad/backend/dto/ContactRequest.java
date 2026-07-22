package com.astarsquad.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank @Size(max = 150) String name,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(max = 2000) String message,
        // Honeypot: a hidden field real users never fill in. Bots that auto-fill every
        // input will populate it, letting us silently drop the message.
        String website
) {
}

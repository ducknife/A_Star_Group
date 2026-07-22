package com.astarsquad.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MemberRequest(
        @NotBlank @Size(max = 150) String fullName,
        @NotBlank @Size(max = 200) String university,
        @NotBlank @Size(max = 200) String scholarshipName,
        @Size(max = 150) String major,
        Integer graduationYear,
        @Size(max = 1000) String bio,
        @Size(max = 300) String linkedinUrl,
        @Size(max = 300) String githubUrl,
        @Size(max = 300) String otherUrl,
        boolean featured,
        int sortOrder
) {
}

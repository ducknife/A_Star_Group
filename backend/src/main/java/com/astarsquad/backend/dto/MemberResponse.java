package com.astarsquad.backend.dto;

import com.astarsquad.backend.entity.Member;

public record MemberResponse(
        Long id,
        String fullName,
        String university,
        String scholarshipName,
        String major,
        Integer graduationYear,
        String bio,
        String bioEn,
        String photoUrl,
        String linkedinUrl,
        String githubUrl,
        String otherUrl,
        boolean featured,
        int sortOrder
) {
    public static MemberResponse from(Member m) {
        return new MemberResponse(
                m.getId(),
                m.getFullName(),
                m.getUniversity(),
                m.getScholarshipName(),
                m.getMajor(),
                m.getGraduationYear(),
                m.getBio(),
                m.getBioEn(),
                m.getPhotoUrl(),
                m.getLinkedinUrl(),
                m.getGithubUrl(),
                m.getOtherUrl(),
                m.isFeatured(),
                m.getSortOrder()
        );
    }
}

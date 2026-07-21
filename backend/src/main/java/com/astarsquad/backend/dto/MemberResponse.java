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
        String photoUrl,
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
                m.getPhotoUrl(),
                m.isFeatured(),
                m.getSortOrder()
        );
    }
}

package com.astarsquad.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(nullable = false, length = 200)
    private String university;

    @Column(name = "scholarship_name", nullable = false, length = 200)
    private String scholarshipName;

    @Column(length = 150)
    private String major;

    @Column(name = "graduation_year")
    private Integer graduationYear;

    @Column(length = 1000)
    private String bio;

    @Column(name = "bio_en", length = 1000)
    private String bioEn;

    @Column(name = "photo_url", length = 500)
    private String photoUrl;

    @Column(name = "linkedin_url", length = 300)
    private String linkedinUrl;

    @Column(name = "github_url", length = 300)
    private String githubUrl;

    @Column(name = "other_url", length = 300)
    private String otherUrl;

    @Column(nullable = false)
    @Builder.Default
    private boolean featured = false;

    @Column(name = "sort_order", nullable = false)
    @Builder.Default
    private int sortOrder = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}

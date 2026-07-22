package com.astarsquad.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "title_en", length = 200)
    private String titleEn;

    @Column(length = 1000)
    private String description;

    @Column(name = "description_en", length = 1000)
    private String descriptionEn;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private DocumentCategory category;

    /** Original file name shown to users. */
    @Column(name = "file_name", nullable = false)
    private String fileName;

    /** Cloudinary public_id, required to delete the asset later. */
    @Column(name = "cloudinary_public_id", nullable = false)
    private String cloudinaryPublicId;

    /** Cloudinary secure delivery URL. */
    @Column(name = "file_url", nullable = false, length = 500)
    private String fileUrl;

    /** Cloudinary public_id of the thumbnail image, required to delete it later. */
    @Column(name = "thumbnail_public_id", nullable = false)
    private String thumbnailPublicId;

    @Column(name = "thumbnail_url", nullable = false, length = 500)
    private String thumbnailUrl;

    @Column(name = "file_size", nullable = false)
    private long fileSize;

    @Column(name = "content_type", nullable = false, length = 150)
    private String contentType;

    @Column(name = "download_count", nullable = false)
    @Builder.Default
    private int downloadCount = 0;

    /** Username of the account (admin/mod/member) who uploaded this document. */
    @Column(name = "uploaded_by", length = 100)
    private String uploadedBy;

    @CreationTimestamp
    @Column(name = "uploaded_at", nullable = false, updatable = false)
    private Instant uploadedAt;
}

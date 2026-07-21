package com.astarsquad.backend.dto;

import com.astarsquad.backend.entity.Document;
import com.astarsquad.backend.entity.DocumentCategory;

import java.time.Instant;

public record DocumentResponse(
        Long id,
        String title,
        String description,
        DocumentCategory category,
        String fileName,
        String thumbnailUrl,
        long fileSize,
        String contentType,
        int downloadCount,
        String uploadedBy,
        Instant uploadedAt
) {
    public static DocumentResponse from(Document d) {
        return new DocumentResponse(
                d.getId(),
                d.getTitle(),
                d.getDescription(),
                d.getCategory(),
                d.getFileName(),
                d.getThumbnailUrl(),
                d.getFileSize(),
                d.getContentType(),
                d.getDownloadCount(),
                d.getUploadedBy(),
                d.getUploadedAt()
        );
    }
}

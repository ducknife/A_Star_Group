package com.astarsquad.backend.repository;

import com.astarsquad.backend.entity.Document;
import com.astarsquad.backend.entity.DocumentCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findAllByOrderByUploadedAtDesc();

    List<Document> findAllByCategoryOrderByUploadedAtDesc(DocumentCategory category);
}

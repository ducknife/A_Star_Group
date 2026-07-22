package com.astarsquad.backend.repository;

import com.astarsquad.backend.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DocumentRepository extends JpaRepository<Document, Long>, JpaSpecificationExecutor<Document> {

    @Modifying
    @Query("UPDATE Document d SET d.uploadedBy = :newUsername WHERE d.uploadedBy = :oldUsername")
    int renameUploadedBy(@Param("oldUsername") String oldUsername, @Param("newUsername") String newUsername);
}

package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.DocumentResponse;
import com.astarsquad.backend.entity.DocumentCategory;
import com.astarsquad.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping
    public List<DocumentResponse> findAll(@RequestParam(required = false) DocumentCategory category) {
        return documentService.findAll(category);
    }

    @GetMapping("/{id}")
    public DocumentResponse findById(@PathVariable Long id) {
        return documentService.findById(id);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Void> download(@PathVariable Long id) {
        String url = documentService.prepareDownload(id);
        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.LOCATION, url)
                .build();
    }
}

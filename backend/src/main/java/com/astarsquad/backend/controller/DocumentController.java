package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.DocumentResponse;
import com.astarsquad.backend.entity.DocumentCategory;
import com.astarsquad.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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

    /**
     * Streams the file through our own server rather than redirecting to Cloudinary directly.
     * Cloudinary's fl_attachment transformation (which would let a redirect carry a custom
     * filename) only works for image/video resources, not "raw" — so a plain redirect can
     * only ever produce Cloudinary's internal UUID-based filename. Proxying lets us set our
     * own Content-Disposition with the real original filename.
     */
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> download(@PathVariable Long id) throws MalformedURLException {
        var payload = documentService.prepareDownload(id);
        Resource resource = new UrlResource(URI.create(payload.url()));
        String encodedName = URLEncoder.encode(payload.fileName(), StandardCharsets.UTF_8).replace("+", "%20");

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(payload.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedName)
                .body(resource);
    }
}

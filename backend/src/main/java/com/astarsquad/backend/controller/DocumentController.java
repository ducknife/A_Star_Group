package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.DocumentResponse;
import com.astarsquad.backend.dto.PageResponse;
import com.astarsquad.backend.entity.DocumentCategory;
import com.astarsquad.backend.exception.FileStorageException;
import com.astarsquad.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final RestClient restClient = RestClient.create();

    @GetMapping
    public PageResponse<DocumentResponse> findAll(
            @RequestParam(required = false) DocumentCategory category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        return documentService.findAll(category, search, page, size);
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
     *
     * Fetches the bytes via RestClient rather than UrlResource: UrlResource wraps a plain
     * java.net.HttpURLConnection whose failures only surface lazily when Spring's response
     * writer calls getInputStream() — by then headers/status may already be committed, and
     * the error becomes an opaque unhandled exception. RestClient's retrieve() fails
     * immediately and deterministically on a non-2xx response, before we've touched the
     * response at all, so we can turn it into a clear error every time.
     */
    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> download(@PathVariable Long id) {
        var payload = documentService.prepareDownload(id);

        byte[] content;
        try {
            content = restClient.get()
                    .uri(payload.url())
                    .retrieve()
                    .body(byte[].class);
        } catch (RestClientException ex) {
            // Most commonly: Cloudinary's "Restricted media types" setting blocking
            // PDF/ZIP delivery for "raw" resources — an account setting, not a code bug.
            throw new FileStorageException(
                    "Không thể tải tệp tài liệu này từ máy chủ lưu trữ. Vui lòng liên hệ quản trị viên.", ex);
        }

        String encodedName = URLEncoder.encode(payload.fileName(), StandardCharsets.UTF_8).replace("+", "%20");

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(payload.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedName)
                .body(content);
    }
}

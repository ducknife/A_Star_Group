package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.DocumentResponse;
import com.astarsquad.backend.entity.DocumentCategory;
import com.astarsquad.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/documents")
@RequiredArgsConstructor
public class DocumentAdminController {

    private final DocumentService documentService;

    @PostMapping(consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public DocumentResponse create(
            @RequestParam String title,
            @RequestParam(required = false) String titleEn,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String descriptionEn,
            @RequestParam DocumentCategory category,
            @RequestParam("file") MultipartFile file,
            @RequestParam("thumbnail") MultipartFile thumbnail,
            Authentication authentication
    ) {
        return documentService.create(
                title, titleEn, description, descriptionEn, category, file, thumbnail, authentication.getName()
        );
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public DocumentResponse update(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam(required = false) String titleEn,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String descriptionEn,
            @RequestParam DocumentCategory category,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail,
            Authentication authentication
    ) {
        return documentService.update(
                id, title, titleEn, description, descriptionEn, category, file, thumbnail,
                authentication.getName(), canManageAll(authentication)
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, Authentication authentication) {
        documentService.delete(id, authentication.getName(), canManageAll(authentication));
    }

    private boolean canManageAll(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ROLE_ADMIN") || a.equals("ROLE_MOD"));
    }
}

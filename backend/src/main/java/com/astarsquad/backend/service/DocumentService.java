package com.astarsquad.backend.service;

import com.astarsquad.backend.dto.DocumentResponse;
import com.astarsquad.backend.dto.PageResponse;
import com.astarsquad.backend.entity.Document;
import com.astarsquad.backend.entity.DocumentCategory;
import com.astarsquad.backend.exception.ResourceNotFoundException;
import com.astarsquad.backend.repository.DocumentRepository;
import com.astarsquad.backend.repository.DocumentSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private static final String DOCUMENTS_FOLDER = "documents";
    private static final String THUMBNAILS_FOLDER = "document-thumbnails";
    private static final String RAW_TYPE = "raw";
    private static final String IMAGE_TYPE = "image";

    private final DocumentRepository documentRepository;
    private final CloudinaryStorageService cloudinaryStorageService;

    @Transactional(readOnly = true)
    public PageResponse<DocumentResponse> findAll(DocumentCategory category, String search, int page, int size) {
        Specification<Document> spec = Specification.allOf(
                DocumentSpecifications.withCategory(category),
                DocumentSpecifications.withSearch(search)
        );
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "uploadedAt"));
        var result = documentRepository.findAll(spec, pageable);
        return PageResponse.from(result, DocumentResponse::from);
    }

    @Transactional(readOnly = true)
    public DocumentResponse findById(Long id) {
        return DocumentResponse.from(getOrThrow(id));
    }

    @Transactional
    public DocumentResponse create(
            String title,
            String description,
            DocumentCategory category,
            MultipartFile file,
            MultipartFile thumbnail,
            String uploadedBy
    ) {
        var uploadedFile = cloudinaryStorageService.upload(file, DOCUMENTS_FOLDER, RAW_TYPE);
        var uploadedThumbnail = cloudinaryStorageService.upload(thumbnail, THUMBNAILS_FOLDER, IMAGE_TYPE);

        Document document = Document.builder()
                .title(title)
                .description(description)
                .category(category)
                .fileName(file.getOriginalFilename())
                .cloudinaryPublicId(uploadedFile.publicId())
                .fileUrl(uploadedFile.url())
                .thumbnailPublicId(uploadedThumbnail.publicId())
                .thumbnailUrl(uploadedThumbnail.url())
                .fileSize(file.getSize())
                .contentType(file.getContentType() != null ? file.getContentType() : "application/octet-stream")
                .uploadedBy(uploadedBy)
                .build();
        return DocumentResponse.from(documentRepository.save(document));
    }

    @Transactional
    public void delete(Long id, String currentUsername, boolean canManageAll) {
        Document document = getOrThrow(id);
        requireOwnership(document, currentUsername, canManageAll, "xoá");
        cloudinaryStorageService.delete(document.getCloudinaryPublicId(), RAW_TYPE);
        cloudinaryStorageService.delete(document.getThumbnailPublicId(), IMAGE_TYPE);
        documentRepository.delete(document);
    }

    @Transactional
    public DocumentResponse update(
            Long id,
            String title,
            String description,
            DocumentCategory category,
            MultipartFile file,
            MultipartFile thumbnail,
            String currentUsername,
            boolean canManageAll
    ) {
        Document document = getOrThrow(id);
        requireOwnership(document, currentUsername, canManageAll, "sửa");

        document.setTitle(title);
        document.setDescription(description);
        document.setCategory(category);

        if (file != null && !file.isEmpty()) {
            cloudinaryStorageService.delete(document.getCloudinaryPublicId(), RAW_TYPE);
            var uploaded = cloudinaryStorageService.upload(file, DOCUMENTS_FOLDER, RAW_TYPE);
            document.setFileName(file.getOriginalFilename());
            document.setCloudinaryPublicId(uploaded.publicId());
            document.setFileUrl(uploaded.url());
            document.setFileSize(file.getSize());
            document.setContentType(file.getContentType() != null ? file.getContentType() : "application/octet-stream");
        }

        if (thumbnail != null && !thumbnail.isEmpty()) {
            cloudinaryStorageService.delete(document.getThumbnailPublicId(), IMAGE_TYPE);
            var uploadedThumbnail = cloudinaryStorageService.upload(thumbnail, THUMBNAILS_FOLDER, IMAGE_TYPE);
            document.setThumbnailPublicId(uploadedThumbnail.publicId());
            document.setThumbnailUrl(uploadedThumbnail.url());
        }

        return DocumentResponse.from(document);
    }

    private void requireOwnership(Document document, String currentUsername, boolean canManageAll, String action) {
        if (!canManageAll && !document.getUploadedBy().equals(currentUsername)) {
            throw new AccessDeniedException("Bạn chỉ có thể " + action + " tài liệu do chính mình đăng tải.");
        }
    }

    @Transactional
    public DownloadPayload prepareDownload(Long id) {
        Document document = getOrThrow(id);
        document.setDownloadCount(document.getDownloadCount() + 1);
        return new DownloadPayload(document.getFileUrl(), document.getFileName(), document.getContentType());
    }

    private Document getOrThrow(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài liệu có id=" + id));
    }

    public record DownloadPayload(String url, String fileName, String contentType) {
    }
}

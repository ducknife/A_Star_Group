package com.astarsquad.backend.service;

import com.astarsquad.backend.exception.FileStorageException;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CloudinaryStorageService {

    private final Cloudinary cloudinary;

    /**
     * Uploads a file under astarsquad/{folder} on Cloudinary. resourceType: "image" or "raw".
     * The public_id is generated explicitly rather than relying on Cloudinary's
     * use_filename/unique_filename options, which only derive a name from filename metadata
     * that isn't present when uploading raw bytes — that previously produced extension-less
     * public_ids like "file_ex14iq" and broke downloads.
     *
     * For "raw" resources the extension must be part of the public_id (raw delivery URLs are
     * literal, there's no separate format suffix). For "image"/"video" resources Cloudinary
     * always appends the detected format itself, so including an extension here would double
     * it up (e.g. "....png.png") — the UUID alone is enough.
     */
    public UploadResult upload(MultipartFile file, String folder, String resourceType) {
        try {
            String publicId = UUID.randomUUID().toString();
            if ("raw".equals(resourceType)) {
                publicId += extractExtension(file.getOriginalFilename());
            }
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "astarsquad/" + folder,
                    "resource_type", resourceType,
                    "public_id", publicId
            ));
            return new UploadResult((String) result.get("public_id"), (String) result.get("secure_url"));
        } catch (IOException e) {
            throw new FileStorageException("Không thể tải tệp lên Cloudinary: " + file.getOriginalFilename(), e);
        }
    }

    public void delete(String publicId, String resourceType) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", resourceType));
        } catch (IOException e) {
            throw new FileStorageException("Không thể xoá tệp trên Cloudinary: " + publicId, e);
        }
    }

    private String extractExtension(String originalFilename) {
        if (originalFilename == null) return "";
        int dot = originalFilename.lastIndexOf('.');
        return dot >= 0 ? originalFilename.substring(dot) : "";
    }

    public record UploadResult(String publicId, String url) {
    }
}

package com.astarsquad.backend.service;

import com.astarsquad.backend.exception.FileStorageException;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryStorageService {

    private final Cloudinary cloudinary;

    /** Uploads a file under astarsquad/{folder} on Cloudinary. resourceType: "image" or "raw". */
    public UploadResult upload(MultipartFile file, String folder, String resourceType) {
        try {
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "astarsquad/" + folder,
                    "resource_type", resourceType,
                    "use_filename", true,
                    "unique_filename", true
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

    public record UploadResult(String publicId, String url) {
    }
}

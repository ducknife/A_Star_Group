package com.astarsquad.backend.repository;

import com.astarsquad.backend.entity.Document;
import com.astarsquad.backend.entity.DocumentCategory;
import org.springframework.data.jpa.domain.Specification;

public final class DocumentSpecifications {

    private DocumentSpecifications() {
    }

    public static Specification<Document> withCategory(DocumentCategory category) {
        if (category == null) return null;
        return (root, query, cb) -> cb.equal(root.get("category"), category);
    }

    public static Specification<Document> withSearch(String search) {
        if (search == null || search.isBlank()) return null;
        String like = "%" + search.toLowerCase() + "%";
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("title")), like),
                cb.like(cb.lower(cb.coalesce(root.get("description"), "")), like)
        );
    }
}

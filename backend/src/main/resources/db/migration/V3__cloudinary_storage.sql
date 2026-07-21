-- Chuyển lưu trữ tệp từ đĩa cục bộ sang Cloudinary.
ALTER TABLE documents DROP COLUMN stored_file_name;
ALTER TABLE documents ADD COLUMN cloudinary_public_id VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE documents ADD COLUMN file_url VARCHAR(500) NOT NULL DEFAULT '';
ALTER TABLE documents ALTER COLUMN cloudinary_public_id DROP DEFAULT;
ALTER TABLE documents ALTER COLUMN file_url DROP DEFAULT;

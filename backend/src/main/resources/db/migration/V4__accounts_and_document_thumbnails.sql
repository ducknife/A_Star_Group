-- Mở rộng admin_users thành tài khoản đa vai trò (ADMIN/MOD/MEMBER) + thêm thumbnail & người đăng cho tài liệu.
ALTER TABLE admin_users ADD COLUMN display_name VARCHAR(150);
ALTER TABLE admin_users ADD COLUMN member_id BIGINT;
ALTER TABLE admin_users ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT now();

ALTER TABLE documents ADD COLUMN thumbnail_public_id VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE documents ADD COLUMN thumbnail_url VARCHAR(500) NOT NULL DEFAULT '';
ALTER TABLE documents ALTER COLUMN thumbnail_public_id DROP DEFAULT;
ALTER TABLE documents ALTER COLUMN thumbnail_url DROP DEFAULT;
ALTER TABLE documents ADD COLUMN uploaded_by VARCHAR(100);

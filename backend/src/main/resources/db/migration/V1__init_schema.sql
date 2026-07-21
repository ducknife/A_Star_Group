CREATE TABLE members (
    id                BIGSERIAL PRIMARY KEY,
    full_name         VARCHAR(150)  NOT NULL,
    university        VARCHAR(200)  NOT NULL,
    scholarship_name  VARCHAR(200)  NOT NULL,
    major             VARCHAR(150),
    graduation_year   INTEGER,
    bio               VARCHAR(1000),
    photo_url         VARCHAR(500),
    featured          BOOLEAN       NOT NULL DEFAULT FALSE,
    sort_order        INTEGER       NOT NULL DEFAULT 0,
    created_at        TIMESTAMP     NOT NULL DEFAULT now(),
    updated_at        TIMESTAMP     NOT NULL DEFAULT now()
);

CREATE TABLE documents (
    id                 BIGSERIAL PRIMARY KEY,
    title              VARCHAR(200)  NOT NULL,
    description        VARCHAR(1000),
    category           VARCHAR(50)   NOT NULL,
    file_name          VARCHAR(255)  NOT NULL,
    stored_file_name   VARCHAR(255)  NOT NULL,
    file_size          BIGINT        NOT NULL,
    content_type       VARCHAR(150)  NOT NULL,
    download_count     INTEGER       NOT NULL DEFAULT 0,
    uploaded_at        TIMESTAMP     NOT NULL DEFAULT now()
);

CREATE TABLE admin_users (
    id             BIGSERIAL PRIMARY KEY,
    username       VARCHAR(100) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    role           VARCHAR(50)  NOT NULL DEFAULT 'ADMIN'
);

CREATE INDEX idx_members_featured ON members (featured);
CREATE INDEX idx_documents_category ON documents (category);

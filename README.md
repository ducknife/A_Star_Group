# A* SQUAD

Landing page + trang quản trị cho A* SQUAD — cộng đồng học thuật quy tụ các thành viên đã đạt học bổng trong và ngoài nước.

## Kiến trúc

```
AStarGroupLandingPage/
├── frontend/          React 19 + TypeScript + Vite + Tailwind CSS v4 (Dockerfile + nginx, vercel.json)
├── backend/           Spring Boot 3.5 (Java 21) — REST API (Dockerfile, render.yaml)
├── docker-compose.yml Postgres + backend + frontend, đọc biến môi trường từ .env
└── .env               Secrets: Cloudinary, Gmail SMTP, admin mặc định, JWT (không commit)
```

- **Frontend**: landing page công khai (`/`, `/gioi-thieu`, `/thanh-vien`, `/tai-lieu`, `/lien-he`) và trang quản trị (`/admin/*`), hỗ trợ dark/light mode.
- **Thiết kế**: phong cách học thuật/editorial kiểu Harvard — góc vuông sắc cạnh (không bo góc), không dùng gradient, thẻ thành viên/tài liệu trình bày như bài báo (kicker uppercase, ảnh vuông đen trắng, tiêu đề serif). Có marquee chạy chữ, số liệu đếm từ 0, và các hình minh hoạ 3D (miễn phí, CC0, từ 3dicons.co) ở Hero/CTA.
- **Tài khoản & phân quyền**: không có đăng ký công khai — chỉ **Admin** tạo tài khoản cho **Điều hành viên (MOD)** và **Thành viên (MEMBER)** tại `/admin/accounts`. Admin & Mod quản lý thành viên/tài liệu; Member chỉ đăng tải & xoá tài liệu của chính mình. Nút đăng nhập được giấu kín đáo (dấu `·` trong footer) thay vì hiển thị rõ.
- **Backend**: REST API thuần (không dùng server-side MVC/view), xác thực JWT.
- **Lưu trữ tệp**: Cloudinary (ảnh thành viên, tài liệu + thumbnail tài liệu) — không lưu trên đĩa cục bộ.
- **Email**: gửi qua Gmail SMTP khi có người gửi form Liên hệ (`/api/contact`).
- **Màu sắc**: đỏ thương hiệu `#EC1C24` (lấy từ logo) + trắng/đen trung tính, không gradient.
- **Font chữ**: Playfair Display (serif, trang trọng — tiêu đề), Be Vietnam Pro (sans-serif — nội dung, hỗ trợ tốt tiếng Việt), Dancing Script (script — điểm nhấn chữ ký, có đầy đủ dấu tiếng Việt).

## Chạy toàn bộ hệ thống bằng Docker (khuyến nghị cho local)

File `.env` ở thư mục gốc (cùng cấp `docker-compose.yml`) cần có:

```
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_DEFAULT_USERNAME=...
ADMIN_DEFAULT_PASSWORD=...
EMAIL_DEFAULT=...           # địa chỉ Gmail dùng làm người gửi + nơi nhận liên hệ
EMAIL_PASSWORD_APP=...      # Mật khẩu ứng dụng (App Password) của Gmail, KHÔNG phải mật khẩu đăng nhập thường
JWT_SECRET=...
```

> **Lưu ý về `EMAIL_PASSWORD_APP`**: Gmail chỉ chấp nhận đăng nhập SMTP bằng "Mật khẩu ứng dụng" (App Password) — cần bật Xác minh 2 bước cho tài khoản Gmail, sau đó tạo App Password tại [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) và dán chuỗi 16 ký tự đó vào biến này. Dùng mật khẩu đăng nhập Gmail thông thường sẽ bị từ chối (lỗi `535 Username and Password not accepted`).

Chạy:

```bash
docker compose up -d --build
```

- Frontend: `http://localhost:8081`
- Backend API (trực tiếp, để debug): `http://localhost:8080`
- Postgres: `localhost:5432`

Frontend (nginx) tự động proxy `/api/*` sang backend nên không cần cấu hình CORS khi chạy qua Docker. Dừng toàn bộ: `docker compose down` (thêm `-v` nếu muốn xoá luôn dữ liệu Postgres).

Lần chạy đầu tiên, Flyway tạo schema + dữ liệu mẫu (4 thành viên demo), và ứng dụng tự tạo tài khoản admin theo `ADMIN_DEFAULT_USERNAME` / `ADMIN_DEFAULT_PASSWORD` trong `.env`. Truy cập trang đăng nhập tại `/admin/login` (liên kết ẩn ở dấu `·` cuối footer trang chủ).

## Chạy riêng lẻ để phát triển (không dùng Docker)

### 1. Cơ sở dữ liệu

```bash
docker compose up -d postgres
```

### 2. Backend

Cần export các biến môi trường ở trên (Cloudinary, Gmail, admin, JWT) vào shell trước khi chạy, ví dụ:

```bash
cd backend
set -a && source ../.env && set +a   # bash/git-bash
mvn spring-boot:run
```

API chạy tại `http://localhost:8080`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # chỉnh VITE_API_BASE_URL nếu backend không chạy ở localhost:8080
npm run dev
```

Truy cập `http://localhost:5173`.

## Triển khai production: Backend → Render, Frontend → Vercel

### Backend trên Render

1. Push code lên GitHub/GitLab.
2. Trên Render: **New → Blueprint**, trỏ vào repo — Render đọc sẵn `backend/render.yaml` (dùng Dockerfile có sẵn).
   - Hoặc tạo thủ công: **New → Web Service**, chọn **Docker**, root directory `backend/`.
3. Tạo một **PostgreSQL** instance riêng trên Render (New → PostgreSQL), lấy thông tin **Host / Port / Database / Username / Password** (không dùng chung connection string, vì app cấu hình theo từng biến rời).
4. Điền các biến môi trường cho service (đánh dấu `sync: false` trong `render.yaml` nghĩa là bạn tự nhập trong dashboard):
   `DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, JWT_SECRET, ADMIN_DEFAULT_USERNAME, ADMIN_DEFAULT_PASSWORD, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, EMAIL_DEFAULT, EMAIL_PASSWORD_APP, CORS_ALLOWED_ORIGINS`
   - `CORS_ALLOWED_ORIGINS` = domain Vercel của frontend (vd `https://astarsquad.vercel.app`), nhiều domain cách nhau bởi dấu phẩy.
5. Render tự cấp biến `PORT` — backend đã đọc `${PORT:${SERVER_PORT:8080}}` nên không cần chỉnh gì thêm.
6. Health check: `/actuator/health` (đã cấu hình sẵn trong `render.yaml` và cho phép public trong `SecurityConfig`).

### Frontend trên Vercel

1. Trên Vercel: **New Project**, chọn repo, **Root Directory = `frontend`**.
2. Framework preset: Vite. Build command mặc định `npm run build`, output `dist` — Vercel tự nhận diện.
3. Thêm biến môi trường **Build & Runtime**: `VITE_API_BASE_URL = https://<tên-service>.onrender.com` (URL backend Render, không có dấu `/` cuối).
4. **Quan trọng — SPA routing**: vì đây là ứng dụng React Router (client-side routing), Vercel cần được chỉ dẫn luôn trả về `index.html` cho mọi route (để `/thanh-vien/3` hay `/admin` không bị 404 khi truy cập trực tiếp/refresh). File `frontend/vercel.json` đã có sẵn:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
   Vercel tự đọc file này, không cần cấu hình thêm.
5. Sau khi deploy, quay lại Render cập nhật `CORS_ALLOWED_ORIGINS` bằng domain Vercel thật (Vercel cấp domain sau lần deploy đầu).

## Các trang hiện có

| Trang | Route | Mô tả |
|---|---|---|
| Trang chủ | `/` | Hero (kèm hình 3D), marquee, số liệu đếm động, giới thiệu ngắn, sứ mệnh, thành viên/tài liệu tiêu biểu, CTA |
| Giới thiệu | `/gioi-thieu` | Câu chuyện tổ chức, mục tiêu & giá trị cốt lõi |
| Thành viên | `/thanh-vien` | Danh sách đầy đủ thành viên, tìm kiếm theo tên/trường/học bổng |
| Chi tiết thành viên | `/thanh-vien/:id` | Hồ sơ đầy đủ một thành viên |
| Tài liệu | `/tai-lieu` | Kho tài liệu dạng thẻ (thumbnail + tóm tắt), lọc theo danh mục |
| Chi tiết tài liệu | `/tai-lieu/:id` | Thumbnail lớn, mô tả đầy đủ, nút tải xuống |
| Liên hệ | `/lien-he` | Thông tin liên hệ + form gửi email thật (`POST /api/contact`) |
| Đăng nhập | `/admin/login` | Dùng chung cho Admin/Mod/Member — liên kết ẩn ở footer |
| Quản trị — Tổng quan | `/admin` | Số liệu tổng hợp (mọi vai trò) |
| Quản trị — Thành viên | `/admin/members` | CRUD thành viên + ảnh đại diện (Admin, Mod) |
| Quản trị — Tài liệu | `/admin/documents` | Upload tài liệu + thumbnail (mọi vai trò); xoá: Admin/Mod xoá mọi tài liệu, Member chỉ xoá tài liệu của mình |
| Quản trị — Tài khoản | `/admin/accounts` | Tạo/xoá tài khoản Mod & Member (chỉ Admin) |

### Đề xuất mở rộng trong tương lai

- **Trang tin tức/blog** (`/tin-tuc`): chia sẻ bài viết, kinh nghiệm apply học bổng.
- **Duyệt tài liệu**: cho Member nộp tài liệu ở trạng thái "chờ duyệt", Admin/Mod duyệt trước khi công khai.
- **Đa ngôn ngữ (VI/EN)** nếu cần tiếp cận đối tác/nhà tài trợ quốc tế.
- **Đổi mật khẩu / quên mật khẩu** cho tài khoản Mod & Member (hiện chỉ Admin tạo/xoá tài khoản, chưa có luồng đổi mật khẩu).

## Ghi chú kỹ thuật

- Backend dùng kiến trúc REST-only: `controller → service → repository`, không dùng Thymeleaf/JSP hay bất kỳ view engine nào.
- Xác thực: JWT (stateless), `BCryptPasswordEncoder`. Vai trò `ADMIN` / `MOD` / `MEMBER` lưu trong bảng `admin_users` (entity `Account`).
- Migration schema quản lý bằng Flyway (`backend/src/main/resources/db/migration`).
- Tệp tải lên (ảnh thành viên, tài liệu, thumbnail tài liệu) lưu trên **Cloudinary** (`CloudinaryStorageService`); endpoint `/api/documents/{id}/download` redirect (302) sang URL Cloudinary và tăng `download_count`.
- Gửi email liên hệ qua Gmail SMTP (`spring-boot-starter-mail`, `ContactService`).
- Hình 3D trang chủ (`frontend/src/assets/images/3d/`) lấy từ [3dicons.co](https://3dicons.co) — CC0, miễn phí, không cần ghi công.

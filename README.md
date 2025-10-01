## AuthN/AuthZ (Đăng nhập + Phân quyền)

### 1) Entity và DB
- Bảng `users` với các cột: `id`, `email` (unique), `password_hash`, `role` (`user`|`admin`), `is_active`, `created_at`.
- Nếu DB chưa có bảng, hãy chạy migration hoặc lệnh SQL thủ công:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 2) API đơn giản
- `POST /auth/register` body: `{ email, password, role? }` -> tạo user (mặc định role `user`).
- `POST /auth/login` body: `{ email, password }` -> trả về `{ access_token }` (JWT Bearer).

### 3) Cách hoạt động
- Khi login, hệ thống tạo JWT với payload `{ sub, email, role }` và ký bằng `JWT_SECRET`.
- Request bảo vệ cần header: `Authorization: Bearer <token>`.
- `JwtAuthGuard` xác thực token, `RolesGuard` kiểm tra role.
- Các endpoint `employee`:
  - `GET /employee` và `GET /employee/:id`: yêu cầu đăng nhập.
  - `POST /employee`, `PUT /employee/:id`, `PUT /employee/:id/status`, `DELETE /employee/:id`: yêu cầu role `admin`.

Ví dụ header/command để test nhanh:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/employee
```

Trong Postman: tab Authorization → Auth Type: Bearer Token → ô Token dán đúng `<token>` (Postman sẽ tự thêm chữ "Bearer ").

### 4) Cấu hình môi trường
Tạo biến môi trường:
```
JWT_SECRET=please_change_me
```

- Đăng ký: nhận email/password -> băm password bằng bcrypt -> lưu vào `users`.
- Đăng nhập: kiểm tra email tồn tại và `is_active` -> so sánh bcrypt -> phát JWT.
- Bảo vệ: `JwtStrategy` đọc Bearer token, xác thực chữ ký, inject `req.user`.
- Phân quyền: `@Roles('admin')` + `RolesGuard` so sánh `req.user.role`.



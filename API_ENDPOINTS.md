# API Endpoints Documentation

## Cấu trúc Database
- **Employee**: `id`, `name`, `birthday`, `status`
- **Department**: `id`, `name`, `status`
- **Position**: `id`, `department_id`, `name`, `status`, `salary`
- **Work**: `id`, `position_id`, `employee_id`, `status`, `salary`

## Employee API

### Tạo nhân viên
```bash
POST /employee
Content-Type: application/json

{
  "name": "Nguyen Van A",
  "birthday": "1990-01-01",
  "status": 1
}
```

### Lấy tất cả nhân viên
```bash
GET /employee
```

### Lấy nhân viên theo ID
```bash
GET /employee/1
```

### Cập nhật nhân viên
```bash
PUT /employee/1
Content-Type: application/json

{
  "name": "Nguyen Van B",
  "birthday": "1991-01-01"
}
```

### Cập nhật status nhân viên
```bash
PUT /employee/1/status
Content-Type: application/json

{
  "status": 0
}
```

### Xóa nhân viên
```bash
DELETE /employee/1
```

## Department API

### Tạo phòng ban
```bash
POST /department
Content-Type: application/json

{
  "name": "IT Department",
  "status": 1
}
```

### Lấy tất cả phòng ban
```bash
GET /department
```

### Lấy phòng ban theo ID
```bash
GET /department/1
```

### Cập nhật phòng ban
```bash
PUT /department/1
Content-Type: application/json

{
  "name": "IT Department Updated",
  "status": 1
}
```

### Xóa phòng ban
```bash
DELETE /department/1
```

## Position API

### Tạo chức vụ
```bash
POST /position
Content-Type: application/json

{
  "department_id": 1,
  "name": "Senior Developer",
  "status": 1,
  "salary": 15000000
}
```

### Lấy tất cả chức vụ
```bash
GET /position
```

### Lấy chức vụ theo ID
```bash
GET /position/1
```

### Cập nhật chức vụ
```bash
PUT /position/1
Content-Type: application/json

{
  "name": "Lead Developer",
  "salary": 20000000
}
```

### Xóa chức vụ
```bash
DELETE /position/1
```

## Work API

### Tạo công việc
```bash
POST /work
Content-Type: application/json

{
  "position_id": 1,
  "employee_id": 1,
  "status": 1,
  "salary": 12000000
}
```

### Lấy tất cả công việc
```bash
GET /work
```

### Lấy công việc theo ID
```bash
GET /work/1
```

### Cập nhật công việc
```bash
PUT /work/1
Content-Type: application/json

{
  "status": 0,
  "salary": 13000000
}
```

### Xóa công việc
```bash
DELETE /work/1
```

### Lấy công việc của nhân viên
```bash
GET /work/employee/1
```

### Lấy công việc của chức vụ
```bash
GET /work/position/1
```

## Quan hệ giữa các bảng

1. **Department** → **Position**: Một phòng ban có nhiều chức vụ
2. **Position** → **Work**: Một chức vụ có nhiều công việc
3. **Employee** → **Work**: Một nhân viên có nhiều công việc

## Validation Rules

- Tất cả ID phải là số nguyên
- `status` chỉ nhận giá trị 0 hoặc 1
- `salary` là số thập phân
- `birthday` phải là định dạng ngày hợp lệ
- Khi tạo Position phải có `department_id` hợp lệ
- Khi tạo Work phải có `position_id` và `employee_id` hợp lệ

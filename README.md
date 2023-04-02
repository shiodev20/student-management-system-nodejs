# ShioSMS - Phần mềm quản lý học sinh Trung học phổ thông



## Actor hệ thống
- Giáo vụ
- Giáo viên
- Quản trị viên
- Quản lý nhân sự

## Chức năng hệ thống

### Module Auth (Actor: tất cả)
- Đăng nhập
- Đăng xuất
- Quên mật khẩu

### Module Student (Actor: Giáo vụ)
- Tiếp nhận học sinh
- Cập nhật học sinh
- Xóa học sinh
- Tìm kiếm học sinh

### Module Classroom (Actor: Giáo vụ)
- Tạo lớp học
- Thêm học sinh vào lớp
- Phân công giáo viên chủ nhiệm
- Phân công giáo viên bộ môn
- Tìm kiếm lớp học
- Xóa lớp học

### Module Report (Actor: Giáo vụ)
- Tổng kết điểm môn học của lớp
- Tổng kết môn học
- Tổng kết học kỳ

### Module Mark (Actor: Giáo viên)
- Nhập điểm cho các lớp học giảng dạy
- Tính điểm trung bình môn


### Module User (Actor: Quản lý nhân sự)
- Tiếp nhận nhân viên
- Cập nhật nhân viên
- Xóa nhân viên
- Tìm kiếm nhân viên


### Module Account (Actor: Quản trị viên)
- Cấp tài khoản
- Tìm kiếm tài khoản
- Cập nhật trạng thái
- Khôi phục mật khẩu
- Xóa tài khoản


## ERD

![ShioSMS-ERD](/screenshot/ShioSMS-ERD.png)

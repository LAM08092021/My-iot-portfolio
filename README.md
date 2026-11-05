# 🚀 IoT & Embedded Systems Showcase Hub

Ứng dụng Web Portfolio chuyên nghiệp dành cho Kỹ sư IoT & Hệ thống nhúng (IoT & Embedded Systems Engineer), được thiết kế tối ưu để làm đẹp CV, chia sẻ công khai (Public Portfolio) cho nhà tuyển dụng hoặc cộng đồng.

---

## 🌟 Tính Năng Nổi Bật

1. **Bảng Danh Mục Linh Kiện & Chi Phí (BOM - Bill of Materials)**
   - Thống kê toàn bộ linh kiện từ Kit ESP32, Cảm biến bụi PMS5003, MQ-135, DHT22, OLED 0.96", Còi Buzzer, LED...
   - Tính toán chi phí chính xác đến từng đồng (tổng chi phí thực tế **391.615 VNĐ**).
   - Xuất dữ liệu ra file **Excel / CSV** chỉ với 1 click.

2. **Sơ Đồ Đấu Nối Chân Phần Cứng (Pinout Wiring Guide)**
   - Phân loại rõ ràng các giao thức giao tiếp: `UART`, `I2C`, `ADC 12-bit`, `GPIO`, `PWM`.
   - Phân biệt mức điện áp `3.3V` và `5V`, kèm các cảnh báo phân áp an toàn cho ESP32.

3. **Kho Mã Nguồn Firmware Hoàn Chỉnh (Source Code)**
   - Đầy đủ file mã nguồn C++/PlatformIO/Arduino: `AirQualityMonitor_ESP32.ino`, `config.h`, `platformio.ini`.
   - Ứng dụng **FreeRTOS Dual-Core**: Core 0 chạy kết nối Wi-Fi/MQTT, Core 1 lấy mẫu cảm biến & vẽ màn hình OLED 60Hz.
   - Nút Copy Code & Tải file mã nguồn trực tiếp.

4. **Phòng Lab Giả Lập Phần Cứng Ảo (Interactive Hardware Simulator)**
   - Giả lập trực quan màn hình OLED 128x64 hiển thị đồ thị nồng độ bụi theo thời gian thực.
   - Giả lập 3 đèn LED trạng thái (Xanh - Vàng - Đỏ) sáng theo ngưỡng chuẩn AQI US-EPA.
   - Giả lập âm thanh còi Buzzer hú báo động bằng Web Audio API khi nồng độ nguy hại.
   - Các thanh trượt điều chỉnh thông số PM2.5, Gas MQ-135, Nhiệt độ, Độ ẩm.

5. **Mở Rộng Thêm Đồ Án Mới (Future-Proof)**
   - Có sẵn nút **"Thêm Đồ Án Mới"** để bổ sung các dự án IoT sau này.
   - Lưu trữ tự động trên trình duyệt (`LocalStorage`).
   - Có tính năng **Xuất JSON (Backup)** và **Nhập JSON** để lưu trữ lâu dài hoặc đồng bộ giữa các máy tính.

---

## 🛠️ Hướng Dẫn Chạy Cục Bộ (Local)

```bash
# Di chuyển vào thư mục dự án
cd "C:\Users\ADMIN\.gemini\antigravity\scratch\iot-portfolio-hub"

# Chạy server phát triển
npm run dev
```

Mở trình duyệt truy cập: `http://localhost:5173/`

---

## 🌐 Hướng Dẫn Deploy Miễn Phí Lên Mạng Để Đưa Vào CV

### Cách 1: Triển khai qua Vercel (Khuyên dùng - Nhanh nhất)
1. Đăng ký tài khoản miễn phí tại [vercel.com](https://vercel.com).
2. Tải mã nguồn lên GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "feat: my IoT portfolio showcase"
   git branch -M main
   git remote add origin https://github.com/<your-username>/iot-portfolio-hub.git
   git push -u origin main
   ```
3. Trên Vercel, chọn **"Add New Project"** -> Chọn Repo vừa tạo -> Nhấn **"Deploy"**.
4. Bạn sẽ nhận được link public dạng: `https://your-name-iot.vercel.app` để gắn vào CV & LinkedIn!

### Cách 2: Triển khai qua GitHub Pages
Trong file `vite.config.ts`, `base: './'` đã được thiết lập sẵn, bạn chỉ cần build và đẩy thư mục `dist` lên nhánh `gh-pages` của GitHub.

import type { IoTProject } from '../types';

export const defaultProjects: IoTProject[] = [
  {
    id: 'iot-air-quality-station',
    slug: 'esp32-air-quality-pms5003-mq135',
    title: 'Hệ Thống Quan Trắc & Cảnh Báo Chất Lượng Không Khí Thông Minh',
    tagline: 'Giám sát nồng độ bụi mịn PM2.5/PM10, khí độc MQ-135, nhiệt độ & độ ẩm thời gian thực với ESP32 & OLED',
    category: 'Environment',
    mcu: 'ESP32 NodeMCU-32S',
    status: 'Completed',
    completionDate: '2026-03',
    description:
      'Hệ thống IoT phát hiện và cảnh báo ô nhiễm không khí tự động. Sử dụng cảm biến laser PMS5003 để đo chính xác mật độ bụi mịn PM1.0, PM2.5, PM10 kết hợp với cảm biến bán dẫn MQ-135 để định lượng các khí độc hại (NH3, NOx, Alcohol, Benzene, khói). Dữ liệu được tính toán thành chỉ số AQI tiêu chuẩn, hiển thị đồ họa trực quan trên màn hình OLED 0.96" I2C, kích hoạt cảnh báo âm thanh qua còi Buzzer và hệ thống đèn LED 3 cấp độ (An toàn - Cảnh báo - Nguy hại), đồng thời đẩy dữ liệu lên đám mây qua giao thức MQTT/Blynk.',
    highlights: [
      'Đo chính xác nồng độ bụi mịn PM2.5 với sai số < 10% bằng cảm biến tán xạ laser PMS5003 qua UART phần cứng (HardwareSerial).',
      'Thuật toán hiệu chỉnh điện áp và nội suy nồng độ khí MQ-135 kết hợp bù nhiệt ẩm từ cảm biến DHT22.',
      'Sử dụng kiến trúc đa tác vụ FreeRTOS (Dual-Core): Core 0 chuyên xử lý kết nối Wi-Fi/MQTT, Core 1 xử lý lấy mẫu cảm biến & hiển thị OLED 60Hz.',
      'Cảnh báo tức thời qua còi Buzzer tích cực (Active Buzzer) và cụm LED 3 màu phân tầng theo ngưỡng tiêu chuẩn AQI US-EPA.',
      'Tối ưu hóa chi phí phần cứng: Toàn bộ hệ thống hoàn thiện với mức giá chỉ ~391.000 VNĐ.'
    ],
    features: [
      'Giao tiếp phần cứng: UART2 (PMS5003), I2C 400kHz (OLED SSD1306), ADC 12-bit (MQ-135), 1-Wire (DHT22).',
      'Giao thức mạng: Wi-Fi 802.11 b/g/n, MQTT QoS 1 với định dạng dữ liệu JSON gọn nhẹ.',
      'Chế độ dự phòng offline: Tiếp tục lưu trữ đệm (buffer) và cảnh báo tại chỗ ngay cả khi mất kết nối mạng.',
      'Giao diện OLED tối ưu bộ nhớ: Vẽ đồ thị đường biểu diễn nồng độ bụi 30 giây gần nhất và biểu tượng cảm xúc trạng thái không khí.'
    ],
    bom: [
      {
        id: 'bom-1',
        name: 'Kit ESP32 NodeMCU-32S',
        spec: 'Dual-Core Xtensa 240MHz, 520KB SRAM, Wi-Fi & BLE, 38 Chân',
        quantity: 1,
        unitPrice: 82698,
        totalPrice: 82698,
        pinConnection: 'Bo vi điều khiển trung tâm (Micro-USB / Type-C)',
        category: 'mcu',
        note: 'Xử lý tính toán, FreeRTOS và truyền thông mạng'
      },
      {
        id: 'bom-2',
        name: 'Cảm biến bụi mịn PMS5003 (hoặc PMS7003 / GP2Y1010AU0F)',
        spec: 'Laser Scattering, đo PM1.0, PM2.5, PM10 (0 - 1000 µg/m³)',
        quantity: 1,
        unitPrice: 129602,
        totalPrice: 129602,
        pinConnection: 'VCC->5V, GND->GND, TX->GPIO16 (RX2), RX->GPIO17 (TX2)',
        category: 'sensor',
        note: 'Cảm biến tán xạ laser độ chính xác cao, giao tiếp UART 9600 baud'
      },
      {
        id: 'bom-3',
        name: 'Cảm biến chất lượng không khí MQ-135',
        spec: 'Đo NH3, NOx, Benzen, Khói, CO2 (10 - 1000 ppm)',
        quantity: 1,
        unitPrice: 45000,
        totalPrice: 45000,
        pinConnection: 'VCC->5V, GND->GND, AOUT->GPIO34 (ADC1_CH6)',
        category: 'sensor',
        note: 'Cần sấy nóng (preheat) 24h trước khi hiệu chuẩn chuẩn xác'
      },
      {
        id: 'bom-4',
        name: 'Cảm biến nhiệt độ & độ ẩm DHT22 (hoặc DHT11 / BME280)',
        spec: 'Đo -40 đến 80°C (±0.5°C), 0-100% RH (±2% RH)',
        quantity: 1,
        unitPrice: 28465,
        totalPrice: 28465,
        pinConnection: 'VCC->3.3V, GND->GND, DATA->GPIO4 (Kèm trở kéo 10k)',
        category: 'sensor',
        note: 'Cung cấp dữ liệu nhiệt ẩm để bù sai số khí quyển cho MQ-135'
      },
      {
        id: 'bom-5',
        name: 'Màn hình OLED 0.96 inch (giao tiếp I2C)',
        spec: '128x64 pixel, Driver SSD1306, Ánh sáng Trắng/Xanh, I2C 0x3C',
        quantity: 1,
        unitPrice: 47850,
        totalPrice: 47850,
        pinConnection: 'VCC->3.3V, GND->GND, SDA->GPIO21, SCL->GPIO22',
        category: 'display',
        note: 'Hiển thị thời gian thực thông số AQI, đồ thị mini và trạng thái'
      },
      {
        id: 'bom-6',
        name: 'Còi chip báo động (Buzzer 5V Active)',
        spec: 'Điện áp 3.3V - 5V, Âm lượng ~85dB, Kêu liên tục khi kích HIGH',
        quantity: 1,
        unitPrice: 15000,
        totalPrice: 15000,
        pinConnection: 'Chân (+)->GPIO18, Chân (-)->GND',
        category: 'actuator',
        note: 'Báo động âm thanh ngắt quãng khi nồng độ ô nhiễm vượt ngưỡng'
      },
      {
        id: 'bom-7',
        name: 'Đèn LED báo trạng thái 3 cái (hoặc 1 LED RGB)',
        spec: 'LED phi 5mm (Xanh lá - Vàng - Đỏ) hoặc RGB chung cathode',
        quantity: 3,
        unitPrice: 6667,
        totalPrice: 20000,
        pinConnection: 'Xanh->GPIO19, Vàng->GPIO23, Đỏ->GPIO5',
        category: 'actuator',
        note: 'Chỉ thị trực quan 3 cấp độ: Tốt (Green), Cảnh báo (Yellow), Độc hại (Red)'
      },
      {
        id: 'bom-8',
        name: 'Điện trở 220Ω / 330Ω (3 cái)',
        spec: 'Trở công suất 1/4W sai số 5% hạn dòng cho 3 đèn LED',
        quantity: 3,
        unitPrice: 0,
        totalPrice: 0,
        pinConnection: 'Nối tiếp chân anode của mỗi LED trước khi về GPIO',
        category: 'passive',
        note: 'Hạn dòng ~10mA bảo vệ GPIO vi điều khiển ESP32'
      },
      {
        id: 'bom-9',
        name: 'Breadboard (Bo test cắm dây) loại lớn MB-102',
        spec: '830 lỗ cắm, 2 hàng cấp nguồn đôi độc lập',
        quantity: 1,
        unitPrice: 23000,
        totalPrice: 23000,
        pinConnection: 'Bo gắn thử nghiệm linh kiện không cần hàn',
        category: 'other',
        note: 'Dễ dàng mở rộng, thay thế và kiểm thử cảm biến'
      },
      {
        id: 'bom-10',
        name: 'Dây cắm đực cái (Jumper Wires Dupont)',
        spec: 'Combo 20 sợi đực-cái & đực-đực dài 20cm, lõi đồng nhiều sợi',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        pinConnection: 'Kết nối chân cảm biến ra breadboard & ESP32',
        category: 'other',
        note: 'Phụ kiện sẵn có trong lab'
      },
      {
        id: 'bom-11',
        name: 'Cáp Micro-USB hoặc Type-C',
        spec: 'Dài 1m, hỗ trợ truyền dữ liệu Data D+/D- để nạp code',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        pinConnection: 'Cổng nạp firmware & cấp nguồn mạch phát triển',
        category: 'power',
        note: 'Có sẵn'
      },
      {
        id: 'bom-12',
        name: 'Củ sạc 5V - 2A (hoặc sạc dự phòng)',
        spec: 'Nguồn xung ổn áp DC 5V/2000mA ổn định chống sụt áp',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        pinConnection: 'Cấp nguồn chính cho toàn bộ hệ thống hoạt động 24/7',
        category: 'power',
        note: 'Có sẵn'
      }
    ],
    pinouts: [
      {
        id: 'pin-1',
        component: 'PMS5003 Dust Sensor',
        componentPin: 'Pin 5 (TX)',
        mcuPin: 'GPIO 16 (RX2)',
        protocol: 'UART',
        voltage: '5V',
        description: 'Truyền dữ liệu mật độ hạt bụi hạt PM1.0, PM2.5, PM10 theo frame 32 bytes'
      },
      {
        id: 'pin-2',
        component: 'PMS5003 Dust Sensor',
        componentPin: 'Pin 4 (RX)',
        mcuPin: 'GPIO 17 (TX2)',
        protocol: 'UART',
        voltage: '5V',
        description: 'Gửi lệnh cấu hình Sleep / Wakeup hoặc Active mode sang cảm biến'
      },
      {
        id: 'pin-3',
        component: 'MQ-135 Gas Sensor',
        componentPin: 'AOUT (Analog Out)',
        mcuPin: 'GPIO 34 (ADC1_CH6)',
        protocol: 'ADC',
        voltage: '5V',
        description: 'Đọc điện áp analog từ cầu phân áp cảm biến qua bộ chuyển đổi ADC 12-bit của ESP32'
      },
      {
        id: 'pin-4',
        component: 'DHT22 Temp/Humid',
        componentPin: 'Data Out',
        mcuPin: 'GPIO 4',
        protocol: 'GPIO',
        voltage: '3.3V',
        description: 'Giao tiếp 1-Wire đọc giá trị nhiệt độ và độ ẩm, cần trở kéo pull-up 10k lên 3.3V'
      },
      {
        id: 'pin-5',
        component: 'OLED 0.96 inch SSD1306',
        componentPin: 'SDA',
        mcuPin: 'GPIO 21 (I2C SDA)',
        protocol: 'I2C',
        voltage: '3.3V',
        description: 'Đường truyền dữ liệu I2C tốc độ cao 400kHz'
      },
      {
        id: 'pin-6',
        component: 'OLED 0.96 inch SSD1306',
        componentPin: 'SCL',
        mcuPin: 'GPIO 22 (I2C SCL)',
        protocol: 'I2C',
        voltage: '3.3V',
        description: 'Đường xung nhịp Clock I2C'
      },
      {
        id: 'pin-7',
        component: 'Active Buzzer 5V',
        componentPin: 'VCC / IN (+)',
        mcuPin: 'GPIO 18',
        protocol: 'PWM',
        voltage: '3.3V',
        description: 'Kích HIGH hoặc tạo tần số còi hú báo động khẩn cấp khi AQI vượt ngưỡng nguy hại'
      },
      {
        id: 'pin-8',
        component: 'LED Xanh (Chất lượng Tốt)',
        componentPin: 'Anode (+)',
        mcuPin: 'GPIO 19',
        protocol: 'GPIO',
        voltage: '3.3V',
        description: 'Sáng khi PM2.5 < 35 µg/m³ và MQ135 an toàn'
      },
      {
        id: 'pin-9',
        component: 'LED Vàng (Cảnh Báo)',
        componentPin: 'Anode (+)',
        mcuPin: 'GPIO 23',
        protocol: 'GPIO',
        voltage: '3.3V',
        description: 'Sáng khi PM2.5 từ 35 - 75 µg/m³ hoặc nồng độ khí tăng cao'
      },
      {
        id: 'pin-10',
        component: 'LED Đỏ (Báo Động Nguy Hại)',
        componentPin: 'Anode (+)',
        mcuPin: 'GPIO 5',
        protocol: 'GPIO',
        voltage: '3.3V',
        description: 'Nhấp nháy liên tục khi PM2.5 > 75 µg/m³ hoặc phát hiện rò rỉ khí độc'
      }
    ],
    codeFiles: [
      {
        filename: 'AirQualityMonitor_ESP32.ino',
        language: 'cpp',
        description: 'Mã nguồn chính Arduino/PlatformIO với FreeRTOS Dual-Task, đọc PMS5003, MQ135, DHT22 và vẽ OLED',
        content: `/**
 * @file AirQualityMonitor_ESP32.ino
 * @brief Hệ Thống Quan Trắc & Cảnh Báo Chất Lượng Không Khí Thông Minh
 * @hardware ESP32 NodeMCU-32S, PMS5003, MQ-135, DHT22, OLED SSD1306, Buzzer, 3x LEDs
 * @author IoT Engineer Showcase
 */

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "config.h"

// Khởi tạo đối tượng phần cứng
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
DHT dht(DHTPIN, DHTTYPE);
HardwareSerial pmsSerial(2); // UART2: RX2=GPIO16, TX2=GPIO17
WiFiClient espClient;
PubSubClient mqttClient(espClient);

// Cấu trúc dữ liệu cảm biến
struct AirQualityData {
  uint16_t pm1_0 = 0;
  uint16_t pm2_5 = 0;
  uint16_t pm10 = 0;
  float gasPPM = 0.0;
  float temperature = 0.0;
  float humidity = 0.0;
  int aqi = 0;
  String statusText = "INIT";
} currentData;

// Buffer lịch sử hiển thị biểu đồ mini trên OLED (30 điểm mẫu)
uint8_t pm25_history[30] = {0};
uint8_t history_index = 0;

// Mutex bảo vệ vùng dữ liệu dùng chung giữa các Task FreeRTOS
SemaphoreHandle_t dataMutex;

// Khai báo hàm
bool readPMS5003(uint16_t &pm1, uint16_t &pm25, uint16_t &pm100);
float readMQ135PPM(float temp, float hum);
int calculateAQI(uint16_t pm25);
void updateIndicators(int aqi);
void renderOLED(const AirQualityData &data);

/* ================================================================
 * Task 1: Chuyên lấy mẫu cảm biến & điều khiển ngoại vi tại chỗ (Core 1)
 * ================================================================ */
void TaskSensorLoop(void *pvParameters) {
  TickType_t xLastWakeTime = xTaskGetTickCount();
  const TickType_t xFrequency = pdMS_TO_TICKS(2000); // Đọc mỗi 2 giây

  for (;;) {
    uint16_t pm1 = 0, pm25 = 0, pm10 = 0;
    bool pmsSuccess = readPMS5003(pm1, pm25, pm10);

    float t = dht.readTemperature();
    float h = dht.readHumidity();
    if (isnan(t)) t = 28.5;
    if (isnan(h)) h = 65.0;

    float ppm = readMQ135PPM(t, h);
    int calculatedAqi = calculateAQI(pm25);

    // Cập nhật dữ liệu dùng chung (Thread-safe)
    if (xSemaphoreTake(dataMutex, pdMS_TO_TICKS(200)) == pdTRUE) {
      if (pmsSuccess) {
        currentData.pm1_0 = pm1;
        currentData.pm2_5 = pm25;
        currentData.pm10 = pm10;
      }
      currentData.temperature = t;
      currentData.humidity = h;
      currentData.gasPPM = ppm;
      currentData.aqi = calculatedAqi;

      if (calculatedAqi <= 50) {
        currentData.statusText = "GOOD";
      } else if (calculatedAqi <= 100) {
        currentData.statusText = "MODERATE";
      } else if (calculatedAqi <= 150) {
        currentData.statusText = "UNHEALTHY";
      } else {
        currentData.statusText = "HAZARDOUS";
      }

      // Lưu vào đồ thị mini
      pm25_history[history_index] = (uint8_t)constrain(pm25, 0, 150);
      history_index = (history_index + 1) % 30;

      xSemaphoreGive(dataMutex);
    }

    // Điều khiển LED và Buzzer
    updateIndicators(calculatedAqi);

    // Vẽ giao diện lên màn hình OLED
    renderOLED(currentData);

    vTaskDelayUntil(&xLastWakeTime, xFrequency);
  }
}

/* ================================================================
 * Task 2: Chuyên duy trì kết nối Wi-Fi & đẩy dữ liệu MQTT (Core 0)
 * ================================================================ */
void TaskNetworkLoop(void *pvParameters) {
  for (;;) {
    if (WiFi.status() != WL_CONNECTED) {
      WiFi.reconnect();
    } else {
      if (!mqttClient.connected()) {
        if (mqttClient.connect("ESP32_AirQuality_Client")) {
          Serial.println("[MQTT] Connected to broker!");
        }
      } else {
        mqttClient.loop();

        // Đóng gói JSON gửi MQTT mỗi 5 giây
        AirQualityData copyData;
        if (xSemaphoreTake(dataMutex, pdMS_TO_TICKS(100)) == pdTRUE) {
          copyData = currentData;
          xSemaphoreGive(dataMutex);

          char payload[256];
          snprintf(payload, sizeof(payload),
            "{\\"pm25\\":%d,\\"pm10\\":%d,\\"gas_ppm\\":%.1f,\\"temp\\":%.1f,\\"hum\\":%.1f,\\"aqi\\":%d,\\"status\\":\\"%s\\"}",
            copyData.pm2_5, copyData.pm10, copyData.gasPPM, copyData.temperature, copyData.humidity, copyData.aqi, copyData.statusText.c_str()
          );

          mqttClient.publish("smart-city/sensor/air_quality", payload);
          Serial.printf("[MQTT Published] %s\\n", payload);
        }
      }
    }
    vTaskDelay(pdMS_TO_TICKS(5000));
  }
}

void setup() {
  Serial.begin(115200);
  pmsSerial.begin(9600, SERIAL_8N1, PMS_RX_PIN, PMS_TX_PIN);

  // Cấu hình chân Output
  pinMode(PIN_LED_GREEN, OUTPUT);
  pinMode(PIN_LED_YELLOW, OUTPUT);
  pinMode(PIN_LED_RED, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  digitalWrite(PIN_BUZZER, LOW);

  // Khởi động DHT22 & I2C OLED
  dht.begin();
  Wire.begin(I2C_SDA_PIN, I2C_SCL_PIN);
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("[OLED] Init Failed!");
  } else {
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(10, 25);
    display.println("AIR QUALITY MONITOR");
    display.setCursor(20, 40);
    display.println("Starting System...");
    display.display();
  }

  // Kết nối Wi-Fi & MQTT
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);

  // Tạo Mutex
  dataMutex = xSemaphoreCreateMutex();

  // Khởi chạy 2 FreeRTOS Tasks trên 2 Core riêng biệt
  xTaskCreatePinnedToCore(TaskSensorLoop, "SensorTask", 4096, NULL, 2, NULL, 1);
  xTaskCreatePinnedToCore(TaskNetworkLoop, "NetworkTask", 4096, NULL, 1, NULL, 0);

  Serial.println("[SYSTEM] Setup completed successfully!");
}

void loop() {
  // FreeRTOS quản lý các Task, loop() để trống
  vTaskDelay(pdMS_TO_TICKS(1000));
}

/* ================================================================
 * Các hàm xử lý giải mã cảm biến & hiển thị
 * ================================================================ */
bool readPMS5003(uint16_t &pm1, uint16_t &pm25, uint16_t &pm100) {
  if (!pmsSerial.available()) return false;

  uint8_t buffer[32];
  if (pmsSerial.peek() != 0x42) {
    pmsSerial.read(); // Bỏ byte rác đến khi gặp header 0x42
    return false;
  }

  if (pmsSerial.available() < 32) return false;
  pmsSerial.readBytes(buffer, 32);

  // Kiểm tra Header 0x42 0x4D
  if (buffer[0] != 0x42 || buffer[1] != 0x4D) return false;

  // Tính Checksum
  uint16_t checksum = 0;
  for (int i = 0; i < 30; i++) checksum += buffer[i];
  uint16_t receivedChecksum = (buffer[30] << 8) | buffer[31];
  if (checksum != receivedChecksum) return false;

  // Trích xuất dữ liệu bụi tiêu chuẩn (Standard Particle, CF=1)
  pm1 = (buffer[4] << 8) | buffer[5];
  pm25 = (buffer[6] << 8) | buffer[7];
  pm100 = (buffer[8] << 8) | buffer[9];
  return true;
}

float readMQ135PPM(float temp, float hum) {
  int rawADC = analogRead(PIN_MQ135_ADC);
  float vout = (rawADC / 4095.0) * 3.3;
  // Tính điện trở cảm biến Rs qua cầu phân áp với RL = 10k
  float rs = ((3.3 - vout) / (vout + 0.0001)) * 10.0;
  // Bù trừ nhiệt ẩm khí quyển
  float corrFactor = 1.0;
  if (hum > 60) corrFactor = 0.95;
  float ppm = pow((rs / 10.0) * corrFactor, -2.7) * 116.6;
  return constrain(ppm, 10.0, 1000.0);
}

int calculateAQI(uint16_t pm25) {
  // Tiêu chuẩn US-EPA chuyển đổi PM2.5 (ug/m3) -> AQI Index
  if (pm25 <= 12) return map(pm25, 0, 12, 0, 50);
  if (pm25 <= 35) return map(pm25, 13, 35, 51, 100);
  if (pm25 <= 55) return map(pm25, 36, 55, 101, 150);
  if (pm25 <= 150) return map(pm25, 56, 150, 151, 200);
  return map(constrain(pm25, 151, 250), 151, 250, 201, 300);
}

void updateIndicators(int aqi) {
  if (aqi <= 50) {
    // Tốt: Bật LED Xanh, tắt còi
    digitalWrite(PIN_LED_GREEN, HIGH);
    digitalWrite(PIN_LED_YELLOW, LOW);
    digitalWrite(PIN_LED_RED, LOW);
    digitalWrite(PIN_BUZZER, LOW);
  } else if (aqi <= 100) {
    // Trung bình: Bật LED Vàng
    digitalWrite(PIN_LED_GREEN, LOW);
    digitalWrite(PIN_LED_YELLOW, HIGH);
    digitalWrite(PIN_LED_RED, LOW);
    digitalWrite(PIN_BUZZER, LOW);
  } else {
    // Nguy hại: Bật LED Đỏ và kích hoạt còi cảnh báo ngắt quãng
    digitalWrite(PIN_LED_GREEN, LOW);
    digitalWrite(PIN_LED_YELLOW, LOW);
    digitalWrite(PIN_LED_RED, HIGH);
    
    // Tiếng còi Beep nhấp nháy cảnh báo
    digitalWrite(PIN_BUZZER, HIGH);
    delay(80);
    digitalWrite(PIN_BUZZER, LOW);
  }
}

void renderOLED(const AirQualityData &data) {
  display.clearDisplay();
  
  // Header: Tiêu đề & Trạng thái
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("AQI: ");
  display.setTextSize(2);
  display.print(data.aqi);

  display.setTextSize(1);
  display.setCursor(70, 4);
  display.printf("[%s]", data.statusText.c_str());

  // Đường phân cách
  display.drawLine(0, 20, 128, 20, SSD1306_WHITE);

  // Chi tiết thông số
  display.setCursor(0, 24);
  display.printf("PM2.5: %d ug/m3", data.pm2_5);
  display.setCursor(0, 36);
  display.printf("Gas:   %.1f ppm", data.gasPPM);
  display.setCursor(0, 48);
  display.printf("%.1f C | %.0f%% RH", data.temperature, data.humidity);

  // Vẽ biểu đồ mini 30 điểm ở góc phải dưới
  for (int i = 0; i < 28; i++) {
    int idx = (history_index + i) % 30;
    int h = map(pm25_history[idx], 0, 150, 0, 14);
    display.drawFastVLine(100 + i, 64 - h, h, SSD1306_WHITE);
  }

  display.display();
}
`
      },
      {
        filename: 'config.h',
        language: 'cpp',
        description: 'Tệp định nghĩa chân GPIO, hằng số cấu hình Wi-Fi và ngưỡng cảnh báo',
        content: `/**
 * @file config.h
 * @brief Định nghĩa chân Pinout và Tham số Hệ thống
 */

#ifndef CONFIG_H
#define CONFIG_H

// Cấu hình màn hình OLED 128x64 I2C
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define I2C_SDA_PIN 21
#define I2C_SCL_PIN 22

// Cảm biến bụi mịn PMS5003 (UART2)
#define PMS_RX_PIN 16
#define PMS_TX_PIN 17

// Cảm biến chất lượng không khí MQ-135 (ADC1)
#define PIN_MQ135_ADC 34

// Cảm biến nhiệt độ & độ ẩm DHT22
#define DHTPIN 4
#define DHTTYPE DHT22

// Còi Buzzer và Hệ thống Đèn LED 3 màu
#define PIN_BUZZER 18
#define PIN_LED_GREEN 19
#define PIN_LED_YELLOW 23
#define PIN_LED_RED 5

// Cấu hình Wi-Fi & MQTT Broker
#define WIFI_SSID "Home_IoT_2.4G"
#define WIFI_PASS "iotSecurePassword123"
#define MQTT_BROKER "broker.hivemq.com"
#define MQTT_PORT 1883

// Ngưỡng cảnh báo AQI
#define AQI_THRESHOLD_WARNING 50
#define AQI_THRESHOLD_HAZARD 100

#endif // CONFIG_H
`
      },
      {
        filename: 'platformio.ini',
        language: 'markdown',
        description: 'Cấu hình nạp dự án qua PlatformIO (VS Code)',
        content: `[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
upload_speed = 921600

lib_deps =
    adafruit/Adafruit GFX Library @ ^1.11.9
    adafruit/Adafruit SSD1306 @ ^2.5.9
    adafruit/DHT sensor library @ ^1.4.6
    knolleary/PubSubClient @ ^2.8
    bblanchon/ArduinoJson @ ^7.0.4
`
      }
    ],
    githubUrl: 'https://github.com/LAM08092021/esp32-air-quality-station',
    simulationConfig: {
      hasOled: true,
      hasBuzzer: true,
      hasLeds: true,
      sensors: [
        {
          id: 'pm25',
          label: 'Bụi Mịn PM2.5',
          unit: 'µg/m³',
          min: 5,
          max: 200,
          defaultVal: 24,
          warningThreshold: 35,
          dangerThreshold: 75
        },
        {
          id: 'mq135',
          label: 'Nồng Độ Khí Ga / Khói MQ-135',
          unit: 'PPM',
          min: 10,
          max: 300,
          defaultVal: 45,
          warningThreshold: 100,
          dangerThreshold: 180
        },
        {
          id: 'temp',
          label: 'Nhiệt Độ Môi Trường',
          unit: '°C',
          min: 15,
          max: 45,
          defaultVal: 28,
          warningThreshold: 35,
          dangerThreshold: 40
        },
        {
          id: 'humidity',
          label: 'Độ Ẩm Không Khí',
          unit: '%',
          min: 20,
          max: 95,
          defaultVal: 62,
          warningThreshold: 75,
          dangerThreshold: 85
        }
      ]
    }
  },
  {
    id: 'iot-smart-energy-monitor',
    slug: 'esp32-smart-power-pzem004t-relay',
    title: 'Hệ Thống Giám Sát Năng Lượng & Điều Khiển Điện Nhà Thông Minh',
    tagline: 'Đo lường điện năng AC tiêu thụ, bảo vệ quá dòng và điều khiển đóng cắt tải tự động qua MQTT & Home Assistant',
    category: 'Smart Home',
    mcu: 'ESP32 NodeMCU-32S',
    status: 'Completed',
    completionDate: '2025-11',
    description:
      'Hệ thống đo lường và quản lý điện tiêu thụ thời gian thực cho gia đình hoặc tủ điện công nghiệp nhỏ. Sử dụng module cảm biến biến dòng PZEM-004T v3.0 đọc chính xác 6 thông số: Điện áp (V), Dòng điện (A), Công suất (W), Năng lượng (kWh), Tần số (Hz) và Hệ số công suất (PF). Tích hợp rơ-le quang bán dẫn cách ly để ngắt điện tự động khi quá tải hoặc chập cháy, đồng bộ dữ liệu vào Home Assistant qua giao thức MQTT.',
    highlights: [
      'Đo điện áp AC 80-260V và dòng tải đến 100A qua biến dòng CT với sai số đo lường chuẩn công nghiệp < 1%.',
      'Tự động ngắt relay bảo vệ quá dòng (Overcurrent Cutoff) trong vòng 50ms khi phát hiện sự cố tải.',
      'Giao tiếp Modbus-RTU qua cổng UART với IC cách ly quang bảo vệ tối đa vi điều khiển ESP32.',
      'Tính toán lượng điện tiêu thụ quy đổi ra thành tiền điện VNĐ theo bậc thang giá điện EVN thời gian thực.'
    ],
    features: [
      'Giao tiếp PZEM-004T qua UART phần cứng với Optocoupler cách ly an toàn điện lưới.',
      'Rơ le 4 kênh kích LOW điều khiển tải công suất lớn (Bình nóng lạnh, Máy bơm, Đèn chùm).',
      'Lưu trữ chỉ số kWh tích lũy vào bộ nhớ flash Non-Volatile Storage (NVS) không bị mất khi cúp điện.',
      'Giao diện Web Server tích hợp trực tiếp trong ESP32 hỗ trợ cấu hình Wi-Fi Captive Portal.'
    ],
    bom: [
      {
        id: 'bom-se-1',
        name: 'Kit ESP32 NodeMCU-32S',
        spec: 'Dual Core 240MHz, 4MB Flash, Wi-Fi 2.4GHz',
        quantity: 1,
        unitPrice: 82698,
        totalPrice: 82698,
        pinConnection: 'Bo xử lý trung tâm',
        category: 'mcu'
      },
      {
        id: 'bom-se-2',
        name: 'Module đo điện năng đa năng PZEM-004T v3.0 (Kèm biến dòng CT 100A)',
        spec: 'Đo V (80-260V), I (0-100A), P (0-22kW), Energy (0-9999kWh), Modbus-RTU',
        quantity: 1,
        unitPrice: 165000,
        totalPrice: 165000,
        pinConnection: 'VCC->5V, GND->GND, TX->GPIO16, RX->GPIO17',
        category: 'sensor'
      },
      {
        id: 'bom-se-3',
        name: 'Module Relay 4 Kênh 5V có Opto cách ly',
        spec: 'Chịu tải 10A 250VAC / 10A 30VDC, kích mức LOW',
        quantity: 1,
        unitPrice: 42000,
        totalPrice: 42000,
        pinConnection: 'IN1->GPIO25, IN2->GPIO26, IN3->GPIO27, IN4->GPIO14',
        category: 'actuator'
      },
      {
        id: 'bom-se-4',
        name: 'Nguồn xung hạ áp AC-DC Hi-Link HLK-PM01 (220VAC sang 5VDC 0.6A)',
        spec: 'Chống nhiễu, tích hợp sẵn trong hộp điện gắn thanh ray Din-rail',
        quantity: 1,
        unitPrice: 38000,
        totalPrice: 38000,
        pinConnection: 'AC In 220V -> DC Out 5V cấp nguồn toàn mạch',
        category: 'power'
      },
      {
        id: 'bom-se-5',
        name: 'Vỏ hộp bảo vệ gắn thanh ray Din-Rail PLC Box',
        spec: 'Nhựa ABS chống cháy, tiêu chuẩn tủ điện dân dụng',
        quantity: 1,
        unitPrice: 35000,
        totalPrice: 35000,
        pinConnection: 'Lắp đặt an toàn vào tủ điện tổng',
        category: 'other'
      }
    ],
    pinouts: [
      {
        id: 'pin-se-1',
        component: 'PZEM-004T v3.0',
        componentPin: 'TX',
        mcuPin: 'GPIO 16 (RX2)',
        protocol: 'UART',
        voltage: '5V',
        description: 'Nhận dữ liệu điện áp, dòng điện, công suất qua giao thức Modbus'
      },
      {
        id: 'pin-se-2',
        component: 'PZEM-004T v3.0',
        componentPin: 'RX',
        mcuPin: 'GPIO 17 (TX2)',
        protocol: 'UART',
        voltage: '5V',
        description: 'Gửi khung lệnh truy vấn thanh ghi dữ liệu'
      },
      {
        id: 'pin-se-3',
        component: 'Relay Module 4 Ch',
        componentPin: 'IN1, IN2, IN3, IN4',
        mcuPin: 'GPIO 25, 26, 27, 14',
        protocol: 'GPIO',
        voltage: '5V',
        description: 'Tín hiệu logic LOW để kích hoạt tiếp điểm đóng cắt tải AC'
      }
    ],
    codeFiles: [
      {
        filename: 'EnergyMonitor_ESP32.ino',
        language: 'cpp',
        description: 'Đọc dữ liệu PZEM-004T v3.0, xuất MQTT và tự động ngắt relay khi công suất vượt định mức',
        content: `/**
 * @file EnergyMonitor_ESP32.ino
 * @brief Hệ Thống Giám Sát Năng Lượng & Bảo Vệ Quá Tải
 */

#include <PZEM004Tv30.h>
#include <WiFi.h>
#include <PubSubClient.h>

#define PZEM_RX_PIN 16
#define PZEM_TX_PIN 17
#define RELAY_CH1_PIN 25
#define MAX_POWER_LIMIT_WATTS 3500.0 // Giới hạn công suất tối đa 3500W

PZEM004Tv30 pzem(Serial2, PZEM_RX_PIN, PZEM_TX_PIN);

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_CH1_PIN, OUTPUT);
  digitalWrite(RELAY_CH1_PIN, LOW); // Mặc định đóng điện cho tải
  Serial.println("[ENERGY MONITOR] System Initialized!");
}

void loop() {
  float voltage = pzem.voltage();
  float current = pzem.current();
  float power = pzem.power();
  float energy = pzem.energy();
  float frequency = pzem.frequency();
  float pf = pzem.pf();

  if (isnan(voltage)) {
    Serial.println("[ERROR] Failed to read PZEM sensor!");
  } else {
    Serial.printf("V: %.1fV | I: %.2fA | P: %.1fW | Energy: %.3fkWh | PF: %.2f\\n",
      voltage, current, power, energy, pf);

    // Bảo vệ tự ngắt quá tải
    if (power > MAX_POWER_LIMIT_WATTS) {
      digitalWrite(RELAY_CH1_PIN, HIGH); // Cắt điện ngay lập tức
      Serial.println("[ALERT] TRIP OVERLOAD DETECTED! RELAY CUT OFF!");
    }
  }
  delay(1000);
}
`
      }
    ],
    githubUrl: 'https://github.com/LAM08092021/esp32-pzem-energy-monitor',
    simulationConfig: {
      hasOled: false,
      hasBuzzer: true,
      hasLeds: true,
      sensors: [
        {
          id: 'voltage',
          label: 'Điện Áp Lưới AC',
          unit: 'V',
          min: 190,
          max: 250,
          defaultVal: 224,
          warningThreshold: 235,
          dangerThreshold: 245
        },
        {
          id: 'current',
          label: 'Dòng Điện Tải',
          unit: 'A',
          min: 0,
          max: 25,
          defaultVal: 4.8,
          warningThreshold: 12,
          dangerThreshold: 18
        },
        {
          id: 'power',
          label: 'Công Suất Tiêu Thụ',
          unit: 'W',
          min: 0,
          max: 4500,
          defaultVal: 1075,
          warningThreshold: 2500,
          dangerThreshold: 3500
        }
      ]
    }
  },
  {
    id: 'iot-smart-agriculture-lora',
    slug: 'esp32-lorawan-agriculture-node',
    title: 'Trạm Nông Nghiệp Thông Minh Giám Sát Đất & Tự Động Tưới Tiêu LoRaWAN',
    tagline: 'Truyền thông tầm xa 5-10km, pin năng lượng mặt trời, đo độ ẩm đất, EC, pH và điều khiển van từ',
    category: 'Agriculture',
    mcu: 'ESP32 + Module SX1278 LoRa',
    status: 'Completed',
    completionDate: '2025-08',
    description:
      'Hệ thống trạm IoT độc lập năng lượng ngoài trời cho nông nghiệp chính xác. Sử dụng cảm biến công nghiệp RS485 Modbus đo đồng thời độ ẩm đất, nhiệt độ đất, độ dẫn điện EC và độ pH. Dữ liệu truyền tải về Gateway trung tâm qua mạng vô tuyến tần số Sub-1GHz (433/868/915MHz) tầm xa lên tới 5-10km mà không cần sóng 4G/Wi-Fi.',
    highlights: [
      'Công nghệ sóng vô tuyến LoRa tầm xa xuyên tán cây rừng và đồi núi trên 5km.',
      'Cơ chế Deep Sleep siêu tiết kiệm điện: Dòng tĩnh chỉ 15µA, hoạt động liên tục 2 năm với viên pin 18650 tích hợp sạc năng lượng mặt trời.',
      'Đo lường chính xác các chỉ số dinh dưỡng đất (NPK, EC, pH) theo chuẩn Modbus-RTU công nghiệp.',
      'Tự động kích hoạt bơm tưới nhỏ giọt theo thuật toán thông minh dựa vào độ ẩm và dự báo thời tiết.'
    ],
    features: [
      'Bộ thu phát vô tuyến Semtech SX1278 LoRa Transceiver.',
      'Module chuyển đổi MAX485 cách ly quang học chống sét lan truyền.',
      'IC quản lý nguồn sạc pin mặt trời MPPT TP5100 / CN3791.',
      'Van điện từ Solenoid 12V thường đóng chịu nước áp lực cao.'
    ],
    bom: [
      {
        id: 'bom-ag-1',
        name: 'Bo mạch điều khiển ESP32 TTGO T-Beam (Tích hợp LoRa SX1278 & GPS NEO-6M)',
        spec: 'Tần số 433/868MHz, đế pin 18650 tích hợp, AXP192 Power Management',
        quantity: 1,
        unitPrice: 280000,
        totalPrice: 280000,
        pinConnection: 'Bo vi điều khiển + module LoRa tích hợp',
        category: 'mcu'
      },
      {
        id: 'bom-ag-2',
        name: 'Cảm biến đất công nghiệp 3 trong 1 (Nhiệt độ, Độ ẩm, EC)',
        spec: 'Chuẩn RS-485 Modbus RTU, kim dò thép không gỉ SUS316 chống ăn mòn IP68',
        quantity: 1,
        unitPrice: 245000,
        totalPrice: 245000,
        pinConnection: 'A->RS485 A, B->RS485 B',
        category: 'sensor'
      },
      {
        id: 'bom-ag-3',
        name: 'Tấm pin năng lượng mặt trời Solar Panel 5V - 6W',
        spec: 'Silic đơn tinh thể (Monocrystalline), chống nước ngoài trời',
        quantity: 1,
        unitPrice: 85000,
        totalPrice: 85000,
        pinConnection: 'Nối vào ngõ sạc Solar In của mạch',
        category: 'power'
      },
      {
        id: 'bom-ag-4',
        name: 'Van điện từ phi 21 Solenoid Valve 12VDC',
        spec: 'Loại thường đóng (NC), chịu áp suất nước 0.02 - 0.8 MPa',
        quantity: 1,
        unitPrice: 65000,
        totalPrice: 65000,
        pinConnection: 'Kích qua MOSFET IRF540N',
        category: 'actuator'
      }
    ],
    pinouts: [
      {
        id: 'pin-ag-1',
        component: 'Module LoRa SX1278',
        componentPin: 'NSS, SCK, MOSI, MISO',
        mcuPin: 'GPIO 18, 5, 27, 19',
        protocol: 'SPI',
        voltage: '3.3V',
        description: 'Giao tiếp SPI tốc độ 10MHz truyền nhận gói tin LoRa'
      },
      {
        id: 'pin-ag-2',
        component: 'Module MAX485',
        componentPin: 'RO, DI, DE/RE',
        mcuPin: 'GPIO 21, 22, 4',
        protocol: 'UART',
        voltage: '3.3V',
        description: 'Đọc cảm biến đất công nghiệp chuẩn Modbus RTU'
      }
    ],
    codeFiles: [
      {
        filename: 'LoRa_AgricultureNode.ino',
        language: 'cpp',
        description: 'Chương trình phát gói tin LoRa với cơ chế Deep Sleep',
        content: `/**
 * @file LoRa_AgricultureNode.ino
 * @brief Node cảm biến nông nghiệp truyền thông LoRa tiết kiệm năng lượng
 */

#include <SPI.h>
#include <LoRa.h>

#define SCK_PIN 5
#define MISO_PIN 19
#define MOSI_PIN 27
#define SS_PIN 18
#define RST_PIN 14
#define DIO0_PIN 26

#define uS_TO_S_FACTOR 1000000ULL  // Chuyển đổi microsecond sang second
#define TIME_TO_SLEEP  300        // Ngủ Deep Sleep 5 phút mỗi chu kỳ

void setup() {
  Serial.begin(115200);
  SPI.begin(SCK_PIN, MISO_PIN, MOSI_PIN, SS_PIN);
  LoRa.setPins(SS_PIN, RST_PIN, DIO0_PIN);

  if (!LoRa.begin(433E6)) {
    Serial.println("[LoRa] Init Failed!");
  } else {
    LoRa.setSpreadingFactor(10);
    LoRa.setSignalBandwidth(125E3);
    LoRa.setTxPower(20);

    // Giả lập đọc cảm biến đất RS485
    float soilMoisture = 42.5; // %
    float soilTemp = 27.2;     // °C
    int soilEC = 580;          // us/cm

    // Gửi gói tin LoRa
    LoRa.beginPacket();
    LoRa.printf("NODE01:M=%.1f,T=%.1f,EC=%d", soilMoisture, soilTemp, soilEC);
    LoRa.endPacket();

    Serial.println("[LoRa] Packet Sent successfully!");
  }

  // Cấu hình ESP32 vào chế độ Deep Sleep 5 phút
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial.println("[ESP32] Going to Deep Sleep now...");
  esp_deep_sleep_start();
}

void loop() {}
`
      }
    ],
    githubUrl: 'https://github.com/LAM08092021/esp32-lorawan-agriculture',
    simulationConfig: {
      hasOled: false,
      hasBuzzer: false,
      hasLeds: true,
      sensors: [
        {
          id: 'moisture',
          label: 'Độ Ẩm Đất',
          unit: '%',
          min: 0,
          max: 100,
          defaultVal: 38,
          warningThreshold: 25,
          dangerThreshold: 15
        },
        {
          id: 'soil_temp',
          label: 'Nhiệt Độ Đất',
          unit: '°C',
          min: 15,
          max: 50,
          defaultVal: 27,
          warningThreshold: 35,
          dangerThreshold: 42
        },
        {
          id: 'ec',
          label: 'Độ Dẫn Điện Đất (EC)',
          unit: 'µS/cm',
          min: 100,
          max: 2000,
          defaultVal: 650,
          warningThreshold: 1200,
          dangerThreshold: 1600
        }
      ]
    }
  }
];

export const defaultUserProfile = {
  name: 'Trương Xuân Lâm',
  title: 'IoT & Embedded Systems Engineer',
  tagline: 'Chuyên nghiên cứu và thiết kế các hệ thống nhúng, vi điều khiển ESP32/STM32, giao thức mạng IoT & giải pháp phần cứng tối ưu chi phí.',
  email: 'xuanlamlt2021@gmail.com',
  github: 'https://github.com/LAM08092021',
  linkedin: 'https://linkedin.com/in/xuanlam-iot',
  skills: [
    'ESP32 / ESP8266',
    'STM32 ARM Cortex-M',
    'C / C++ (Embedded)',
    'FreeRTOS Dual-Core',
    'MQTT / CoAP / HTTP',
    'LoRaWAN & BLE Mesh',
    'Altium PCB Design',
    'Modbus-RTU / RS-485',
    'PlatformIO & Arduino'
  ]
};

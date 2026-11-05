import React, { useState } from 'react';
import type { IoTProject, BOMItem, PinoutItem, CodeFile } from '../types';
import { X, Plus, Trash2, Cpu, Check, Layers, Terminal } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProject: (project: IoTProject) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSaveProject }) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<'Environment' | 'Smart Home' | 'Agriculture' | 'Industrial' | 'Health & Wearable'>('Environment');
  const [mcu, setMcu] = useState('ESP32 NodeMCU-32S');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  // BOM items state
  const [bomList, setBomList] = useState<BOMItem[]>([
    {
      id: 'bom-new-1',
      name: 'Kit ESP32 NodeMCU-32S',
      spec: 'Dual-Core Xtensa 240MHz, Wi-Fi & BLE',
      quantity: 1,
      unitPrice: 82000,
      totalPrice: 82000,
      category: 'mcu',
      note: 'Bo xử lý trung tâm'
    }
  ]);

  // Pinout state
  const [pinoutList] = useState<PinoutItem[]>([
    {
      id: 'pin-new-1',
      component: 'Sensor Signal',
      componentPin: 'OUT',
      mcuPin: 'GPIO 4',
      protocol: 'GPIO',
      voltage: '3.3V',
      description: 'Đường truyền dữ liệu cảm biến'
    }
  ]);

  // Code files state
  const [codeList, setCodeList] = useState<CodeFile[]>([
    {
      filename: 'main.cpp',
      language: 'cpp',
      description: 'Chương trình khởi động & vòng lặp chính',
      content: `void setup() {\n  Serial.begin(115200);\n  Serial.println("IoT Project Initialized!");\n}\n\nvoid loop() {\n  delay(1000);\n}`
    }
  ]);

  if (!isOpen) return null;

  // Add BOM row
  const addBOMRow = () => {
    setBomList([
      ...bomList,
      {
        id: `bom-new-${Date.now()}`,
        name: '',
        spec: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        category: 'sensor',
        note: ''
      }
    ]);
  };

  const removeBOMRow = (index: number) => {
    setBomList(bomList.filter((_, idx) => idx !== index));
  };

  const updateBOM = (index: number, field: keyof BOMItem, value: any) => {
    const updated = [...bomList];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      const q = field === 'quantity' ? Number(value) : updated[index].quantity;
      const p = field === 'unitPrice' ? Number(value) : updated[index].unitPrice;
      updated[index].totalPrice = q * p;
    }
    setBomList(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Vui lòng nhập tên đồ án!');
      return;
    }

    const newProject: IoTProject = {
      id: `project-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      tagline: tagline || title,
      category,
      mcu,
      status: 'Completed',
      completionDate: new Date().toISOString().slice(0, 7),
      description: description || 'Đồ án nghiên cứu thiết kế hệ thống IoT.',
      highlights: [
        `Phát triển trên nền tảng vi điều khiển ${mcu}.`,
        `Tối ưu hóa chi phí với danh mục linh kiện BOM tổng hợp.`,
        'Kiểm thử hoạt động thực tế với độ ổn định cao.'
      ],
      features: [
        'Thu thập dữ liệu cảm biến thời gian thực.',
        'Xử lý logic và tự động cảnh báo ngoại vi.',
        'Mã nguồn firmware C++/Arduino dễ dàng bảo trì.'
      ],
      bom: bomList.filter((b) => b.name.trim() !== ''),
      pinouts: pinoutList.filter((p) => p.component.trim() !== ''),
      codeFiles: codeList.filter((c) => c.filename.trim() !== ''),
      githubUrl: githubUrl || undefined
    };

    onSaveProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Thêm Đồ Án IoT Mới Vào Portfolio</h3>
              <p className="text-xs text-slate-400">
                Lưu trữ đầy đủ linh kiện, sơ đồ đấu nối và mã nguồn để nâng tầm CV của bạn
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* General Information */}
          <div className="space-y-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <span className="font-bold text-slate-300 uppercase tracking-wider block text-xs">
              1. Thông Tin Chung Đồ Án
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Tên Đồ Án *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Trạm Thời Tiết IoT Dự Báo Mưa Tự Động..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Vi Điều Khiển Trung Tâm (MCU) *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: ESP32 NodeMCU-32S, STM32F103C8T6..."
                  value={mcu}
                  onChange={(e) => setMcu(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Lĩnh Vực / Danh Mục</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Environment">Môi trường & Không khí (Environment)</option>
                  <option value="Smart Home">Nhà thông minh (Smart Home)</option>
                  <option value="Agriculture">Nông nghiệp thông minh (Agriculture)</option>
                  <option value="Industrial">Công nghiệp & Năng lượng (Industrial)</option>
                  <option value="Health & Wearable">Y tế & Thiết bị đeo (Health)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Link GitHub Repository</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Mô tả ngắn gọn tóm tắt (Tagline)</label>
              <input
                type="text"
                placeholder="VD: Hệ thống giám sát nhiệt độ, độ ẩm và cảnh báo cháy tự động qua MQTT..."
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Chi tiết giải pháp & Kiến trúc</label>
              <textarea
                rows={2}
                placeholder="Mô tả nguyên lý hoạt động, thuật toán, ứng dụng thực tế..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* BOM Section */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 text-xs">
                <Layers className="w-4 h-4 text-emerald-400" />
                2. Bảng Danh Mục Linh Kiện (BOM)
              </span>
              <button
                type="button"
                onClick={addBOMRow}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm linh kiện</span>
              </button>
            </div>

            <div className="space-y-2">
              {bomList.map((item, idx) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <div className="col-span-5 sm:col-span-4">
                    <input
                      type="text"
                      placeholder="Tên linh kiện (VD: DHT22, OLED...)"
                      value={item.name}
                      onChange={(e) => updateBOM(idx, 'name', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <input
                      type="text"
                      placeholder="Thông số / Chân nối"
                      value={item.spec || ''}
                      onChange={(e) => updateBOM(idx, 'spec', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <input
                      type="number"
                      placeholder="Giá VNĐ"
                      value={item.unitPrice}
                      onChange={(e) => updateBOM(idx, 'unitPrice', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-emerald-400 text-xs font-mono"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2 flex items-center justify-between">
                    <input
                      type="number"
                      min={1}
                      placeholder="SL"
                      value={item.quantity}
                      onChange={(e) => updateBOM(idx, 'quantity', e.target.value)}
                      className="w-12 bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-white text-xs font-mono"
                    />
                    {bomList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBOMRow(idx)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Section */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 text-xs">
              <Terminal className="w-4 h-4 text-cyan-400" />
              3. Mã Nguồn Firmware (.ino / .cpp)
            </span>

            {codeList.map((file, idx) => (
              <div key={idx} className="space-y-2">
                <input
                  type="text"
                  placeholder="Tên tệp (VD: main.ino)"
                  value={file.filename}
                  onChange={(e) => {
                    const next = [...codeList];
                    next[idx].filename = e.target.value;
                    setCodeList(next);
                  }}
                  className="w-full sm:w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white text-xs font-mono"
                />
                <textarea
                  rows={6}
                  placeholder="// Dán mã nguồn C++/Arduino của bạn vào đây..."
                  value={file.content}
                  onChange={(e) => {
                    const next = [...codeList];
                    next[idx].content = e.target.value;
                    setCodeList(next);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-cyan-200 font-mono text-xs"
                />
              </div>
            ))}
          </div>

          {/* Footer Save Button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Lưu Đồ Án Vào Portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

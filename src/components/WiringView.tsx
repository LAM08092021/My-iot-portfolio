import React from 'react';
import type { PinoutItem } from '../types';
import { Cpu, AlertTriangle } from 'lucide-react';

interface WiringViewProps {
  pinouts: PinoutItem[];
  mcu: string;
}

export const WiringView: React.FC<WiringViewProps> = ({ pinouts, mcu }) => {
  const getProtocolBadge = (proto: string) => {
    switch (proto) {
      case 'I2C':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'UART':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'SPI':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'ADC':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'PWM':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
      case 'GPIO':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const getVoltageBadge = (vol: string) => {
    if (vol === '5V') return 'text-red-400 bg-red-500/10 border-red-500/30';
    if (vol === '3.3V') return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    return 'text-slate-400 bg-slate-800 border-slate-700';
  };

  return (
    <div className="space-y-6">
      {/* Notice header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              Sơ Đồ Đấu Nối Chân Phần Cứng (Pinout Wiring Guide)
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              Bảng quy ước phân bổ chân GPIO vi điều khiển <strong className="text-cyan-300">{mcu}</strong> kết nối tới các cảm biến, màn hình I2C và cơ cấu cảnh báo.
            </p>
          </div>
        </div>

        {/* Engineering notes alert */}
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Lưu ý kỹ thuật phần cứng:</strong> Chân GPIO của ESP32 hoạt động ở mức logic <strong>3.3V</strong> (chịu áp tối đa 3.6V). Với các cảm biến cấp nguồn 5V như MQ-135 hoặc PMS5003, đường tín hiệu truyền về ADC/RX cần đảm bảo phân áp điện trở hoặc tương thích logic 3.3V để bảo vệ vi điều khiển.
          </div>
        </div>
      </div>

      {/* Pinout Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-900/90 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Thiết bị ngoại vi</th>
              <th className="py-3 px-3">Chân cảm biến</th>
              <th className="py-3 px-4">Chân ESP32 (MCU)</th>
              <th className="py-3 px-3 text-center">Giao thức</th>
              <th className="py-3 px-3 text-center">Điện áp</th>
              <th className="py-3 px-4">Mô tả chức năng đường truyền</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {pinouts.map((pin) => (
              <tr key={pin.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 font-semibold text-white">
                  {pin.component}
                </td>
                <td className="py-3 px-3 font-mono text-cyan-300">
                  {pin.componentPin}
                </td>
                <td className="py-3 px-4 font-mono font-bold text-amber-300">
                  {pin.mcuPin}
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getProtocolBadge(pin.protocol)}`}>
                    {pin.protocol}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${getVoltageBadge(pin.voltage)}`}>
                    {pin.voltage}
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-slate-400">
                  {pin.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

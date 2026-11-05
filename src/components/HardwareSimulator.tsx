import React, { useState, useEffect, useRef } from 'react';
import type { IoTProject } from '../types';
import { Volume2, VolumeX, Sliders, Activity, Radio, RotateCcw } from 'lucide-react';

interface HardwareSimulatorProps {
  project: IoTProject;
}

export const HardwareSimulator: React.FC<HardwareSimulatorProps> = ({ project }) => {
  const config = project.simulationConfig;

  // Initialize sensor values
  const [sensorValues, setSensorValues] = useState<{ [id: string]: number }>(() => {
    const initial: { [id: string]: number } = {};
    config?.sensors.forEach((s) => {
      initial[s.id] = s.defaultVal;
    });
    return initial;
  });

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [history, setHistory] = useState<number[]>([20, 22, 24, 25, 23, 24, 28, 30, 29, 25]);
  const [logs, setLogs] = useState<string[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Derive status
  const pm25 = sensorValues['pm25'] ?? 24;
  const gas = sensorValues['mq135'] ?? 45;
  const temp = sensorValues['temp'] ?? 28;
  const hum = sensorValues['humidity'] ?? 60;

  // Calculate AQI
  let aqi = 35;
  let status: 'GOOD' | 'MODERATE' | 'HAZARDOUS' = 'GOOD';
  if (pm25 <= 35 && gas < 100) {
    aqi = Math.round((pm25 / 35) * 50);
    status = 'GOOD';
  } else if (pm25 <= 75 || gas < 180) {
    aqi = 50 + Math.round(((pm25 - 35) / 40) * 50);
    status = 'MODERATE';
  } else {
    aqi = 100 + Math.round(((pm25 - 75) / 125) * 100);
    status = 'HAZARDOUS';
  }

  // Audio Buzzer Beep using Web Audio API
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(2400, ctx.currentTime); // 2.4kHz buzzer tone
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // AudioContext fallback
    }
  };

  // Beep when hazardous
  useEffect(() => {
    if (status === 'HAZARDOUS' && soundEnabled) {
      const interval = setInterval(() => {
        playBeep();
      }, 700);
      return () => clearInterval(interval);
    }
  }, [status, soundEnabled]);

  // Periodic Telemetry Update
  useEffect(() => {
    const timer = setInterval(() => {
      setHistory((prev) => {
        const next = [...prev.slice(1), pm25 + Math.floor(Math.random() * 5 - 2)];
        return next;
      });

      const now = new Date().toTimeString().split(' ')[0];
      const logLine = `[${now}] MQTT PUB -> {"pm25":${pm25},"gas":${gas},"temp":${temp},"hum":${hum},"aqi":${aqi}}`;
      setLogs((prev) => [logLine, ...prev.slice(0, 7)]);
    }, 2500);

    return () => clearInterval(timer);
  }, [pm25, gas, temp, hum, aqi]);

  const handleSliderChange = (id: string, val: number) => {
    setSensorValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleReset = () => {
    const resetVals: { [id: string]: number } = {};
    config?.sensors.forEach((s) => {
      resetVals[s.id] = s.defaultVal;
    });
    setSensorValues(resetVals);
  };

  if (!config) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
        Đồ án này chưa tích hợp cấu hình mô phỏng trực tiếp.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            Phòng Thí Nghiệm Ảo: Giả Lập Phần Cứng ESP32 Thời Gian Thực
          </span>
          <p className="text-xs text-slate-400 mt-1">
            Kéo các thanh trượt bên dưới để mô phỏng sự thay đổi của môi trường và quan sát màn hình OLED, đèn LED và còi buzzer phản ứng.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              soundEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'Còi: BẬT' : 'Còi: TẮT'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mặc định</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Virtual Hardware Board (OLED + LEDs + Buzzer) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              ESP32 Circuit Board Simulation
            </span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              FreeRTOS Active (Core 0/1)
            </span>
          </div>

          {/* Virtual OLED Display 128x64 */}
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Màn hình OLED 0.96" SSD1306 (I2C 0x3C):
            </span>
            <div className="relative bg-[#020b14] border-4 border-slate-800 rounded-xl p-4 shadow-inner max-w-sm mx-auto font-mono text-cyan-300">
              {/* Screen Content */}
              <div className="flex items-baseline justify-between border-b border-cyan-800/60 pb-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs text-cyan-400 font-bold">AQI:</span>
                  <span className="text-2xl font-black text-cyan-200">{aqi}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    status === 'GOOD'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : status === 'MODERATE'
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      : 'bg-red-950 text-red-300 border border-red-500/40 animate-pulse'
                  }`}
                >
                  [{status}]
                </span>
              </div>

              {/* Data lines */}
              <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-xs mt-2.5">
                <div>
                  <span className="text-cyan-400/80 text-[10px] block">PM2.5:</span>
                  <span className="font-bold text-sm text-cyan-100">{pm25} µg/m³</span>
                </div>
                <div>
                  <span className="text-cyan-400/80 text-[10px] block">Gas MQ135:</span>
                  <span className="font-bold text-sm text-cyan-100">{gas} PPM</span>
                </div>
                <div>
                  <span className="text-cyan-400/80 text-[10px] block">Nhiệt độ:</span>
                  <span className="font-semibold text-cyan-200">{temp}°C</span>
                </div>
                <div>
                  <span className="text-cyan-400/80 text-[10px] block">Độ ẩm:</span>
                  <span className="font-semibold text-cyan-200">{hum}% RH</span>
                </div>
              </div>

              {/* Sparkline mini chart */}
              <div className="mt-3 pt-2 border-t border-cyan-900/60 flex items-end justify-between h-8 gap-1">
                {history.map((val, idx) => {
                  const h = Math.min(Math.max((val / 100) * 28, 4), 28);
                  return (
                    <div
                      key={idx}
                      style={{ height: `${h}px` }}
                      className="flex-1 bg-cyan-400/70 rounded-t-xs"
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Indicators row: 3 LEDs & Buzzer */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {/* 3 LEDs */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
                Đèn LED báo trạng thái:
              </span>
              <div className="flex items-center justify-around">
                {/* Green */}
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-full transition-all duration-300 ${
                      status === 'GOOD'
                        ? 'bg-emerald-400 shadow-[0_0_15px_#34d399]'
                        : 'bg-emerald-950/60 opacity-40'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-emerald-400">GOOD</span>
                </div>

                {/* Yellow */}
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-full transition-all duration-300 ${
                      status === 'MODERATE'
                        ? 'bg-amber-400 shadow-[0_0_15px_#fbbf24]'
                        : 'bg-amber-950/60 opacity-40'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-amber-400">WARN</span>
                </div>

                {/* Red */}
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-full transition-all duration-300 ${
                      status === 'HAZARDOUS'
                        ? 'bg-red-500 shadow-[0_0_20px_#ef4444] animate-pulse'
                        : 'bg-red-950/60 opacity-40'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-red-400">HAZARD</span>
                </div>
              </div>
            </div>

            {/* Buzzer */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">
                Còi Báo Động (Active Buzzer):
              </span>
              <div className="flex items-center gap-3 mt-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    status === 'HAZARDOUS'
                      ? 'bg-red-500/20 border-red-500 text-red-400 animate-bounce'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-white">
                    {status === 'HAZARDOUS' ? 'BÁO ĐỘNG HÚ (BEEP)' : 'TRẠNG THÁI TẮT'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    GPIO 18 {status === 'HAZARDOUS' ? '-> HIGH (Active)' : '-> LOW (Silent)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Sliders & Live Telemetry */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Điều Chỉnh Giá Trị Cảm Biến Môi Trường
            </span>

            {config.sensors.map((sensor) => {
              const val = sensorValues[sensor.id] ?? sensor.defaultVal;
              return (
                <div key={sensor.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">{sensor.label}</span>
                    <span className="font-mono font-bold text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
                      {val} {sensor.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={sensor.min}
                    max={sensor.max}
                    value={val}
                    onChange={(e) => handleSliderChange(sensor.id, Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{sensor.min} {sensor.unit}</span>
                    <span className="text-amber-400">Ngưỡng: {sensor.warningThreshold} {sensor.unit}</span>
                    <span>{sensor.max} {sensor.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MQTT Serial Telemetry Stream */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-[11px] space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Live MQTT Telemetry Stream (115200 Baud)
              </span>
              <span className="text-[10px] text-emerald-400">Connected</span>
            </div>

            <div className="space-y-1 text-slate-400 max-h-36 overflow-y-auto">
              {logs.map((log, i) => (
                <p key={i} className="truncate hover:text-slate-200 transition-colors">
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

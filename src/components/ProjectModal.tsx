import React, { useState } from 'react';
import type { IoTProject } from '../types';
import { BOMTable } from './BOMTable';
import { WiringView } from './WiringView';
import { CodeViewer } from './CodeViewer';
import { HardwareSimulator } from './HardwareSimulator';
import { X, Layers, Cpu, Terminal, Activity, FileText, CheckCircle, ExternalLink, Calendar, GitFork } from 'lucide-react';

interface ProjectModalProps {
  project: IoTProject | null;
  initialTab?: 'overview' | 'bom' | 'wiring' | 'code' | 'sim';
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, initialTab = 'overview', onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bom' | 'wiring' | 'code' | 'sim'>(initialTab);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/90 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {project.category}
              </span>
              <span className="text-xs font-mono font-medium text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700/60 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                {project.mcu}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Hoàn thành: {project.completionDate}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-6 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tổng Quan & CV Highlights</span>
          </button>

          <button
            onClick={() => setActiveTab('bom')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'bom'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Bảng Linh Kiện & Chi Phí ({project.bom.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wiring')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'wiring'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Sơ Đồ Đấu Nối Pinout</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Mã Nguồn Firmware ({project.codeFiles.length})</span>
          </button>

          {project.simulationConfig && (
            <button
              onClick={() => setActiveTab('sim')}
              className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'sim'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Phòng Lab Giả Lập</span>
            </button>
          )}
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-sm uppercase font-bold text-slate-300 tracking-wider mb-2">
                  Mô Tả Dự Án & Vấn Đề Giải Quyết
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Highlights for CV */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-sm uppercase font-bold text-cyan-400 tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  Điểm Nhấn Kỹ Thuật (CV Highlights)
                </h4>
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* System Architecture Features */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-sm uppercase font-bold text-indigo-400 tracking-wider mb-3 flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-indigo-400" />
                  Tính Năng & Kiến Trúc Phần Cứng
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-900/80 border border-slate-800/80 rounded-xl text-xs text-slate-300 flex items-start gap-2"
                    >
                      <span className="font-mono text-cyan-400 font-bold shrink-0">0{idx + 1}.</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links & CTA */}
              {project.githubUrl && (
                <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-xs text-slate-400">
                    Mã nguồn và sơ đồ mạch thiết kế mở trên GitHub Repository:
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg transition-colors"
                  >
                    <span>Xem trên GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bom' && (
            <BOMTable items={project.bom} projectTitle={project.title} />
          )}

          {activeTab === 'wiring' && (
            <WiringView pinouts={project.pinouts} mcu={project.mcu} />
          )}

          {activeTab === 'code' && (
            <CodeViewer files={project.codeFiles} />
          )}

          {activeTab === 'sim' && (
            <HardwareSimulator project={project} />
          )}
        </div>
      </div>
    </div>
  );
};

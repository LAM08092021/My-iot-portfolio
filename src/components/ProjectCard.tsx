import React from 'react';
import type { IoTProject } from '../types';
import { formatCurrencyVND } from '../utils/formatters';
import { Cpu, DollarSign, Layers, ChevronRight, Activity, Terminal } from 'lucide-react';

interface ProjectCardProps {
  project: IoTProject;
  onSelectProject: (project: IoTProject, tab?: 'overview' | 'bom' | 'wiring' | 'code' | 'sim') => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  const totalBOMCost = project.bom.reduce((acc, item) => acc + item.totalPrice, 0);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Environment':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Smart Home':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Agriculture':
        return 'text-lime-400 bg-lime-500/10 border-lime-500/30';
      case 'Industrial':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      default:
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    }
  };

  return (
    <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.8 rounded-full border ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" />
            {project.mcu}
          </span>
        </div>

        <h3
          onClick={() => onSelectProject(project, 'overview')}
          className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2"
        >
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* BOM & Hardware Metrics Bar */}
        <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-400" />
              Linh kiện (BOM)
            </span>
            <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
              {project.bom.length} linh kiện
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-400" />
              Chi phí phần cứng
            </span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block truncate">
              {formatCurrencyVND(totalBOMCost)}
            </span>
          </div>
        </div>

        {/* Sensors list tag pills */}
        <div className="mt-3.5">
          <span className="text-[10px] text-slate-400 uppercase font-medium block mb-1.5">
            Cảm biến & Ngoại vi cốt lõi:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.bom.slice(0, 4).map((item) => (
              <span
                key={item.id}
                className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                {item.name.split('(')[0].trim()}
              </span>
            ))}
            {project.bom.length > 4 && (
              <span className="text-[11px] text-slate-400 px-1 py-0.5">
                +{project.bom.length - 4} khác
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectProject(project, 'code')}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 text-xs flex items-center gap-1 transition-colors"
            title="Xem mã nguồn firmware C++"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Source Code</span>
          </button>

          {project.simulationConfig && (
            <button
              onClick={() => onSelectProject(project, 'sim')}
              className="p-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/50 text-xs flex items-center gap-1 transition-colors"
              title="Mở bộ giả lập tương tác OLED/Sensors"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Mô Phỏng</span>
            </button>
          )}
        </div>

        <button
          onClick={() => onSelectProject(project, 'overview')}
          className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
        >
          <span>Chi tiết đồ án</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Cpu, Mail, Download, PlusCircle, Upload, ShieldCheck, Sparkles, Edit3, Check, Globe } from 'lucide-react';
import { defaultUserProfile } from '../data/defaultProjects';
import { formatCurrencyVND } from '../utils/formatters';

interface ProfileHeaderProps {
  totalProjects: number;
  totalBOMCost: number;
  onOpenAddModal: () => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  totalProjects,
  totalBOMCost,
  onOpenAddModal,
  onExportData,
  onImportData
}) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('iot_portfolio_user_profile');
    return saved ? JSON.parse(saved) : defaultUserProfile;
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    localStorage.setItem('iot_portfolio_user_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Column: Avatar & Bio */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-xl shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to Work
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-slate-800 text-white font-bold text-xl sm:text-2xl px-2 py-1 rounded border border-cyan-500 focus:outline-none"
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    {profile.name}
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  </h1>
                )}

                <button
                  onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                  className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-xs flex items-center gap-1"
                  title="Chỉnh sửa thông tin cá nhân"
                >
                  {isEditing ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit3 className="w-3.5 h-3.5" />}
                  <span>{isEditing ? 'Lưu' : 'Sửa'}</span>
                </button>
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="bg-slate-800 text-cyan-300 font-medium text-sm px-2 py-1 rounded border border-cyan-500/50 w-full"
                />
              ) : (
                <p className="text-sm sm:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                  {profile.title}
                </p>
              )}

              {isEditing ? (
                <textarea
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  rows={2}
                  className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded border border-cyan-500/50 w-full resize-none"
                />
              ) : (
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                  {profile.tagline}
                </p>
              )}

              {/* Social / Contact links */}
              <div className="flex items-center gap-3 pt-2 text-xs text-slate-300 flex-wrap">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/60"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{profile.email}</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/60"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/60"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 w-full lg:w-auto">
            {/* Quick Stat badges */}
            <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto">
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3 min-w-[130px] shadow-sm">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Đồ Án IoT
                </span>
                <span className="text-xl font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {totalProjects} Dự án
                </span>
              </div>
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3 min-w-[140px] shadow-sm">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Tổng BOM Phần Cứng
                </span>
                <span className="text-xl font-bold text-emerald-400 mt-0.5 block truncate">
                  {formatCurrencyVND(totalBOMCost)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end pt-1">
              <button
                onClick={onOpenAddModal}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Thêm Đồ Án Mới</span>
              </button>

              <button
                onClick={onExportData}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Tải về file sao lưu JSON tất cả đồ án"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất JSON</span>
              </button>

              <label className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Nhập JSON</span>
                <input type="file" accept=".json" onChange={onImportData} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Skills ticker */}
        <div className="mt-6 pt-5 border-t border-slate-800/60 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
            Chuyên môn phần cứng & nhúng:
          </span>
          {profile.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800/90 text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

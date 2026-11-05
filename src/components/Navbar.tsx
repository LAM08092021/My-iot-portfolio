import React from 'react';
import { Cpu, Search } from 'lucide-react';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories
}) => {
  const getCategoryName = (c: string) => {
    switch (c) {
      case 'all':
        return 'Tất Cả';
      case 'Environment':
        return 'Môi Trường & Không Khí';
      case 'Smart Home':
        return 'Nhà Thông Minh';
      case 'Agriculture':
        return 'Nông Nghiệp LoRa';
      case 'Industrial':
        return 'Công Nghiệp';
      default:
        return c;
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                IoT Portfolio Hub
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded">
                  v2.0
                </span>
              </span>
              <p className="text-[10px] text-slate-400">
                Linh Kiện BOM • Sơ Đồ Đấu Nối • Firmware C++
              </p>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-1 text-[11px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Public CV Ready
          </div>
        </div>

        {/* Search & Categories Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative min-w-[220px] sm:min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo ESP32, PMS5003, MQ135..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-cyan-500/60 placeholder:text-slate-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {getCategoryName(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

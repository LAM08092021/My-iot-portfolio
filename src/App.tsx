import React, { useState, useEffect, useMemo } from 'react';
import type { IoTProject } from './types';
import { defaultProjects } from './data/defaultProjects';
import { ProfileHeader } from './components/ProfileHeader';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { AddProjectModal } from './components/AddProjectModal';
import { Sparkles, Cpu } from 'lucide-react';

export function App() {
  const [projects, setProjects] = useState<IoTProject[]>(() => {
    const saved = localStorage.getItem('iot_portfolio_projects');
    if (saved) {
      try {
        const parsed: IoTProject[] = JSON.parse(saved);
        const parsedIds = new Set(parsed.map((p) => p.id));
        const missingDefaults = defaultProjects.filter((dp) => !parsedIds.has(dp.id));
        if (missingDefaults.length > 0) {
          const merged = [...missingDefaults, ...parsed];
          localStorage.setItem('iot_portfolio_projects', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch {
        return defaultProjects;
      }
    }
    return defaultProjects;
  });

  const [selectedProject, setSelectedProject] = useState<IoTProject | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'bom' | 'wiring' | 'code' | 'sim'>('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('iot_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  // Total BOM cost
  const totalBOMCost = useMemo(() => {
    return projects.reduce((total, p) => {
      const pCost = p.bom.reduce((sub, item) => sub + item.totalPrice, 0);
      return total + pCost;
    }, 0);
  }, [projects]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.mcu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.bom.some(
          (b) =>
            b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.spec && b.spec.toLowerCase().includes(searchTerm.toLowerCase()))
        );

      const matchCat = selectedCategory === 'all' || project.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [projects, searchTerm, selectedCategory]);

  const handleOpenProject = (project: IoTProject, tab: 'overview' | 'bom' | 'wiring' | 'code' | 'sim' = 'overview') => {
    setSelectedProject(project);
    setModalTab(tab);
  };

  const handleAddProject = (newProject: IoTProject) => {
    setProjects([newProject, ...projects]);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `iot_projects_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            setProjects(parsed);
            alert('Nhập danh sách đồ án thành công!');
          } else {
            alert('File JSON không đúng định dạng mảng đồ án IoT!');
          }
        } catch {
          alert('Lỗi đọc file JSON!');
        }
      };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-white">
      {/* Profile Header */}
      <ProfileHeader
        totalProjects={projects.length}
        totalBOMCost={totalBOMCost}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onExportData={handleExportJSON}
        onImportData={handleImportJSON}
      />

      {/* Navigation & Search */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Main Portfolio Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Danh Mục Đồ Án IoT Nổi Bật
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Tất cả đồ án đều kèm hóa đơn linh kiện thực tế, sơ đồ chân nối chuẩn xác và mã nguồn hoạt động được.
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
            Hiển thị {filteredProjects.length} / {projects.length} đồ án
          </span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
            <Cpu className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-300">Không tìm thấy đồ án phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thử tìm kiếm với từ khóa khác hoặc bấm nút "Thêm Đồ Án Mới" để bổ sung đồ án vào portfolio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={handleOpenProject}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer / CV Showcase Guide */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>
              IoT & Embedded Systems Portfolio Showcase • Sẵn sàng triển khai <strong>GitHub Pages / Vercel</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Thiết kế tối ưu cho Nhà Tuyển Dụng & Kỹ Sư Phần Cứng</span>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          initialTab={modalTab}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveProject={handleAddProject}
      />
    </div>
  );
}

export default App;

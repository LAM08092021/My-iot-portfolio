import React, { useState, useMemo } from 'react';
import type { BOMItem } from '../types';
import { formatCurrencyVND } from '../utils/formatters';
import { Download, Search } from 'lucide-react';

interface BOMTableProps {
  items: BOMItem[];
  projectTitle: string;
}

export const BOMTable: React.FC<BOMTableProps> = ({ items, projectTitle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const totalCost = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.totalPrice, 0);
  }, [items]);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ['all', ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.spec && item.spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.note && item.note.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [items, searchTerm, selectedCategory]);

  const exportToCSV = () => {
    const headers = ['STT', 'Tên linh kiện', 'Thông số kỹ thuật', 'Số lượng', 'Đơn giá (VND)', 'Thành tiền (VND)', 'Ghi chú chức năng'];
    const rows = items.map((item, index) => [
      index + 1,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${(item.spec || '').replace(/"/g, '""')}"`,
      item.quantity,
      item.unitPrice,
      item.totalPrice,
      `"${(item.note || item.pinConnection || '').replace(/"/g, '""')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BOM_${projectTitle.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'mcu':
        return 'Vi điều khiển';
      case 'sensor':
        return 'Cảm biến';
      case 'display':
        return 'Màn hình hiển thị';
      case 'actuator':
        return 'Chấp hành / Còi / LED';
      case 'passive':
        return 'Linh kiện thụ động';
      case 'power':
        return 'Cấp nguồn';
      default:
        return 'Phụ kiện / Breadboard';
    }
  };

  return (
    <div className="space-y-4">
      {/* Top summary card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
            Bảng dự toán chi phí linh kiện (Bill of Materials)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {formatCurrencyVND(totalCost)}
            </h4>
            <span className="text-xs text-slate-400">
              / Tổng cộng {items.length} hạng mục vật tư
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Chi phí thực tế theo hóa đơn mua sắm linh kiện cho đề tài nghiên cứu & thử nghiệm.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Xuất File CSV / Excel</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên linh kiện, mã chip, thông số..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 text-sm text-slate-200 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-cyan-500/60 placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-900/90 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
            <tr>
              <th className="py-3 px-3 text-center w-12">STT</th>
              <th className="py-3 px-4">Tên linh kiện & Thông số</th>
              <th className="py-3 px-3 text-center">Phân loại</th>
              <th className="py-3 px-3 text-center">SL</th>
              <th className="py-3 px-4 text-right">Đơn giá</th>
              <th className="py-3 px-4 text-right">Thành tiền</th>
              <th className="py-3 px-4">Chức năng & Ghi chú</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3 text-center font-mono text-slate-400">
                  {index + 1}
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-white block">
                    {item.name}
                  </span>
                  {item.spec && (
                    <span className="text-xs text-slate-400 block mt-0.5 font-mono">
                      {item.spec}
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                    {getCategoryLabel(item.category)}
                  </span>
                </td>
                <td className="py-3 px-3 text-center font-semibold text-slate-300">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-300">
                  {item.unitPrice === 0 ? (
                    <span className="text-slate-400">Có sẵn</span>
                  ) : (
                    formatCurrencyVND(item.unitPrice)
                  )}
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                  {item.totalPrice === 0 ? (
                    <span className="text-slate-400">0 đ</span>
                  ) : (
                    formatCurrencyVND(item.totalPrice)
                  )}
                </td>
                <td className="py-3 px-4 text-xs text-slate-400">
                  {item.note || item.pinConnection || '—'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-900/90 font-bold text-slate-200 border-t border-slate-800">
            <tr>
              <td colSpan={5} className="py-3 px-4 text-right uppercase text-xs tracking-wider">
                Tổng cộng chi phí (VND):
              </td>
              <td className="py-3 px-4 text-right font-mono text-base text-emerald-400">
                {formatCurrencyVND(
                  filteredItems.reduce((acc, curr) => acc + curr.totalPrice, 0)
                )}
              </td>
              <td className="py-3 px-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

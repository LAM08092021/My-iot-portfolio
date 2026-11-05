import React, { useState } from 'react';
import type { CodeFile } from '../types';
import { Copy, Check, Download, FileCode, Terminal } from 'lucide-react';

interface CodeViewerProps {
  files: CodeFile[];
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ files }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = files[activeFileIndex] || files[0];

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* File Tabs & Actions Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* File tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {files.map((file, idx) => (
            <button
              key={file.filename}
              onClick={() => setActiveFileIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap border ${
                activeFileIndex === idx
                  ? 'bg-slate-800 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>{file.filename}</span>
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sao chép Code</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tải về</span>
          </button>
        </div>
      </div>

      {/* Description tag */}
      {activeFile?.description && (
        <div className="px-3.5 py-2 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs text-slate-400 flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{activeFile.description}</span>
        </div>
      )}

      {/* Code Area */}
      <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-slate-400">{activeFile?.filename}</span>
          </div>
          <span className="uppercase text-[10px] tracking-wider text-slate-400">
            {activeFile?.language || 'c++'}
          </span>
        </div>

        <div className="p-4 max-h-[550px] overflow-auto font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
          <pre className="overflow-x-auto selection:bg-cyan-500/30">
            <code>{activeFile?.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

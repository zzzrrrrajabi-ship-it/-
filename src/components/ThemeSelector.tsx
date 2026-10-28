import React from 'react';
import { Sun, BookOpen, Sparkles, Moon } from 'lucide-react';
import { ReadingTheme } from '../types';

interface ThemeSelectorProps {
  currentTheme: ReadingTheme;
  onThemeChange: (theme: ReadingTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const themes: { id: ReadingTheme; label: string; icon: React.ReactNode; previewBg: string }[] = [
    { id: 'day', label: 'روشنایی روز', icon: <Sun className="w-3.5 h-3.5" />, previewBg: 'bg-[#F8F9F6] border-[#E1E8DF]' },
    { id: 'parchment', label: 'کاغذ سنتی', icon: <BookOpen className="w-3.5 h-3.5" />, previewBg: 'bg-[#F5EFEB] border-[#DECDBA]' },
    { id: 'basil', label: 'سبز ریحان', icon: <Sparkles className="w-3.5 h-3.5" />, previewBg: 'bg-[#EBF3ED] border-[#CBE0D1]' },
    { id: 'night', label: 'حالت شب', icon: <Moon className="w-3.5 h-3.5" />, previewBg: 'bg-[#0C1511] border-[#24382E]' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-white/10 rounded-xl text-xs font-medium">
      {themes.map((t) => {
        const isActive = currentTheme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onThemeChange(t.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap ${
              isActive
                ? 'bg-white dark:bg-[#1E2E25] text-[#1B4332] dark:text-[#E2ECE5] shadow-xs font-semibold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
            title={t.label}
          >
            <span className={`w-2.5 h-2.5 rounded-full border ${t.previewBg}`} />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

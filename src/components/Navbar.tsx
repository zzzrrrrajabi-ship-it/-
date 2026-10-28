import React from 'react';
import { Layers } from 'lucide-react';
import { ReadingTheme } from '../types';
import { ThemeSelector } from './ThemeSelector';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentTheme: ReadingTheme;
  onThemeChange: (theme: ReadingTheme) => void;
  isMobileSimulator: boolean;
  onToggleSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currentTheme,
  onThemeChange,
  isMobileSimulator,
  onToggleSimulator,
}) => {
  const navItems = [
    { id: 'mushaf', label: 'مصحف و تلاوت' },
    { id: 'mutashabihat', label: 'آیات متشابه' },
    { id: 'partner', label: 'همبحث آنلاین' },
    { id: 'academy', label: 'آکادمی تجوید' },
    { id: 'leitner', label: 'لایتنر و آزمون' },
    { id: 'analytics', label: 'نمودار پیشرفت' },
    { id: 'architecture', label: 'معماری و دیتابیس' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-[#0C1511]/85 border-b border-[#E1E8DF] dark:border-[#24382E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand wordmark & emblem */}
        <div 
          onClick={() => onTabChange('mushaf')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <img 
            src="/src/assets/images/reyhan_app_brand_logo_1793157929565.jpg" 
            alt="Reyhan Logo"
            className="w-9 h-9 rounded-xl object-cover shadow-xs border border-[#2D6A4F]/20" 
          />
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-[#1C2B22] dark:text-[#E2ECE5] leading-tight">
              ریحان
            </span>
            <span className="text-[10px] tracking-wider text-[#52665A] dark:text-[#8EAA97] font-medium font-mono uppercase">
              Reyhan Hifz
            </span>
          </div>
        </div>

        {/* Zone 2: 5 clean navigation links with hover state */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-[#2D6A4F] dark:text-[#52B788] font-bold'
                    : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D6A4F] dark:bg-[#52B788] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action & theme controls */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />

          <button
            onClick={onToggleSimulator}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
              isMobileSimulator
                ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                : 'bg-black/5 dark:bg-white/10 text-[#2D6A4F] dark:text-[#52B788] border-transparent hover:border-[#2D6A4F]/30'
            }`}
            title="تغییر حالت نمایش دسکتاپ و شبیه‌ساز گوشی همراه"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isMobileSimulator ? 'حالت دسکتاپ' : 'پیش‌نمایش موبایل'}</span>
          </button>
        </div>

      </div>

      {/* Mobile nav sub-bar */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-[#E1E8DF] dark:border-[#24382E] gap-2 scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-[#2D6A4F] text-white font-medium'
                  : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};

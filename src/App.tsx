import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { QuranReader } from './components/QuranReader';
import { MutashabihatExplorer } from './components/MutashabihatExplorer';
import { PartnerMatching } from './components/PartnerMatching';
import { AcademyTajweedAI } from './components/AcademyTajweedAI';
import { LeitnerAndTests } from './components/LeitnerAndTests';
import { LiveCircles } from './components/LiveCircles';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { RetentionAnalytics } from './components/RetentionAnalytics';
import { ReadingTheme } from './types';
import { BookOpen, Sparkles, Users, Mic, Layers, Cpu, Radio, Smartphone, Monitor, TrendingUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('mushaf');
  const [theme, setTheme] = useState<ReadingTheme>('basil');
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(false);

  const getThemeClass = (t: ReadingTheme) => {
    switch (t) {
      case 'day': return 'theme-day bg-[#F8F9F6] text-[#1C2B22]';
      case 'parchment': return 'theme-parchment bg-[#F5EFEB] text-[#34281D]';
      case 'basil': return 'theme-basil bg-[#EBF3ED] text-[#113422]';
      case 'night': return 'theme-night bg-[#0C1511] text-[#E2ECE5]';
      default: return 'theme-basil bg-[#EBF3ED] text-[#113422]';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'mushaf':
        return <QuranReader onNavigateToMutashabihat={() => setActiveTab('mutashabihat')} />;
      case 'mutashabihat':
        return <MutashabihatExplorer />;
      case 'partner':
        return <PartnerMatching />;
      case 'academy':
        return <AcademyTajweedAI />;
      case 'leitner':
        return <LeitnerAndTests onNavigateToAnalytics={() => setActiveTab('analytics')} />;
      case 'analytics':
        return (
          <RetentionAnalytics
            onNavigateToLeitner={() => setActiveTab('leitner')}
            onNavigateToMushaf={() => setActiveTab('mushaf')}
          />
        );
      case 'circles':
        return <LiveCircles />;
      case 'architecture':
        return <ArchitectureViewer />;
      default:
        return <QuranReader onNavigateToMutashabihat={() => setActiveTab('mutashabihat')} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 arabesque-pattern ${getThemeClass(theme)} flex flex-col`}>
      
      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentTheme={theme}
        onThemeChange={setTheme}
        isMobileSimulator={isMobileSimulator}
        onToggleSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* If Mobile Simulator is toggled, wrap in device frame */}
        {isMobileSimulator ? (
          <div className="py-4 flex flex-col items-center justify-center">
            <div className="mb-3 flex items-center gap-2 text-xs text-[#52665A] dark:text-[#8EAA97]">
              <Smartphone className="w-4 h-4 text-[#2D6A4F]" />
              <span>پیش‌نمایش شبیه‌ساز موبایل (Mobile Viewport 390px - Touch Ergonomics)</span>
              <button
                onClick={() => setIsMobileSimulator(false)}
                className="text-[#2D6A4F] font-bold underline mr-2"
              >
                بازگشت به دسکتاپ
              </button>
            </div>

            {/* Mobile Device Frame */}
            <div className="w-full max-w-[410px] h-[844px] rounded-[48px] bg-black p-3.5 shadow-2xl border-4 border-neutral-800 relative overflow-hidden flex flex-col">
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700 mr-2" />
                <span className="w-2 h-2 rounded-full bg-[#2D6A4F]/60" />
              </div>

              {/* Mobile Screen Surface */}
              <div className={`w-full h-full rounded-[38px] overflow-y-auto pt-8 pb-20 px-3 relative ${getThemeClass(theme)} scrollbar-none`}>
                {renderContent()}
              </div>

              {/* Mobile Fixed Bottom Tab Bar */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 h-16 bg-white/95 dark:bg-[#141F1A]/95 backdrop-blur-md rounded-b-[38px] border-t border-[#E1E8DF] dark:border-[#24382E] grid grid-cols-6 items-center px-1 z-40 text-center">
                {[
                  { id: 'mushaf', label: 'مصحف', icon: <BookOpen className="w-4 h-4 mx-auto" /> },
                  { id: 'mutashabihat', label: 'متشابهات', icon: <Sparkles className="w-4 h-4 mx-auto" /> },
                  { id: 'partner', label: 'همبحث', icon: <Users className="w-4 h-4 mx-auto" /> },
                  { id: 'analytics', label: 'نمودار', icon: <TrendingUp className="w-4 h-4 mx-auto" /> },
                  { id: 'academy', label: 'تجوید', icon: <Mic className="w-4 h-4 mx-auto" /> },
                  { id: 'leitner', label: 'لایتنر', icon: <Layers className="w-4 h-4 mx-auto" /> },
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`text-[9px] transition-colors py-1 ${
                        isActive
                          ? 'text-[#2D6A4F] dark:text-[#52B788] font-bold'
                          : 'text-[#52665A] dark:text-[#8EAA97]'
                      }`}
                    >
                      {item.icon}
                      <span className="block mt-0.5 truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>
        ) : (
          /* Regular full responsive 1440px desktop view */
          <div className="transition-opacity duration-150">
            {renderContent()}
          </div>
        )}

      </main>

      {/* Quiet, refined footer compliant with Section 1.B */}
      <footer className="w-full border-t border-[#E1E8DF] dark:border-[#24382E] py-6 text-xs text-[#52665A] dark:text-[#8EAA97] transition-colors mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1C2B22] dark:text-[#E2ECE5]">ریحان (Reyhan)</span>
            <span>·</span>
            <span>سامانه تخصصی و جامع حافظان قرآن کریم</span>
            <span>·</span>
            <span className="text-[#2D6A4F] dark:text-[#52B788]">طراحی شده با الهام از طراوت ریحان و آرامش معنوی</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab('analytics')}
              className="hover:text-[#2D6A4F] dark:hover:text-[#52B788] transition-colors flex items-center gap-1"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>تحلیل پیشرفت و نقاط ضعف</span>
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className="hover:text-[#2D6A4F] dark:hover:text-[#52B788] transition-colors flex items-center gap-1"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>مستندات معماری و دیتابیس</span>
            </button>
            <button
              onClick={() => setActiveTab('circles')}
              className="hover:text-[#2D6A4F] dark:hover:text-[#52B788] transition-colors flex items-center gap-1"
            >
              <Radio className="w-3.5 h-3.5 text-red-500" />
              <span>محافل زنده</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

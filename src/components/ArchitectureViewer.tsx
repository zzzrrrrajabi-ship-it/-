import React, { useState } from 'react';
import { Database, FolderTree, Cpu, Code2, Copy, Check, Server, Shield, FileText } from 'lucide-react';
import { ARCHITECTURE_DOCS } from '../data/architectureDocs';

export const ArchitectureViewer: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'stack' | 'folder' | 'schema' | 'code'>('stack');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Blueprint Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788] mb-1">
              <Cpu className="w-4 h-4" />
              <span>معماری کلان و مهندسی نرم‌افزار سوپراپلیکیشن ریحان</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              مستندات معماری، شماتیک دیتابیس و کدهای مرجع
            </h2>
            <p className="text-sm text-[#52665A] dark:text-[#8EAA97] mt-1 max-w-2xl leading-relaxed">
              طراحی تفصیلی سیستم چندسکویی بر پایه Clean Architecture، پشته فنی، شماتیک کامل رابطه‌ای PostgreSQL/Supabase و پیاده‌سازی الگوریتم‌های کلیدی.
            </p>
          </div>

          {/* Section Selector */}
          <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-xl self-start flex-wrap">
            <button
              onClick={() => setActiveSection('stack')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'stack'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              ۱. پشته فنی (Tech Stack)
            </button>
            <button
              onClick={() => setActiveSection('folder')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'folder'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              ۲. ساختار پوشه‌بندی
            </button>
            <button
              onClick={() => setActiveSection('schema')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'schema'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              ۳. شماتیک دیتابیس SQL
            </button>
            <button
              onClick={() => setActiveSection('code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'code'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              ۴. کدهای نمونه دو ماژول
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: TECH STACK */}
      {activeSection === 'stack' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ARCHITECTURE_DOCS.techStack.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#2D6A4F] dark:text-[#52B788]">
                    {item.layer}
                  </span>
                  <Server className="w-4 h-4 text-[#52665A] dark:text-[#8EAA97]" />
                </div>
                <h4 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
                  {item.technology}
                </h4>
                <p className="text-xs text-[#52665A] dark:text-[#8EAA97] leading-relaxed">
                  {item.rationale}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#EBF3ED] dark:bg-[#1B2923] border border-[#CBE0D1] dark:border-[#24382E] text-xs text-[#113422] dark:text-[#E2ECE5] leading-relaxed space-y-2">
            <span className="font-bold block">تحلیل انتخاب فلاتر (Flutter) در برابر ریاکت نیتیو (React Native):</span>
            <p>
              برای رسم اعراب پیچیده، خطوط قرآنی عثمان‌طه با علائم ترتیل دقیق و صفحات با صفحه‌بندی ۶۰۴ صفحه‌ای بدون شکست خط ناموزون، فلاتر با موتور گرافیکی اختصاصی <strong>Impeller</strong> بازدهی بالاتری در کشینگ گرافیکی گلیف‌ها (Glyph Cache) نسبت به Bridge یا Yoga در React Native نشان می‌دهد. با این وجود ساختار ماژولار طراحی‌شده قابلیت پورت مستقیم به هر دو فریم‌ورک را داراست.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 2: FOLDER STRUCTURE */}
      {activeSection === 'folder' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-[#2D6A4F] dark:text-[#52B788]" />
              <h3 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
                ساختار ماژولار مبتنی بر Clean Architecture (Feature-First)
              </h3>
            </div>
            <button
              onClick={() => handleCopy(ARCHITECTURE_DOCS.folderStructure, 'folder')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-xs text-[#52665A] dark:text-[#8EAA97] hover:text-black dark:hover:text-white"
            >
              {copiedKey === 'folder' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>کپی ساختار پوشه‌ها</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#0C1511] text-[#E2ECE5] font-mono text-xs overflow-x-auto leading-relaxed text-left dir-ltr">
            {ARCHITECTURE_DOCS.folderStructure}
          </pre>
        </div>
      )}

      {/* SECTION 3: DATABASE SCHEMA */}
      {activeSection === 'schema' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#2D6A4F] dark:text-[#52B788]" />
              <h3 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
                شماتیک پایگاه داده PostgreSQL (Supabase DDL + RLS Policies)
              </h3>
            </div>
            <button
              onClick={() => handleCopy(ARCHITECTURE_DOCS.databaseSchemaSql, 'schema')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-xs text-[#52665A] dark:text-[#8EAA97] hover:text-black dark:hover:text-white"
            >
              {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>کپی کدهای SQL</span>
            </button>
          </div>

          <p className="text-xs text-[#52665A] dark:text-[#8EAA97] leading-relaxed">
            شامل ۶ جدول کلیدی: پروفایل حافظان (Profiles)، آیات و بردار امبدینگ معنایی (Quran Ayahs + pgvector)، پیوندهای متشابهات (Mutashabihat Links)، کارت‌های لایتنر (Leitner Cards)، نشست‌های مچینگ WebRTC و قوانین امنیتی سطحی (Row Level Security).
          </p>

          <pre className="p-4 rounded-xl bg-[#0C1511] text-[#E2ECE5] font-mono text-xs overflow-x-auto leading-relaxed text-left dir-ltr">
            {ARCHITECTURE_DOCS.databaseSchemaSql}
          </pre>
        </div>
      )}

      {/* SECTION 4: PRODUCTION SAMPLE CODE */}
      {activeSection === 'code' && (
        <div className="space-y-6">
          {/* Module 1: Mutashabihat Token Diffing Code */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#2D6A4F] dark:text-[#52B788]" />
                <h3 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
                  کد ماژول ۱: موتور تفکیک و تطبیق آیات مشابه (Mutashabihat Engine)
                </h3>
              </div>
              <button
                onClick={() => handleCopy(ARCHITECTURE_DOCS.mutashabihatCodeSnippet, 'code1')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-xs text-[#52665A] dark:text-[#8EAA97] hover:text-black dark:hover:text-white"
              >
                {copiedKey === 'code1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی کد موتور متشابهات</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#0C1511] text-[#E2ECE5] font-mono text-xs overflow-x-auto leading-relaxed text-left dir-ltr">
              {ARCHITECTURE_DOCS.mutashabihatCodeSnippet}
            </pre>
          </div>

          {/* Module 2: Partner Matching Service */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#2D6A4F] dark:text-[#52B788]" />
                <h3 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
                  کد ماژول ۲: الگوریتم مچینگ همبحث آنلاین (Partner Matching Service)
                </h3>
              </div>
              <button
                onClick={() => handleCopy(ARCHITECTURE_DOCS.matchingEngineCodeSnippet, 'code2')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-xs text-[#52665A] dark:text-[#8EAA97] hover:text-black dark:hover:text-white"
              >
                {copiedKey === 'code2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی کد الگوریتم مچینگ</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#0C1511] text-[#E2ECE5] font-mono text-xs overflow-x-auto leading-relaxed text-left dir-ltr">
              {ARCHITECTURE_DOCS.matchingEngineCodeSnippet}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

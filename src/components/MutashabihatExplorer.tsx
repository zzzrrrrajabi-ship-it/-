import React, { useState } from 'react';
import { GitFork, BookMarked, Sparkles, Check, HelpCircle, ArrowRight, ShieldCheck, Eye, Layers } from 'lucide-react';
import { MUTASHABIHAT_GROUPS } from '../data/quranData';
import { MutashabihGroup } from '../types';

export const MutashabihatExplorer: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(MUTASHABIHAT_GROUPS[0].id);
  const [filterType, setFilterType] = useState<string>('all');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const selectedGroup = MUTASHABIHAT_GROUPS.find(g => g.id === selectedGroupId) || MUTASHABIHAT_GROUPS[0];

  const filteredGroups = filterType === 'all'
    ? MUTASHABIHAT_GROUPS
    : MUTASHABIHAT_GROUPS.filter(g => g.similarityType === filterType);

  const filterOptions = [
    { id: 'all', label: 'همه تشابهات' },
    { id: 'word_order', label: 'تقدم و تأخر کلمات' },
    { id: 'ending', label: 'فواصل و انتهای آیات' },
    { id: 'particles', label: 'ادوات و حروف جر' },
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>موتور هوشمند تشابهات قرآنی ریحان</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              شبکه تطبیقی آیات مشابه و متشابهات
            </h2>
            <p className="text-sm text-[#52665A] dark:text-[#8EAA97] mt-1 max-w-2xl leading-relaxed">
              تحلیل تفکیکی کلمه به کلمه با کدهای رنگی (Color Coding)، کدهای طلایی حافظه (ضوابط الفبایی و مفهومی) و تفکیک ترتیبی جهت جلوگیری از سردرگمی در آزمون‌ها و تثبیت ماندگار.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-xl self-start flex-wrap">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filterType === f.id
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Grid: Left Sidebar list + Right Visualizer & Diff Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: List of Mutashabihat cases */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-semibold text-[#52665A] dark:text-[#8EAA97] px-1 block">
            مجموعه موارد تشابه ({filteredGroups.length} مورد فعال):
          </span>
          {filteredGroups.map((group) => {
            const isSelected = group.id === selectedGroupId;
            return (
              <button
                key={group.id}
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setQuizAnswer(null);
                  setShowExplanation(false);
                }}
                className={`w-full text-right p-4 rounded-xl border transition-all duration-150 ${
                  isSelected
                    ? 'bg-white dark:bg-[#1B2923] border-[#2D6A4F] dark:border-[#52B788] shadow-sm ring-1 ring-[#2D6A4F]/20'
                    : 'bg-white/80 dark:bg-[#141F1A]/80 border-[#E1E8DF] dark:border-[#24382E] hover:border-[#2D6A4F]/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#2D6A4F] dark:text-[#52B788]">
                    سطح {group.treeLevel} · {group.verses.length} آیه
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[11px]">
                    {group.similarityType === 'word_order' ? 'تقدم و تأخر' : group.similarityType === 'ending' ? 'فواصل آیات' : 'ادوات'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#1C2B22] dark:text-[#E2ECE5] leading-snug">
                  {group.title}
                </h4>
                <div className="mt-2 flex items-center gap-2 text-xs text-[#52665A] dark:text-[#8EAA97]">
                  {group.verses.map((v, i) => (
                    <span key={i} className="bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded text-[11px]">
                      {v.surahName} ({v.ayahNumber})
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column: Deep-dive Visualizer & Color-Coded Comparison */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Card: Visual Comparison */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E1E8DF] dark:border-[#24382E] pb-4">
              <div>
                <span className="text-xs font-semibold text-[#C9A227] dark:text-[#E5C358] block mb-1">
                  مقایسه تطبیقی تفکیک‌شده
                </span>
                <h3 className="text-xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
                  {selectedGroup.title}
                </h3>
              </div>

              {/* Color Coding Legend */}
              <div className="flex items-center gap-3 text-xs flex-wrap self-start">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">کلمات متمایز سوره اول</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">جابجایی و تقدم/تأخر</span>
                </div>
              </div>
            </div>

            {/* Verses Parallel Inspection with Color Coded Tokens */}
            <div className="space-y-4">
              {selectedGroup.verses.map((verse, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511]/70 border border-[#E1E8DF] dark:border-[#24382E] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#2D6A4F] text-white text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
                        سوره {verse.surahName} · آیه {verse.ayahNumber} (جزء {verse.juz})
                      </span>
                    </div>
                    <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                      مصحف شریف
                    </span>
                  </div>

                  {/* Render tokens with visual color-coding */}
                  <div className="p-4 bg-white dark:bg-[#141F1A] rounded-xl border border-[#E1E8DF] dark:border-[#24382E] text-right">
                    <p className="font-quran text-2xl sm:text-3xl leading-[2.2] text-[#1C2B22] dark:text-[#E2ECE5]">
                      {verse.tokens.map((token, tIdx) => {
                        if (token.type === 'same') {
                          return <span key={tIdx}>{token.text}</span>;
                        }
                        if (token.highlightColor === 'emerald') {
                          return (
                            <span 
                              key={tIdx} 
                              className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800 mx-1 inline-block"
                              title="کلمه خاص این موضع"
                            >
                              {token.text}
                            </span>
                          );
                        }
                        return (
                          <span 
                            key={tIdx} 
                            className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800 mx-1 inline-block"
                            title="تقدم یا تغییر صیغه"
                          >
                            {token.text}
                          </span>
                        );
                      })}
                    </p>
                  </div>

                  {/* Diagnostic note */}
                  <div className="flex items-start gap-2 text-xs text-[#52665A] dark:text-[#8EAA97] pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788] shrink-0 mt-0.5" />
                    <span>{verse.distinctionNote}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Golden Mnemonic Rule (رمز و ضابطه حفظی طلایی) */}
            <div className="p-4 rounded-xl bg-[#EBF3ED] dark:bg-[#1B2923] border border-[#CBE0D1] dark:border-[#24382E] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F5F3E] dark:text-[#52B788]">
                <BookMarked className="w-4 h-4" />
                <span>کلید طلایی تثبیت در حافظه (Mnemonic Rule):</span>
              </div>
              <p className="text-sm font-semibold text-[#113422] dark:text-[#E2ECE5] leading-relaxed">
                {selectedGroup.keyMemoryAnchor}
              </p>
              <div className="p-2.5 bg-white/70 dark:bg-[#141F1A]/70 rounded-lg text-xs text-[#3D644E] dark:text-[#8EAA97] border border-[#CBE0D1] dark:border-[#24382E]">
                <span className="font-bold ml-1">قاعده منظوم / رمزی:</span>
                <span className="font-serif italic">{selectedGroup.mnemonicRuleFa}</span>
              </div>
            </div>

            {/* Quick Interactive Retention Drill (تست تثبیت آنی) */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2D6A4F] dark:text-[#52B788]">
                  <HelpCircle className="w-4 h-4" />
                  <span>آزمون سریع حافظه برای این تشابه:</span>
                </div>
                <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97]">
                  سنجش تسلط و عدم خطای جابجایی
                </span>
              </div>

              <p className="text-sm font-medium text-[#1C2B22] dark:text-[#E2ECE5]">
                در آیه ۴۸ سوره بقره، کدام ترکیب دقیقاً صحیح است؟
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { text: 'وَلَا يُقۡبَلُ مِنۡهَا شَفَٰعَةٞ وَلَا يُؤۡخَذُ مِنۡهَا عَدۡلٞ', isCorrect: true },
                  { text: 'وَلَا يُقۡبَلُ مِنۡهَا عَدۡلٞ وَلَا تَنفَعُهَا شَفَٰعَةٞ', isCorrect: false },
                ].map((opt, i) => {
                  const isChosen = quizAnswer === i;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setQuizAnswer(i);
                        setShowExplanation(true);
                      }}
                      className={`p-3 rounded-lg border text-right text-xs transition-all ${
                        isChosen
                          ? opt.isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                            : 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-900 dark:text-red-200'
                          : 'bg-[#F8F9F6] dark:bg-[#141F1A] border-[#E1E8DF] dark:border-[#24382E] text-[#1C2B22] dark:text-[#E2ECE5] hover:border-[#2D6A4F]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-quran text-sm">{opt.text}</span>
                        {isChosen && opt.isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="p-3 bg-[#F3F5F0] dark:bg-[#1B2923] rounded-lg text-xs text-[#2D6A4F] dark:text-[#52B788] leading-relaxed">
                  {quizAnswer === 0 ? (
                    <span className="font-bold">✓ آفرین! بر اساس ضابطه الفبایی ش-ع، شفاعت در آیه ۴۸ مقدم است.</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">✗ توجه کنید: این ترکیب مربوط به آیه ۱۲۳ بقره است که عدل بر شفاعت مقدم شده است.</span>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Visual Relational Tree Concept Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <GitFork className="w-5 h-5 text-[#2D6A4F] dark:text-[#52B788]" />
              <h4 className="font-bold text-sm text-[#1C2B22] dark:text-[#E2ECE5]">
                ساختار درختی شاخه‌های تشابه (Mutashabihat Graph Node)
              </h4>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] text-xs font-mono space-y-2">
              <div className="text-[#2D6A4F] dark:text-[#52B788] font-bold">
                [ریشه مشترک: وَاتَّقُوا يَوْماً لا تَجْزِي نَفْسٌ عَنْ نَفْسٍ شَيْئاً]
              </div>
              <div className="pr-4 border-r-2 border-[#2D6A4F]/30 space-y-2">
                <div className="text-neutral-700 dark:text-neutral-300">
                  ├── <strong>شاخه اول (بقره ۴۸):</strong> وَلَا يُقْبَلُ مِنْهَا شَفَاعَةٌ ➔ وَلَا يُؤْخَذُ مِنْهَا عَدْلٌ
                </div>
                <div className="text-neutral-700 dark:text-neutral-300">
                  └── <strong>شاخه دوم (بقره ۱۲۳):</strong> وَلَا يُقْبَلُ مِنْهَا عَدْلٌ ➔ وَلَا تَنفَعُهَا شَفَاعَةٌ
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

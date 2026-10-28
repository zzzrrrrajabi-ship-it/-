import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Bookmark, Info, Sparkles, ChevronLeft, ChevronRight, Sliders, CheckCircle2 } from 'lucide-react';
import { SAMPLE_AYAHS, QURAN_SURAHS } from '../data/quranData';
import { Ayah } from '../types';

interface QuranReaderProps {
  onNavigateToMutashabihat: (groupOrAyahId?: string) => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({ onNavigateToMutashabihat }) => {
  const [selectedSurah, setSelectedSurah] = useState(2);
  const [activeAyahIndex, setActiveAyahIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loopCount, setLoopCount] = useState<number>(3);
  const [currentLoop, setCurrentLoop] = useState<number>(1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [reciter, setReciter] = useState<'parhizgar' | 'minshawi' | 'alafasy'>('parhizgar');
  const [showTafsir, setShowTafsir] = useState(false);
  const [selectedAyahForTafsir, setSelectedAyahForTafsir] = useState<Ayah | null>(SAMPLE_AYAHS[1]);
  const [memorizedAyahs, setMemorizedAyahs] = useState<number[]>([1, 2]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentAyah = SAMPLE_AYAHS[activeAyahIndex] || SAMPLE_AYAHS[0];

  const reciters = [
    { id: 'parhizgar', name: 'استاد شهریار پرهیزگار (تحدیر/حفظ)', speedDesc: 'سرعت ویژه تثبیت' },
    { id: 'minshawi', name: 'استاد محمد صدیق منشاوی', speedDesc: 'ترتیل آموزشی و تجویدی' },
    { id: 'alafasy', name: 'استاد مشاری راشد العفاسی', speedDesc: 'صوت روان و شفاف' },
  ];

  const toggleMemorized = (ayahNum: number) => {
    setMemorizedAyahs(prev => 
      prev.includes(ayahNum) ? prev.filter(n => n !== ayahNum) : [...prev, ayahNum]
    );
  };

  const handleNextAyah = () => {
    if (activeAyahIndex < SAMPLE_AYAHS.length - 1) {
      setActiveAyahIndex(prev => prev + 1);
      setCurrentLoop(1);
    }
  };

  const handlePrevAyah = () => {
    if (activeAyahIndex > 0) {
      setActiveAyahIndex(prev => prev - 1);
      setCurrentLoop(1);
    }
  };

  // Simulate smart audio playback loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentLoop < loopCount) {
          setCurrentLoop(prev => prev + 1);
        } else {
          // Move to next ayah in loop sequence
          if (activeAyahIndex < SAMPLE_AYAHS.length - 1) {
            setActiveAyahIndex(prev => prev + 1);
            setCurrentLoop(1);
          } else {
            setIsPlaying(false);
            setCurrentLoop(1);
          }
        }
      }, 3500 / playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentLoop, loopCount, activeAyahIndex, playbackSpeed]);

  return (
    <div className="space-y-6">
      {/* Top Banner / Surah Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#52665A] dark:text-[#8EAA97]">
              <span>جزء اول</span>
              <span>·</span>
              <span>حزب ۱</span>
              <span>·</span>
              <span>صفحه ۲</span>
              <span>·</span>
              <span className="text-[#2D6A4F] dark:text-[#52B788] font-bold">مدنی (۲۸۶ آیه)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-quran text-[#1C2B22] dark:text-[#E2ECE5] mt-1">
              سُورَةُ البَقَرَةِ
            </h1>
          </div>

          {/* Quick Surah Picker */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">انتخاب سوره:</span>
            <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl">
              {QURAN_SURAHS.slice(0, 4).map((s) => (
                <button
                  key={s.number}
                  onClick={() => setSelectedSurah(s.number)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    selectedSurah === s.number
                      ? 'bg-[#2D6A4F] text-white font-medium shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bismillah Banner */}
        <div className="my-6 text-center py-4 bg-[#F8F9F6] dark:bg-[#0C1511]/50 rounded-xl border border-[#E1E8DF] dark:border-[#24382E]">
          <p className="font-quran text-2xl sm:text-3xl text-[#1B4332] dark:text-[#95D5B2] tracking-wide select-none">
            بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>

        {/* Smart Loop Memorization Bar (نوار تکرار هوشمند حفظ) */}
        <div className="p-4 rounded-xl bg-[#F3F5F0] dark:bg-[#1B2923] border border-[#E1E8DF] dark:border-[#24382E]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Play controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shadow-md hover:bg-[#1B4332] transition-transform active:scale-95 shrink-0"
                title={isPlaying ? 'توقف' : 'شروع تلاوت و تکرار حفظ'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevAyah}
                  disabled={activeAyahIndex === 0}
                  className="p-2 rounded-lg bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] text-neutral-600 dark:text-neutral-300 disabled:opacity-40"
                  title="آیه قبلی"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextAyah}
                  disabled={activeAyahIndex === SAMPLE_AYAHS.length - 1}
                  className="p-2 rounded-lg bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] text-neutral-600 dark:text-neutral-300 disabled:opacity-40"
                  title="آیه بعدی"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setCurrentLoop(1); setIsPlaying(true); }}
                  className="p-2 rounded-lg bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] text-neutral-600 dark:text-neutral-300 hover:text-[#2D6A4F]"
                  title="شروع مجدد تکرار این آیه"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Loop counter pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] text-xs">
                <span className="text-[#52665A] dark:text-[#8EAA97]">دور تکرار:</span>
                <span className="font-bold text-[#2D6A4F] dark:text-[#52B788] tabular-nums">
                  {currentLoop} از {loopCount}
                </span>
              </div>
            </div>

            {/* Repetition settings */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Loop counts */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-[#52665A] dark:text-[#8EAA97] ml-1">تعداد تکرار:</span>
                {[3, 5, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => { setLoopCount(num); setCurrentLoop(1); }}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      loopCount === num
                        ? 'bg-[#2D6A4F] text-white font-medium'
                        : 'bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {num} بار
                  </button>
                ))}
              </div>

              {/* Speed */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-[#52665A] dark:text-[#8EAA97] ml-1">سرعت:</span>
                {[0.75, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded-md transition-colors tabular-nums ${
                      playbackSpeed === spd
                        ? 'bg-[#2D6A4F] text-white font-medium'
                        : 'bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Reciter selector */}
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
                <select
                  value={reciter}
                  onChange={(e) => setReciter(e.target.value as any)}
                  className="bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] rounded-lg px-2.5 py-1 text-xs text-[#1C2B22] dark:text-[#E2ECE5] focus:outline-hidden"
                >
                  {reciters.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Verses Feed (صفحات و آیات مصحف) */}
      <div className="space-y-4">
        {SAMPLE_AYAHS.map((ayah, idx) => {
          const isActive = idx === activeAyahIndex;
          const isMemorized = memorizedAyahs.includes(ayah.numberInSurah);

          return (
            <div
              key={ayah.numberInSurah}
              className={`p-6 rounded-2xl border transition-all duration-200 relative ${
                isActive
                  ? 'bg-white dark:bg-[#141F1A] border-[#2D6A4F] dark:border-[#52B788] shadow-sm ring-1 ring-[#2D6A4F]/20'
                  : 'bg-white/70 dark:bg-[#141F1A]/70 border-[#E1E8DF] dark:border-[#24382E] hover:border-[#2D6A4F]/40'
              }`}
            >
              {/* Top row: Ayah metadata & action icons */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#2D6A4F]/10 dark:bg-[#52B788]/10 text-[#2D6A4F] dark:text-[#52B788] font-bold text-xs flex items-center justify-center font-mono">
                    {ayah.numberInSurah}
                  </span>
                  <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                    آیه {ayah.numberInSurah} · صفحه {ayah.page}
                  </span>
                  {ayah.hasMutashabih && (
                    <button
                      onClick={() => onNavigateToMutashabihat('mut-1')}
                      className="flex items-center gap-1 text-xs font-medium text-[#C9A227] dark:text-[#E5C358] hover:underline cursor-pointer"
                      title="این آیه دارای تشابه در سایر سوره‌هاست"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>دارای متشابهات</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedAyahForTafsir(ayah);
                      setShowTafsir(true);
                    }}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-[#2D6A4F] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    title="تفسیر مختصر نمونه و المیزان"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleMemorized(ayah.numberInSurah)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      isMemorized
                        ? 'bg-[#2D6A4F]/10 text-[#2D6A4F] dark:text-[#52B788]'
                        : 'text-neutral-500 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isMemorized ? 'fill-[#2D6A4F]/20' : ''}`} />
                    <span>{isMemorized ? 'تثبیت شد' : 'ثبت حفظ'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveAyahIndex(idx);
                      setCurrentLoop(1);
                      setIsPlaying(true);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive && isPlaying
                        ? 'bg-[#2D6A4F] text-white'
                        : 'text-neutral-500 hover:text-[#2D6A4F] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    title="پخش و تکرار این آیه"
                  >
                    {isActive && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Uthmani text with authentic calligraphy spacing */}
              <div className="text-right py-2">
                <p className="font-quran text-2xl sm:text-3xl lg:text-4xl leading-[2.4] text-[#1C2B22] dark:text-[#E2ECE5] select-text">
                  {ayah.textUthmani}
                </p>
              </div>

              {/* Persian translation */}
              <div className="mt-3 pt-3 border-t border-[#E1E8DF] dark:border-[#24382E]/60 text-right">
                <p className="text-sm sm:text-base text-[#52665A] dark:text-[#8EAA97] leading-relaxed">
                  {ayah.translationFa}
                </p>
              </div>

              {/* Quick Jump to Mutashabihat anchor if available */}
              {ayah.hasMutashabih && (
                <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/20 text-xs text-[#8A6A12] dark:text-[#E5C358]">
                  <span>نکته تشابه: وجوه تمایز این آیه با آیات مشابه سوره بقره، نمل و لقمان را بررسی کنید.</span>
                  <button
                    onClick={() => onNavigateToMutashabihat('mut-1')}
                    className="font-bold underline hover:text-black dark:hover:text-white shrink-0 mr-2"
                  >
                    مشاهده تحلیل تطبیقی
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tafsir Popover / Modal Drawer */}
      {showTafsir && selectedAyahForTafsir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 bg-white dark:bg-[#141F1A] rounded-2xl border border-[#E1E8DF] dark:border-[#24382E] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E1E8DF] dark:border-[#24382E] pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#2D6A4F] dark:text-[#52B788]" />
                <h3 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
                  تفسیر مختصر آیه {selectedAyahForTafsir.numberInSurah} {selectedAyahForTafsir.surahName}
                </h3>
              </div>
              <button
                onClick={() => setShowTafsir(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white text-sm px-2 py-1"
              >
                بستن
              </button>
            </div>

            <div className="p-3 bg-[#F8F9F6] dark:bg-[#0C1511] rounded-xl text-right">
              <p className="font-quran text-lg text-[#1C2B22] dark:text-[#E2ECE5]">
                {selectedAyahForTafsir.textUthmani}
              </p>
            </div>

            <div className="text-right space-y-2">
              <span className="text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788]">خلاصه تفسیر نمونه و المیزان:</span>
              <p className="text-sm leading-relaxed text-[#52665A] dark:text-[#8EAA97]">
                {selectedAyahForTafsir.tafsirBrief}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowTafsir(false)}
                className="px-4 py-2 bg-[#2D6A4F] text-white text-xs font-semibold rounded-lg hover:bg-[#1B4332]"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

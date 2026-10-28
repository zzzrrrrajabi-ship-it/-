import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Layers, CheckCircle2, RotateCcw, HelpCircle, Sparkles, Trophy, Flame, ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { SAMPLE_LEITNER_CARDS, SAMPLE_TEST_QUESTIONS } from '../data/quranData';
import { LeitnerCard } from '../types';

interface LeitnerAndTestsProps {
  onNavigateToAnalytics?: () => void;
}

export const LeitnerAndTests: React.FC<LeitnerAndTestsProps> = ({ onNavigateToAnalytics }) => {
  const [activeTab, setActiveTab] = useState<'leitner' | 'quiz' | 'bloom'>('leitner');

  // Leitner state
  const [cards, setCards] = useState<LeitnerCard[]>(SAMPLE_LEITNER_CARDS);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [selectedBoxFilter, setSelectedBoxFilter] = useState<number | 'all'>('all');

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Gamification plant stage (1 to 5)
  const [bloomGrowth, setBloomGrowth] = useState(78); // percentage 0-100%

  const currentCard = cards[activeCardIndex] || cards[0];
  const currentQuiz = SAMPLE_TEST_QUESTIONS[currentQuizIndex];

  const handleCardResult = (mastered: boolean) => {
    setCards(prev => prev.map((c, i) => {
      if (i === activeCardIndex) {
        const nextLevel = mastered ? Math.min(c.boxLevel + 1, 5) as any : 1;
        return {
          ...c,
          boxLevel: nextLevel,
          lastReviewedAt: 'همین الان'
        };
      }
      return c;
    }));

    if (mastered) {
      setBloomGrowth(prev => Math.min(prev + 5, 100));
    }

    setIsAnswerRevealed(false);
    if (activeCardIndex < cards.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    } else {
      setActiveCardIndex(0);
    }
  };

  const handleSelectQuizOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === currentQuiz.correctIndex) {
      setQuizScore(prev => prev + 1);
      setBloomGrowth(prev => Math.min(prev + 8, 100));
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    if (currentQuizIndex < SAMPLE_TEST_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setIsQuizCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Subtabs */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788] mb-1">
              <Layers className="w-4 h-4" />
              <span>جعبه لایتنر هوشمند و آزمون‌های تثبیت ریحان</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              سامانه مرور با فواصل زمانی (Spaced Repetition) و آزمون
            </h2>
            <p className="text-sm text-[#52665A] dark:text-[#8EAA97] mt-1 max-w-2xl leading-relaxed">
              تثبیت قطعی آیات متشابه و دشوار با الگوریتم مرور پلکانی لایتنر و شکوفایی بوته نمادین گل ریحان با ارزیابی مستمر روزانه.
            </p>
          </div>

          {/* Subtab Segmented Controls */}
          <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-xl self-start">
            <button
              onClick={() => setActiveTab('leitner')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'leitner'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              جعبه لایتنر ۵ خانه
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              آزمون‌های استاندارد
            </button>
            <button
              onClick={() => setActiveTab('bloom')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'bloom'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              بوته شکوفایی ریحان
            </button>
            {onNavigateToAnalytics && (
              <button
                onClick={onNavigateToAnalytics}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-[#2D6A4F] dark:text-[#52B788] hover:bg-[#2D6A4F]/10 transition-colors whitespace-nowrap flex items-center gap-1"
                title="مشاهده نمودار تثبیت و کانون‌های ضعف"
              >
                <span>نمودار تحلیلی تثبیت</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {activeTab === 'leitner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Leitner Boxes Status Bar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#1C2B22] dark:text-[#E2ECE5] block">
                خانه‌های ۵ گانه لایتنر قرآنی:
              </span>

              <div className="space-y-2">
                {[
                  { box: 1, label: 'خانه اول (مرور هر روز)', count: 8, interval: '۱ روز' },
                  { box: 2, label: 'خانه دوم (مرور ۳ روزه)', count: 12, interval: '۳ روز' },
                  { box: 3, label: 'خانه سوم (مرور هفتگی)', count: 15, interval: '۷ روز' },
                  { box: 4, label: 'خانه چهارم (مرور دو هفته)', count: 9, interval: '۱۴ روز' },
                  { box: 5, label: 'خانه پنجم (تثبیت ابدی)', count: 24, interval: '۳۰ روز' },
                ].map((b) => (
                  <div
                    key={b.box}
                    className="p-3 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#1C2B22] dark:text-[#E2ECE5] block">{b.label}</span>
                      <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97]">فاصله: {b.interval}</span>
                    </div>
                    <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-[#2D6A4F]/10 text-[#2D6A4F] dark:text-[#52B788]">
                      {b.count} کارت
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Active Card Deck Reviewer */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E1E8DF] dark:border-[#24382E] pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#2D6A4F]/10 text-[#2D6A4F] dark:text-[#52B788] text-xs font-bold font-mono">
                  کارت {activeCardIndex + 1} از {cards.length}
                </span>
                <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                  سوره {currentCard.surahName} · آیه {currentCard.ayahNumber}
                </span>
              </div>
              <span className="text-xs font-bold text-[#C9A227] dark:text-[#E5C358]">
                مستقر در خانه {currentCard.boxLevel}
              </span>
            </div>

            {/* Question side */}
            <div className="space-y-3 text-right">
              <span className="text-xs font-semibold text-[#52665A] dark:text-[#8EAA97]">
                پرسش حفظ و دقت متشابهات:
              </span>
              <h3 className="text-lg font-bold text-[#1C2B22] dark:text-[#E2ECE5] leading-relaxed">
                {currentCard.question}
              </h3>

              <div className="p-4 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E]">
                <p className="font-quran text-2xl text-[#1C2B22] dark:text-[#E2ECE5]">
                  {currentCard.textUthmani}
                </p>
              </div>
            </div>

            {/* Answer Reveal */}
            {!isAnswerRevealed ? (
              <button
                onClick={() => setIsAnswerRevealed(true)}
                className="w-full py-3 rounded-xl bg-[#F3F5F0] dark:bg-[#1B2923] border border-[#E1E8DF] dark:border-[#24382E] text-xs font-bold text-[#2D6A4F] dark:text-[#52B788] hover:bg-[#EBF3ED] transition-colors"
              >
                نمایش پاسخ، ضابطه حفظی و کلید حافظه
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-[#EBF3ED] dark:bg-[#1B2923] border border-[#CBE0D1] dark:border-[#24382E] text-right space-y-2">
                <span className="text-xs font-bold text-[#1F5F3E] dark:text-[#52B788]">
                  پاسخ و راهنمای تثبیت:
                </span>
                <p className="text-sm text-[#113422] dark:text-[#E2ECE5] leading-relaxed">
                  {currentCard.promptHint}
                </p>

                {/* Leitner Actions */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button
                    onClick={() => handleCardResult(false)}
                    className="py-2.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold hover:bg-red-200 transition-colors"
                  >
                    فراموش کردم (بازگشت به خانه ۱)
                  </button>
                  <button
                    onClick={() => handleCardResult(true)}
                    className="py-2.5 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332] transition-colors"
                  >
                    به یاد آوردم (ارتقا به خانه بعدی)
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-6">
          {!isQuizCompleted ? (
            <>
              <div className="flex items-center justify-between border-b border-[#E1E8DF] dark:border-[#24382E] pb-3">
                <span className="text-xs font-bold text-[#2D6A4F] dark:text-[#52B788]">
                  سؤال {currentQuizIndex + 1} از {SAMPLE_TEST_QUESTIONS.length}
                </span>
                <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                  سوره {currentQuiz.surahName}
                </span>
              </div>

              <div className="space-y-4 text-right">
                <h3 className="text-lg font-bold text-[#1C2B22] dark:text-[#E2ECE5] leading-relaxed">
                  {currentQuiz.prompt}
                </h3>

                <div className="space-y-2.5">
                  {currentQuiz.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuiz.correctIndex;
                    let style = 'bg-[#F8F9F6] dark:bg-[#0C1511] border-[#E1E8DF] dark:border-[#24382E] text-[#1C2B22] dark:text-[#E2ECE5]';

                    if (selectedOption !== null) {
                      if (isCorrect) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isSelected) {
                        style = 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-900 dark:text-red-200';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectQuizOption(idx)}
                        className={`w-full text-right p-4 rounded-xl border text-sm transition-all ${style}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-quran text-lg">{option}</span>
                          {selectedOption !== null && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="p-4 rounded-xl bg-[#F3F5F0] dark:bg-[#1B2923] text-xs text-[#2D6A4F] dark:text-[#52B788] leading-relaxed space-y-2">
                    <span className="font-bold block">تحلیل و علت پاسخ:</span>
                    <p>{currentQuiz.explanation}</p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextQuizQuestion}
                        className="px-5 py-2 rounded-xl bg-[#2D6A4F] text-white font-bold text-xs"
                      >
                        سؤال بعدی
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <Trophy className="w-16 h-16 text-[#C9A227] mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
                آزمون با موفقیت به پایان رسید!
              </h3>
              <p className="text-sm text-[#52665A] dark:text-[#8EAA97]">
                امتیاز شما: {quizScore} از {SAMPLE_TEST_QUESTIONS.length}
              </p>
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-2.5 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332]"
              >
                شروع مجدد آزمون
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'bloom' && (
        /* Reyhan Blossom Plant (گیمیفیکیشن و شکوفایی گل ریحان) */
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-6 text-center">
          <div>
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>پیشرفت بصری و پاداش حفظ (Gamified Reyhan Blossom)</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              باغچه معنوی و بوته شکوفای ریحان شما
            </h3>
            <p className="text-sm text-[#52665A] dark:text-[#8EAA97] max-w-lg mx-auto mt-1">
              هر آیه تثبیت شده در لایتنر یا جلسه مباحثه، موجب جوانه زدن برگ‌های معطر و رویش گل‌های سفید ریحان می‌شود.
            </p>
          </div>

          {/* Interactive Basil Plant Vector Visualizer */}
          <div className="p-8 rounded-2xl bg-[#EBF3ED] dark:bg-[#0C1511] border border-[#CBE0D1] dark:border-[#24382E] max-w-md mx-auto relative overflow-hidden">
            <svg viewBox="0 0 200 220" className="w-48 h-48 mx-auto drop-shadow-md">
              {/* Plant Pot */}
              <polygon points="65,190 135,190 125,215 75,215" fill="#B38622" />
              <rect x="60" y="180" width="80" height="10" rx="3" fill="#C9A227" />

              {/* Plant Stem */}
              <path d="M100,180 Q98,120 100,60" stroke="#2D6A4F" strokeWidth="6" strokeLinecap="round" fill="none" />
              
              {/* Basil Leaves (dynamic opacity & size based on bloomGrowth) */}
              <path d="M100,140 Q60,130 65,110 Q85,120 100,135" fill="#40916C" stroke="#1B4332" strokeWidth="1" />
              <path d="M100,135 Q140,125 135,105 Q115,115 100,130" fill="#52B788" stroke="#1B4332" strokeWidth="1" />

              {/* Upper Basil Leaves */}
              <path d="M100,100 Q55,90 60,70 Q80,80 100,95" fill="#40916C" stroke="#1B4332" strokeWidth="1" />
              <path d="M100,95 Q145,85 140,65 Q120,75 100,90" fill="#52B788" stroke="#1B4332" strokeWidth="1" />

              {/* White Basil Flower Blossoms (Bloom stage) */}
              {bloomGrowth >= 50 && (
                <>
                  <circle cx="100" cy="55" r="7" fill="#FFFFFF" stroke="#E5C358" strokeWidth="1.5" />
                  <circle cx="94" cy="48" r="5" fill="#FFFFFF" stroke="#E5C358" strokeWidth="1.5" />
                  <circle cx="106" cy="48" r="5" fill="#FFFFFF" stroke="#E5C358" strokeWidth="1.5" />
                  <circle cx="100" cy="42" r="5" fill="#FFFFFF" stroke="#E5C358" strokeWidth="1.5" />
                  <circle cx="100" cy="55" r="2.5" fill="#E5C358" />
                </>
              )}
            </svg>

            <div className="mt-4">
              <span className="text-xs font-bold text-[#113422] dark:text-[#E2ECE5] block">
                میزان شکوفایی بوته ریحان: {bloomGrowth}%
              </span>
              <div className="w-full bg-black/10 dark:bg-white/10 h-2.5 rounded-full overflow-hidden mt-1.5">
                <div 
                  className="bg-[#2D6A4F] dark:bg-[#52B788] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${bloomGrowth}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto text-center">
            <div className="p-3 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E]">
              <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">توالی روزانه (Streak)</span>
              <div className="flex items-center justify-center gap-1 font-bold font-mono text-[#C9A227] text-base">
                <Flame className="w-4 h-4 fill-amber-500" />
                <span>۱۴ روز</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E]">
              <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">کارت‌های مستقر در لایتنر</span>
              <span className="font-bold font-mono text-[#2D6A4F] dark:text-[#52B788] text-base">۶۸ کارت</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E]">
              <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">شاخص تثبیت نهایی</span>
              <span className="font-bold font-mono text-[#2D6A4F] dark:text-[#52B788] text-base">۹۴٪</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E]">
              <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">رتبه در لیگ حافظان</span>
              <span className="font-bold font-mono text-[#2D6A4F] dark:text-[#52B788] text-base">۲۴ کشوری</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles, CheckCircle2, AlertTriangle, Play, RefreshCw, Volume2, BookOpen, Music, Award } from 'lucide-react';

export const AcademyTajweedAI: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    overallScore: number;
    makharijScore: number;
    tajweedScore: number;
    melodyScore: number;
    feedbackItems: { type: 'success' | 'warning' | 'info'; title: string; desc: string }[];
  } | null>({
    overallScore: 94,
    makharijScore: 92,
    tajweedScore: 96,
    melodyScore: 90,
    feedbackItems: [
      {
        type: 'success',
        title: 'رعایت عالی مد متصل',
        desc: 'میزان کشش الف مدی به درستی ۴ حرکت رعایت گردید و از حد مجاز تجاوز نکرد.'
      },
      {
        type: 'warning',
        title: 'مخرج حرف «ط» در مستعلیه',
        desc: 'نیاز به تفخیم و پرحجم ادا کردن بیشتری دارد؛ زبان باید به کام بالا نزدیک‌تر شود.'
      },
      {
        type: 'success',
        title: 'صحت ادغام نون ساکنه در واو',
        desc: 'همراه با غنه کامل ۲ حرکتی تلاوت شد.'
      }
    ]
  });

  const [activeCourseTab, setActiveCourseTab] = useState<'ai_eval' | 'courses'>('ai_eval');

  const courses = [
    {
      id: 'c1',
      title: 'دوره تکنیک‌های طلایی حفظ تصویری و ماندگار',
      instructor: 'استاد دباغ (استاد حفظ قرآن)',
      lessons: 14,
      level: 'مقدماتی تا پیشرفته',
      duration: '۶ ساعت'
    },
    {
      id: 'c2',
      title: 'کارگاه تخصصی مخارج حروف و صفات تجوید',
      instructor: 'دکتر ستوده‌نیا',
      lessons: 18,
      level: 'تخصصی',
      duration: '۸ ساعت'
    },
    {
      id: 'c3',
      title: 'صوت و لحن کاربردی برای حافظان (مقامات بیات، رست و صبا)',
      instructor: 'استاد قاسم رضیعی',
      lessons: 12,
      level: 'متوسط',
      duration: '۵ ساعت'
    }
  ];

  // Recording counter
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      setAnalysisResult(null);
    } else {
      setIsRecording(false);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult({
          overallScore: 95,
          makharijScore: 94,
          tajweedScore: 97,
          melodyScore: 92,
          feedbackItems: [
            {
              type: 'success',
              title: 'اجرای دقیق قلقله در حرف «د»',
              desc: 'حالت سکون با تحرک زیبا و بدون کشیدگی به حرکات فتحه ادا شد.'
            },
            {
              type: 'warning',
              title: 'کشش غنه در اخفاء',
              desc: 'مراقب باشید صدای غنه از بینی خارج شده و با خیشوم ادا شود (تقریباً ۱.۵ حرکت بود).'
            },
            {
              type: 'success',
              title: 'وقف و ابتدا در محل مجاز',
              desc: 'تنفس در کلمه مناسب انجام شد و معنا مخدوش نگردید.'
            }
          ]
        });
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Academy Banner with generated visual */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788]">
              <Sparkles className="w-4 h-4" />
              <span>هوش مصنوعی آکوستیک ریحان (AI Speech & Tajweed Engine)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              آکادمی تجوید، مخرج حروف و تحلیل صوت
            </h2>
            <p className="text-sm text-[#52665A] dark:text-[#8EAA97] leading-relaxed max-w-xl">
              سنجش بلادرنگ مخرج حروف، کشش مد و غنه، و رفع اشکالات تلاوت با هوش مصنوعی آکوستیک قرآنی و دوره‌های گام‌به‌گام اساتید ممتاز جهان اسلام.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setActiveCourseTab('ai_eval')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCourseTab === 'ai_eval'
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                آزمایشگاه سنجش صوت و تجوید
              </button>
              <button
                onClick={() => setActiveCourseTab('courses')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCourseTab === 'courses'
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                دوره‌ها و کارگاه‌های مهارتی ({courses.length})
              </button>
            </div>
          </div>

          <div className="md:col-span-4 hidden md:block">
            <img
              src="/src/assets/images/reyhan_voice_tajweed_1793157930016.jpg"
              alt="Acoustic Voice Tajweed"
              className="w-full h-40 object-cover rounded-xl shadow-xs border border-[#2D6A4F]/20"
            />
          </div>
        </div>
      </div>

      {activeCourseTab === 'ai_eval' ? (
        /* AI Acoustic Evaluator Module */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Recorder & Waveform Card */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#C9A227] dark:text-[#E5C358] block mb-1">
                آیه مورد سنجش:
              </span>
              <div className="p-4 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] text-right">
                <p className="font-quran text-2xl leading-relaxed text-[#1C2B22] dark:text-[#E2ECE5]">
                  ٱلَّذِينَ ءَاتَيۡنَٰهُمُ ٱلۡكِتَٰبَ يَتۡلُونَهُۥ حَقَّ تِلَاوَتِهِۦٓ أُوْلَـٰٓئِكَ يُؤۡمِنُونَ بِهِۦۗ
                </p>
                <span className="text-xs text-[#52665A] dark:text-[#8EAA97] block mt-1">
                  سوره بقره · آیه ۱۲۱
                </span>
              </div>
            </div>

            {/* Simulated Live Audio Waveform */}
            <div className="p-6 rounded-xl bg-[#F3F5F0] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-1.5 h-14">
                {Array.from({ length: 28 }).map((_, i) => {
                  const barHeight = isRecording
                    ? Math.max(12, Math.sin(i * 0.5 + recordingSeconds * 4) * 40 + 20)
                    : 8;
                  return (
                    <span
                      key={i}
                      style={{ height: `${barHeight}px` }}
                      className={`w-1 rounded-full transition-all duration-75 ${
                        isRecording ? 'bg-[#2D6A4F] dark:bg-[#52B788]' : 'bg-neutral-300 dark:bg-neutral-700'
                      }`}
                    />
                  );
                })}
              </div>

              {isRecording ? (
                <div className="text-xs font-mono font-bold text-red-600 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span>در حال ضبط تلاوت: ۰۰:{recordingSeconds.toString().padStart(2, '0')}</span>
                </div>
              ) : (
                <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                  برای شروع سنجش، دکمه میکروفون را لمس کنید و آیه فوق را تلاوت نمایید.
                </span>
              )}

              {/* Big Record Button */}
              <button
                onClick={handleToggleRecord}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-[#2D6A4F] text-white hover:bg-[#1B4332]'
                }`}
              >
                {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>
            </div>

            {isAnalyzing && (
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center gap-3 text-xs text-blue-800 dark:text-blue-300">
                <RefreshCw className="w-5 h-5 animate-spin shrink-0" />
                <span>الگوریتم هوش مصنوعی در حال پردازش فرکانس صوتی، مخرج حروف و مقایسه با استاندارد ترتیل است...</span>
              </div>
            )}
          </div>

          {/* AI Scorecard & Diagnostic Feedback */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#E1E8DF] dark:border-[#24382E] pb-3">
              <h3 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C9A227]" />
                <span>کارنامه تحلیلی هوش مصنوعی</span>
              </h3>
              {analysisResult && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] dark:text-[#52B788] font-bold">
                  سطح عالی (ممتاز)
                </span>
              )}
            </div>

            {analysisResult && (
              <>
                {/* 3 Metric Progress Strips */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E]">
                    <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">نمره تجوید</span>
                    <span className="text-xl font-bold font-mono text-[#2D6A4F] dark:text-[#52B788]">
                      {analysisResult.tajweedScore}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E]">
                    <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">مخارج حروف</span>
                    <span className="text-xl font-bold font-mono text-[#2D6A4F] dark:text-[#52B788]">
                      {analysisResult.makharijScore}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E]">
                    <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">لحن و ضرب‌آهنگ</span>
                    <span className="text-xl font-bold font-mono text-[#2D6A4F] dark:text-[#52B788]">
                      {analysisResult.melodyScore}%
                    </span>
                  </div>
                </div>

                {/* Detailed Feedback points */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-[#52665A] dark:text-[#8EAA97] block">
                    نکات اصلاحی و بازخورد هوشمند:
                  </span>
                  {analysisResult.feedbackItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-right space-y-1 ${
                        item.type === 'success'
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50'
                          : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                        <h5 className="font-bold text-xs text-[#1C2B22] dark:text-[#E2ECE5]">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs text-[#52665A] dark:text-[#8EAA97] pr-6 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      ) : (
        /* Academy Masterclasses Feed */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4 hover:border-[#2D6A4F]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#2D6A4F] dark:text-[#52B788]">
                  {c.level} · {c.duration}
                </span>
                <h4 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
                  {c.title}
                </h4>
                <p className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                  مدرس: {c.instructor}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E1E8DF] dark:border-[#24382E] flex items-center justify-between text-xs">
                <span className="text-[#52665A] dark:text-[#8EAA97]">{c.lessons} جلسه آموزشی</span>
                <button className="px-3 py-1.5 rounded-lg bg-[#2D6A4F] text-white font-bold hover:bg-[#1B4332] transition-colors">
                  مشاهده جلسات
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

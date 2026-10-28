import React, { useState, useEffect } from 'react';
import { Radio, Users, Heart, Mic, Award, Zap, ChevronLeft, Volume2, Trophy } from 'lucide-react';

export const LiveCircles: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'circles' | 'arena'>('circles');

  // Live circle state
  const [inCircle, setInCircle] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [blessingCount, setBlessingCount] = useState(142);
  const [reactionBubble, setReactionBubble] = useState<string | null>(null);

  // Speed tournament state
  const [challengeTimer, setChallengeTimer] = useState(10);
  const [challengeScore, setChallengeScore] = useState(380);

  const activeReciter = {
    name: 'استاد احمد ابوالقاسمی',
    surah: 'سوره مبارکه کهف (آیات ۱۰ الی ۱۶)',
    listenersCount: 84,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  };

  const handleSendBlessing = (type: string) => {
    setBlessingCount(prev => prev + 1);
    setReactionBubble(type);
    setTimeout(() => setReactionBubble(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788] mb-1">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <span>محافل زنده صوتی و لیگ حفظ قرآن ریحان</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              محافل برخط تلاوت و مسابقات گیمیفیکیشن
            </h2>
            <p className="text-sm text-[#52665A] dark:text-[#8EAA97] mt-1 max-w-2xl leading-relaxed">
              حضور در حلقه‌های همگانی استماع و تصحیح تلاوت، ارسال بازخوردهای معنوی، و شرکت در چالش‌های سرعت تکمیل آیه در لیگ هفتگی حافظان.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-xl self-start">
            <button
              onClick={() => setActiveTab('circles')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'circles'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              حلقه و محفل تلاوت زنده
            </button>
            <button
              onClick={() => setActiveTab('arena')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'arena'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              لیگ سرعت و مسابقات حفظ
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'circles' ? (
        /* LIVE AUDIO HALAQAH CIRCLE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Stage: Active Reciter & Audience */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#E1E8DF] dark:border-[#24382E] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-red-600 dark:text-red-400">پخش زنده صوتی</span>
                <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">· {activeReciter.listenersCount} مستمع حاضر</span>
              </div>
              <span className="text-xs text-[#52665A] dark:text-[#8EAA97] font-medium">
                محفل شبانگاهی جزء ۱۵
              </span>
            </div>

            {/* Reciter Podium */}
            <div className="p-8 rounded-2xl bg-[#EBF3ED] dark:bg-[#0C1511] border border-[#CBE0D1] dark:border-[#24382E] text-center space-y-4 relative overflow-hidden">
              {reactionBubble && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#C9A227] text-white font-bold text-xs shadow-lg animate-bounce">
                  {reactionBubble}
                </div>
              )}

              <div className="relative inline-block">
                <img
                  src={activeReciter.avatar}
                  alt={activeReciter.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#2D6A4F] mx-auto shadow-md"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#2D6A4F] text-white text-[11px] font-bold whitespace-nowrap shadow-xs">
                  قاری در حال تلاوت
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#113422] dark:text-[#E2ECE5]">
                  {activeReciter.name}
                </h3>
                <p className="text-xs text-[#3D644E] dark:text-[#8EAA97] mt-1">
                  موضوع تلاوت: {activeReciter.surah}
                </p>
              </div>

              {/* Live sound waveform animation */}
              <div className="flex items-center justify-center gap-1.5 h-10 py-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    style={{ height: `${Math.max(8, (i % 5 + 1) * 6)}px` }}
                    className="w-1 rounded-full bg-[#2D6A4F] dark:bg-[#52B788] animate-pulse"
                  />
                ))}
              </div>

              {/* Realtime Spiritual Reactions Bar */}
              <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
                <button
                  onClick={() => handleSendBlessing('احسنت و بارک‌الله')}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#141F1A] border border-[#CBE0D1] dark:border-[#24382E] text-xs font-semibold text-[#1F5F3E] dark:text-[#E2ECE5] hover:bg-[#DEEDE2] transition-colors"
                >
                  احسنت ✨
                </button>
                <button
                  onClick={() => handleSendBlessing('اللهم صل علی محمد و آل محمد')}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#141F1A] border border-[#CBE0D1] dark:border-[#24382E] text-xs font-semibold text-[#1F5F3E] dark:text-[#E2ECE5] hover:bg-[#DEEDE2] transition-colors"
                >
                  صلوات 💚
                </button>
                <button
                  onClick={() => handleSendBlessing('الله‌اکبر')}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#141F1A] border border-[#CBE0D1] dark:border-[#24382E] text-xs font-semibold text-[#1F5F3E] dark:text-[#E2ECE5] hover:bg-[#DEEDE2] transition-colors"
                >
                  تکبیر 🌿
                </button>
              </div>
            </div>

            {/* Audience Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setHandRaised(!handRaised)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  handRaised
                    ? 'bg-[#C9A227] text-white shadow-xs'
                    : 'bg-[#2D6A4F] text-white hover:bg-[#1B4332]'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>{handRaised ? 'دست شما بالاست (در صف تلاوت نفر ۳)' : 'درخواست نوبت تلاوت در محفل'}</span>
              </button>

              <div className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                مجموع بازخوردهای معنوی ثبت‌شده: <strong className="font-mono text-[#2D6A4F]">{blessingCount}</strong>
              </div>
            </div>

          </div>

          {/* Right Sidebar: Active Listeners & Queue */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
            <span className="text-xs font-bold text-[#1C2B22] dark:text-[#E2ECE5] block">
              صف قاریان بعدی محفل:
            </span>

            <div className="space-y-2.5">
              {[
                { name: 'محمدعلی نوری', title: 'حافظ کل از شیراز', queue: 1 },
                { name: 'صادق مرادی', title: 'حافظ ۲۰ جزء از تهران', queue: 2 },
                { name: 'شما (نوبت در صف)', title: 'حافظ ۱۵ جزء', queue: 3, isUser: true },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    p.isUser
                      ? 'bg-[#EBF3ED] dark:bg-[#1B2923] border-[#2D6A4F] font-bold text-[#113422] dark:text-[#E2ECE5]'
                      : 'bg-[#F8F9F6] dark:bg-[#0C1511] border-[#E1E8DF] dark:border-[#24382E] text-[#52665A] dark:text-[#8EAA97]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 text-center leading-5 font-mono text-[10px]">
                      {p.queue}
                    </span>
                    <div>
                      <span className="block font-bold text-[#1C2B22] dark:text-[#E2ECE5]">{p.name}</span>
                      <span className="text-[10px]">{p.title}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#2D6A4F] dark:text-[#52B788]">
                    {p.queue === 1 ? 'نوبت بعد' : `نفر ${p.queue}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* SPEED TOURNAMENT ARENA */
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-2">
            <Trophy className="w-12 h-12 text-[#C9A227] mx-auto" />
            <h3 className="text-2xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              تورنمنت سرعت و حضور ذهن حافظان (Blitz Quran Hifz)
            </h3>
            <p className="text-xs text-[#52665A] dark:text-[#8EAA97]">
              سنجش فوق سریع اتصال آیات، تشخیص سرآیات در کمتر از ۱۰ ثانیه و رقابت با برترین حافظان سراسر کشور.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] max-w-lg mx-auto space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-red-600">زمان باقی‌مانده: ۰۸ ثانیه</span>
              <span className="font-mono font-bold text-[#2D6A4F]">امتیاز جاری: {challengeScore}</span>
            </div>

            <div className="p-4 bg-white dark:bg-[#141F1A] rounded-xl border border-[#E1E8DF] dark:border-[#24382E] text-right">
              <span className="text-xs text-[#C9A227] block mb-1">سرآیه را بلافاصله تکمیل کنید:</span>
              <p className="font-quran text-2xl text-[#1C2B22] dark:text-[#E2ECE5]">
                يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ كُتِبَ عَلَيۡكُمُ ٱلصِّيَامُ كَمَا ...
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button className="p-3 rounded-lg bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] hover:border-[#2D6A4F] text-right font-quran text-base">
                كُتِبَ عَلَى ٱلَّذِينَ مِن قَبۡلِكُمۡ لَعَلَّكُمۡ تَتَّقُونَ
              </button>
              <button className="p-3 rounded-lg bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] hover:border-[#2D6A4F] text-right font-quran text-base">
                كُتِبَ عَلَى ٱلَّذِينَ مِن قَبۡلِكُمۡ لَعَلَّكُمۡ تَشۡكُرُونَ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

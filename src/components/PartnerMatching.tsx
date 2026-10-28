import React, { useState, useEffect } from 'react';
import { Users, Search, Mic, MicOff, Video, VideoOff, PhoneOff, Award, Clock, AlertCircle, CheckCircle, Volume2, Shield } from 'lucide-react';
import { MEMORIZER_CANDIDATES, SAMPLE_AYAHS } from '../data/quranData';
import { MemorizerProfile } from '../types';

export const PartnerMatching: React.FC = () => {
  const [targetJuz, setTargetJuz] = useState<number>(1);
  const [selectedGender, setSelectedGender] = useState<'brother' | 'sister'>('brother');
  const [timeSlot, setTimeSlot] = useState<string>('شبانه (۲۰:۰۰ الی ۲۲:۰۰)');
  const [recitationSpeed, setRecitationSpeed] = useState<'tahqiq' | 'tadwir' | 'hadr'>('tadwir');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [matchedCandidate, setMatchedCandidate] = useState<MemorizerProfile | null>(null);
  const [isInRoom, setIsInRoom] = useState<boolean>(false);

  // In-room state
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [turn, setTurn] = useState<'me' | 'partner'>('partner');
  const [tapoqCount, setTapoqCount] = useState(0); // تپق
  const [aerabCount, setAerabCount] = useState(0); // اشکال اعراب
  const [jumpCount, setJumpCount] = useState(0); // پرش آیه
  const [roomTimeRemaining, setRoomTimeRemaining] = useState(45 * 60); // 45 minutes
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const candidates = MEMORIZER_CANDIDATES.filter(c => c.gender === selectedGender);

  const handleStartSearch = () => {
    setIsSearching(true);
    setMatchedCandidate(null);
    setTimeout(() => {
      setIsSearching(false);
      setMatchedCandidate(candidates[0] || MEMORIZER_CANDIDATES[0]);
    }, 1800);
  };

  const handleEnterRoom = (candidate: MemorizerProfile) => {
    setMatchedCandidate(candidate);
    setIsInRoom(true);
    setSessionCompleted(false);
    setTapoqCount(0);
    setAerabCount(0);
    setJumpCount(0);
    setRoomTimeRemaining(45 * 60);
  };

  const handleLeaveRoom = () => {
    setIsInRoom(false);
    setSessionCompleted(true);
  };

  // Timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInRoom && roomTimeRemaining > 0) {
      interval = setInterval(() => {
        setRoomTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInRoom, roomTimeRemaining]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788] mb-1">
              <Users className="w-4 h-4" />
              <span>سامانه مچینگ هوشمند همبحث (Quranic Memorization Partner)</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              یافتن همبحث آنلاین و اتاق مباحثه امن
            </h2>
            <p className="text-sm text-[#52665A] dark:text-[#8EAA97] mt-1 max-w-2xl leading-relaxed">
              اتصال هوشمند حافظان هم‌سطح بر اساس جزء هدف، زمان آزاد و سرعت تلاوت، همراه با اتاق صوتی/تصویری اختصاصی جهت پرسش و پاسخ، ثبت تپق و سنجش درصد تثبیت.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-[#52665A] dark:text-[#8EAA97] flex items-center gap-1.5 bg-[#F8F9F6] dark:bg-[#0C1511] px-3 py-2 rounded-xl border border-[#E1E8DF] dark:border-[#24382E]">
              <Shield className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
              <span>محیط امن و تفکیک‌شده</span>
            </div>
          </div>
        </div>
      </div>

      {!isInRoom ? (
        <>
          {/* Filter & Matching Controls */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
              تنظیمات جستجوی پارتنر مباحثه
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Gender */}
              <div>
                <label className="text-xs font-semibold text-[#52665A] dark:text-[#8EAA97] block mb-1.5">
                  گروه همبحثی:
                </label>
                <div className="grid grid-cols-2 gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => setSelectedGender('brother')}
                    className={`py-1.5 rounded-lg font-medium transition-colors ${
                      selectedGender === 'brother'
                        ? 'bg-[#2D6A4F] text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    برادران
                  </button>
                  <button
                    onClick={() => setSelectedGender('sister')}
                    className={`py-1.5 rounded-lg font-medium transition-colors ${
                      selectedGender === 'sister'
                        ? 'bg-[#2D6A4F] text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    خواهران
                  </button>
                </div>
              </div>

              {/* Target Juz */}
              <div>
                <label className="text-xs font-semibold text-[#52665A] dark:text-[#8EAA97] block mb-1.5">
                  جزء هدف جهت پرسش:
                </label>
                <select
                  value={targetJuz}
                  onChange={(e) => setTargetJuz(Number(e.target.value))}
                  className="w-full bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] rounded-xl px-3 py-2 text-xs text-[#1C2B22] dark:text-[#E2ECE5] focus:outline-hidden"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((j) => (
                    <option key={j} value={j}>جزء {j} قرآن کریم</option>
                  ))}
                </select>
              </div>

              {/* Time Slot */}
              <div>
                <label className="text-xs font-semibold text-[#52665A] dark:text-[#8EAA97] block mb-1.5">
                  زمان آزاد روزانه:
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] rounded-xl px-3 py-2 text-xs text-[#1C2B22] dark:text-[#E2ECE5] focus:outline-hidden"
                >
                  <option value="صبحگاهی (۰۶:۰۰ الی ۰۸:۰۰)">صبحگاهی (۰۶:۰۰ الی ۰۸:۰۰)</option>
                  <option value="عصرگاهی (۱۶:۰۰ الی ۱۸:۰۰)">عصرگاهی (۱۶:۰۰ الی ۱۸:۰۰)</option>
                  <option value="شبانه (۲۰:۰۰ الی ۲۲:۰۰)">شبانه (۲۰:۰۰ الی ۲۲:۰۰)</option>
                </select>
              </div>

              {/* Recitation Speed */}
              <div>
                <label className="text-xs font-semibold text-[#52665A] dark:text-[#8EAA97] block mb-1.5">
                  روش تلاوت:
                </label>
                <select
                  value={recitationSpeed}
                  onChange={(e) => setRecitationSpeed(e.target.value as any)}
                  className="w-full bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] rounded-xl px-3 py-2 text-xs text-[#1C2B22] dark:text-[#E2ECE5] focus:outline-hidden"
                >
                  <option value="tadwir">تدویر (سرعت متوسط معمول حفظ)</option>
                  <option value="hadr">حَدْر (تندخوانی تثبیت)</option>
                  <option value="tahqiq">تحقیق (شمرده و آموزشی)</option>
                </select>
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleStartSearch}
                disabled={isSearching}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold shadow-md hover:bg-[#1B4332] active:scale-95 transition-all disabled:opacity-50"
              >
                <Search className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
                <span>{isSearching ? 'در حال پایش صف حافظان آنلاین...' : 'یافتن همبحث متناسب (Smart Match)'}</span>
              </button>
            </div>
          </div>

          {/* Candidates Feed */}
          <div className="space-y-4">
            <span className="text-xs font-semibold text-[#52665A] dark:text-[#8EAA97] px-1 block">
              حافظان آماده مباحثه منطبق با معیارهای شما ({candidates.length} نفر):
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs hover:border-[#2D6A4F]/50 transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#2D6A4F]/20"
                        />
                        {cand.isOnline && (
                          <span 
                            className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#141F1A]" 
                            title="هم‌اکنون آنلاین"
                          />
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
                          {cand.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#52665A] dark:text-[#8EAA97] mt-0.5">
                          <span>{cand.city}</span>
                          <span>·</span>
                          <span className="text-[#2D6A4F] dark:text-[#52B788] font-semibold">{cand.hifzLevel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-center px-2.5 py-1 rounded-xl bg-[#2D6A4F]/10 dark:bg-[#52B788]/10 text-[#2D6A4F] dark:text-[#52B788]">
                      <span className="text-[10px] block font-medium">تطابق</span>
                      <span className="font-bold text-sm font-mono">{cand.matchScore}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#52665A] dark:text-[#8EAA97] leading-relaxed">
                    {cand.bio}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E1E8DF] dark:border-[#24382E]">
                    <div className="flex items-center gap-1.5 text-[#52665A] dark:text-[#8EAA97]">
                      <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>{cand.freeTimeSlots[0]}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#2D6A4F] dark:text-[#52B788] font-medium">
                      <Award className="w-3.5 h-3.5" />
                      <span>شاخص تعهد: {cand.reliabilityScore}%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEnterRoom(cand)}
                    className="w-full py-2.5 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332] transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>ورود به اتاق صوتی و پرسش محفوظات</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* LIVE WEBRTC QURAN TEST ROOM */
        <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#2D6A4F] dark:border-[#52B788] shadow-lg space-y-6">
          
          {/* Room Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E1E8DF] dark:border-[#24382E] pb-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h3 className="font-bold text-lg text-[#1C2B22] dark:text-[#E2ECE5]">
                  اتاق مباحثه تخصصی: جزء {targetJuz} قرآن کریم
                </h3>
                <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                  همبحث فعال: {matchedCandidate?.name} ({matchedCandidate?.hifzLevel})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] text-xs font-mono font-bold text-[#2D6A4F] dark:text-[#52B788]">
                <Clock className="w-4 h-4" />
                <span>{formatTime(roomTimeRemaining)}</span>
              </div>

              <button
                onClick={handleLeaveRoom}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>پایان مباحثه</span>
              </button>
            </div>
          </div>

          {/* Split Screen: Left Video/Audio feeds + Right Quran Verifier Teleprompter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Video / Audio Stream Avatars & Reciter Roles */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Partner Feed Box */}
              <div className="p-5 rounded-2xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] relative overflow-hidden text-center space-y-3">
                <div className="relative inline-block">
                  <img
                    src={matchedCandidate?.avatar}
                    alt={matchedCandidate?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#2D6A4F] mx-auto shadow-md"
                  />
                  {turn === 'partner' && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#2D6A4F] text-white text-[10px] font-bold shadow-xs whitespace-nowrap">
                      در حال تلاوت از حفظ...
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-base text-[#1C2B22] dark:text-[#E2ECE5]">
                    {matchedCandidate?.name}
                  </h4>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#2D6A4F] dark:text-[#52B788] mt-1">
                    <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                    <span>صدای شفاف WebRTC (کدک Opus - تاخیر ۳۵ms)</span>
                  </div>
                </div>

                {/* Recitation Turn Switcher */}
                <div className="p-3 bg-white dark:bg-[#141F1A] rounded-xl border border-[#E1E8DF] dark:border-[#24382E] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#52665A] dark:text-[#8EAA97]">
                    نوبت تحویل محفوظات:
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setTurn('partner')}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        turn === 'partner'
                          ? 'bg-[#2D6A4F] text-white font-bold'
                          : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      همبحث (مستمع شما)
                    </button>
                    <button
                      onClick={() => setTurn('me')}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        turn === 'me'
                          ? 'bg-[#2D6A4F] text-white font-bold'
                          : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      شما (مستمع همبحث)
                    </button>
                  </div>
                </div>

                {/* Media Control Toggles */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`p-3 rounded-full border transition-colors ${
                      isMicOn
                        ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                        : 'bg-red-100 text-red-600 border-red-300'
                    }`}
                    title={isMicOn ? 'قطع میکروفون' : 'وصل میکروفون'}
                  >
                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-3 rounded-full border transition-colors ${
                      isVideoOn
                        ? 'bg-white dark:bg-[#1B2923] text-neutral-700 dark:text-neutral-200 border-[#E1E8DF] dark:border-[#24382E]'
                        : 'bg-red-100 text-red-600 border-red-300'
                    }`}
                    title={isVideoOn ? 'قطع دوربین' : 'وصل دوربین'}
                  >
                    {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Realtime Error Tracker for the Reviewer (شمارشگر تپق و خطای حفظ) */}
              <div className="p-5 rounded-2xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#1C2B22] dark:text-[#E2ECE5] flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-[#C9A227]" />
                    <span>داوری و ثبت خطاهای حین تلاوت (برای سنجش تسلط)</span>
                  </h4>
                  <button
                    onClick={() => { setTapoqCount(0); setAerabCount(0); setJumpCount(0); }}
                    className="text-[11px] text-[#52665A] dark:text-[#8EAA97] hover:underline"
                  >
                    صفر کردن
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <button
                    onClick={() => setTapoqCount(prev => prev + 1)}
                    className="p-3 rounded-xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] hover:border-amber-400 transition-colors"
                  >
                    <span className="text-[11px] block text-[#52665A] dark:text-[#8EAA97]">تپق / مکث</span>
                    <span className="text-xl font-bold font-mono text-amber-600">{tapoqCount}</span>
                  </button>

                  <button
                    onClick={() => setAerabCount(prev => prev + 1)}
                    className="p-3 rounded-xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] hover:border-amber-400 transition-colors"
                  >
                    <span className="text-[11px] block text-[#52665A] dark:text-[#8EAA97]">اشکال اعراب</span>
                    <span className="text-xl font-bold font-mono text-blue-600">{aerabCount}</span>
                  </button>

                  <button
                    onClick={() => setJumpCount(prev => prev + 1)}
                    className="p-3 rounded-xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] hover:border-red-400 transition-colors"
                  >
                    <span className="text-[11px] block text-[#52665A] dark:text-[#8EAA97]">پرش / فراموشی</span>
                    <span className="text-xl font-bold font-mono text-red-600">{jumpCount}</span>
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>شاخص تسلط این صفحه:</span>
                  <span className="font-bold font-mono">
                    {Math.max(100 - (tapoqCount * 2 + aerabCount * 4 + jumpCount * 8), 60)}%
                  </span>
                </div>
              </div>

            </div>

            {/* Right: Quran Teleprompter for the Verifier */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E1E8DF] dark:border-[#24382E] pb-3">
                <span className="text-xs font-bold text-[#2D6A4F] dark:text-[#52B788]">
                  متن مصحف جهت تطبیق مستمع (Teleprompter)
                </span>
                <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                  سوره بقره · آیات ۱ الی ۵
                </span>
              </div>

              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {SAMPLE_AYAHS.slice(0, 5).map((ayah) => (
                  <div
                    key={ayah.numberInSurah}
                    className="p-4 rounded-xl bg-[#F8F9F6] dark:bg-[#0C1511] border border-[#E1E8DF] dark:border-[#24382E] text-right space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-[#52665A] dark:text-[#8EAA97]">
                      <span className="font-bold">آیه {ayah.numberInSurah}</span>
                      <span>صفحه ۲</span>
                    </div>
                    <p className="font-quran text-xl sm:text-2xl leading-relaxed text-[#1C2B22] dark:text-[#E2ECE5]">
                      {ayah.textUthmani}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {sessionCompleted && (
        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-center space-y-2">
          <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="font-bold text-base text-emerald-900 dark:text-emerald-200">
            جلسه مباحثه با موفقیت به پایان رسید
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-300">
            گزارش عملکرد و ساعت تمرین شما در کارنامه پیشرفت و شکوفایی گل ریحان ثبت شد (+۳۵ امتیاز رشد).
          </p>
        </div>
      )}
    </div>
  );
};

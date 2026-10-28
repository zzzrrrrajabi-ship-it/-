import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter,
  Flame,
  Clock,
  Sparkles,
} from 'lucide-react';

interface RetentionAnalyticsProps {
  onNavigateToLeitner?: () => void;
  onNavigateToMushaf?: () => void;
}

export const RetentionAnalytics: React.FC<RetentionAnalyticsProps> = ({
  onNavigateToLeitner,
  onNavigateToMushaf,
}) => {
  const [timeRange, setTimeRange] = useState<'30days' | '3months' | '6months'>('3months');
  const [selectedJuzFilter, setSelectedJuzFilter] = useState<'all' | 'weak'>('all');
  const [activeWeaknessType, setActiveWeaknessType] = useState<string>('all');

  // Trend of retention rate over time (۳ ماه اخیر به تفکیک هفته)
  const timelineData3Months = [
    { period: 'هفته ۱', retentionRate: 74, target: 90, reviewedVerses: 120, lapseCount: 31 },
    { period: 'هفته ۲', retentionRate: 78, target: 90, reviewedVerses: 145, lapseCount: 26 },
    { period: 'هفته ۳', retentionRate: 76, target: 90, reviewedVerses: 110, lapseCount: 28 },
    { period: 'هفته ۴', retentionRate: 81, target: 90, reviewedVerses: 160, lapseCount: 21 },
    { period: 'هفته ۵', retentionRate: 83, target: 90, reviewedVerses: 180, lapseCount: 18 },
    { period: 'هفته ۶', retentionRate: 80, target: 90, reviewedVerses: 150, lapseCount: 22 },
    { period: 'هفته ۷', retentionRate: 85, target: 90, reviewedVerses: 210, lapseCount: 15 },
    { period: 'هفته ۸', retentionRate: 88, target: 90, reviewedVerses: 230, lapseCount: 12 },
    { period: 'هفته ۹', retentionRate: 87, target: 90, reviewedVerses: 195, lapseCount: 14 },
    { period: 'هفته ۱۰', retentionRate: 91, target: 90, reviewedVerses: 240, lapseCount: 9 },
    { period: 'هفته ۱۱', retentionRate: 89, target: 90, reviewedVerses: 220, lapseCount: 11 },
    { period: 'هفته ۱۲ (جاری)', retentionRate: 93, target: 90, reviewedVerses: 265, lapseCount: 7 },
  ];

  const timelineData30Days = [
    { period: '۱ تا ۷ مهر', retentionRate: 86, target: 90, reviewedVerses: 180, lapseCount: 14 },
    { period: '۸ تا ۱۴ مهر', retentionRate: 89, target: 90, reviewedVerses: 220, lapseCount: 10 },
    { period: '۱۵ تا ۲۱ مهر', retentionRate: 91, target: 90, reviewedVerses: 250, lapseCount: 8 },
    { period: '۲۲ تا ۲۸ مهر', retentionRate: 93, target: 90, reviewedVerses: 265, lapseCount: 7 },
  ];

  const currentTimelineData = timeRange === '30days' ? timelineData30Days : timelineData3Months;

  // Breakdown by Quran Juzs showing retention & weakness color tagging
  // سبز (>= 85%): تثبیت پایدار
  // کهربایی (70% - 84%): نیازمند مرور
  // قرمز (< 70%): نقطه ضعف بحرانی
  const juzBreakdownData = [
    { juz: 'جزء ۱', name: 'جزء ۱ (فاتحه و بقره)', retention: 95, status: 'stable', weakSpots: 4, primaryError: 'متشابهات شفاعت' },
    { juz: 'جزء ۲', name: 'جزء ۲ (سیاق قبله و حج)', retention: 91, status: 'stable', weakSpots: 6, primaryError: 'فواصل آیات احکام' },
    { juz: 'جزء ۳', name: 'جزء ۳ (آیت‌الکرسی و آل‌عمران)', retention: 84, status: 'warning', weakSpots: 14, primaryError: 'سرآیات آل‌عمران' },
    { juz: 'جزء ۴', name: 'جزء ۴ (لن‌تنالوا البر)', retention: 76, status: 'warning', weakSpots: 21, primaryError: 'تشابه قصص انعام' },
    { juz: 'جزء ۵', name: 'جزء ۵ (والمحصنات)', retention: 64, status: 'critical', weakSpots: 32, primaryError: 'پرش خطوط سوره نساء' },
    { juz: 'جزء ۶', name: 'جزء ۶ (لا یحب‌الله)', retention: 72, status: 'warning', weakSpots: 18, primaryError: 'اعراب فواصل نساء' },
    { juz: 'جزء ۷', name: 'جزء ۷ (لتجدن اشد)', retention: 88, status: 'stable', weakSpots: 8, primaryError: 'سیاق نعمات مائده' },
    { juz: 'جزء ۸', name: 'جزء ۸ (ولو اننا)', retention: 67, status: 'critical', weakSpots: 29, primaryError: 'متشابهات انعام و اعراف' },
    { juz: 'جزء ۹', name: 'جزء ۹ (قال الملا)', retention: 82, status: 'warning', weakSpots: 16, primaryError: 'قصص پیامبران اعراف' },
    { juz: 'جزء ۱۰', name: 'جزء ۱۰ (واعلموا)', retention: 89, status: 'stable', weakSpots: 7, primaryError: 'آیات انفال و توبه' },
  ];

  const filteredJuzData = selectedJuzFilter === 'weak'
    ? juzBreakdownData.filter(j => j.status === 'critical' || j.status === 'warning')
    : juzBreakdownData;

  // Weakness categorized by error root cause
  const errorCategories = [
    { type: 'متشابهات و جابجایی الفاظ', count: 42, percentage: 38, color: '#DC2626', note: 'بیشترین تکرار در جزء ۴ و ۸' },
    { type: 'اشکال در اعراب و حرکات دشوار', count: 28, percentage: 26, color: '#D97706', note: 'بیشترین تکرار در سوره نساء' },
    { type: 'پرش آیه و فراموشی سرآیات', count: 24, percentage: 22, color: '#E11D48', note: 'بیشترین تکرار در آیات احکام' },
    { type: 'تردید در وقف و ابتدا', count: 16, percentage: 14, color: '#059669', note: 'نیاز به تثبیت معنایی' },
  ];

  // Specific critical weak verses needing immediate action
  const criticalVerses = [
    {
      surah: 'النساء',
      ayahRange: 'آیات ۲۳ الی ۲۸',
      juz: 5,
      issue: 'اشکال در تسلسل احکام محارم و فراموشی انتهای آیات با صفات الهی (غفوراً رحیماً)',
      errorType: 'فواصل و سرآیات',
      retentionScore: 58,
      recommendedAction: 'انتقال به خانه ۱ لایتنر و ۳ بار تلاوت با دور کند',
    },
    {
      surah: 'الأنعام',
      ayahRange: 'آیات ۱۱ الی ۱۵',
      juz: 7,
      issue: 'تداخل عبارت «قُلْ سِيرُوا فِي الْأَرْضِ ثُمَّ انْظُرُوا» با سوره نمل و روم («فَانْظُرُوا»)',
      errorType: 'متشابهات ادوات',
      retentionScore: 62,
      recommendedAction: 'مرور قاعده کلیدی «ثمّ در انعام / فـ در نمل»',
    },
    {
      surah: 'آل‌عمران',
      ayahRange: 'آیات ۹۲ الی ۹۷',
      juz: 4,
      issue: 'تردید در شروع سرآیه «كُلُّ الطَّعَامِ كَانَ حِلّاً» و اتصال به آیات قبل',
      errorType: 'سرآیات',
      retentionScore: 68,
      recommendedAction: 'تمرین در حالت آزمون آفلاین تشخیص آیه قبل و بعد',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return '#2D6A4F'; // سبز یشمی ریحان
      case 'warning': return '#D97706'; // کهربایی
      case 'critical': return '#DC2626'; // قرمز مرجانی
      default: return '#2D6A4F';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788] mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>هوش تحلیلی ریحان (Quranic Memorization Retention Analytics)</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              نمودار پیشرفت تثبیت و ردیابی نقاط ضعف
            </h2>
            <p className="text-sm text-[#52665A] dark:text-[#8EAA97] mt-1 max-w-2xl leading-relaxed">
              نمایش بصری منحنی فراموشی ابینگهاوس، نرخ تثبیت پایدار در طول زمان و تفکیک رنگی کانون‌های خطا در هر جزء جهت بهینه‌سازی زمان مرور حافظ.
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-xl self-start">
            <button
              onClick={() => setTimeRange('30days')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                timeRange === '30days'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              ۳۰ روز اخیر
            </button>
            <button
              onClick={() => setTimeRange('3months')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                timeRange === '3months'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52665A] dark:text-[#8EAA97] hover:text-[#1C2B22] dark:hover:text-[#E2ECE5]'
              }`}
            >
              ۳ ماه اخیر (۱۲ هفته)
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#52665A] dark:text-[#8EAA97]">
            <span>نرخ تثبیت کل (جاری)</span>
            <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#2D6A4F] dark:text-[#52B788] tabular-nums">
              ۹۳٪
            </span>
            <span className="text-xs text-emerald-600 font-semibold font-mono dir-ltr">
              +۱۹٪ رشد
            </span>
          </div>
          <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">
            بالاتر از حدنصاب ۹۰٪ مسابقات اوقاف
          </span>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#52665A] dark:text-[#8EAA97]">
            <span>نقاط ضعف بحرانی شناسایی‌شده</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-red-600 tabular-nums">
              ۳ موضع
            </span>
            <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
              در جزءهای ۵ و ۸
            </span>
          </div>
          <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">
            نیازمند مرور متمرکز در جعبه لایتنر
          </span>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#52665A] dark:text-[#8EAA97]">
            <span>آیات مرور شده در هفته جاری</span>
            <Layers className="w-4 h-4 text-[#C9A227]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#1C2B22] dark:text-[#E2ECE5] tabular-nums">
              ۲۶۵ آیه
            </span>
            <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
              (معادل ۱۳ صفحه)
            </span>
          </div>
          <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">
            میانگین خطای هر صفحه: تنها ۰.۴ تپق
          </span>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#52665A] dark:text-[#8EAA97]">
            <span>توالی تداوم حفظ (Streak)</span>
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#C9A227] tabular-nums">
              ۱۴ روز
            </span>
            <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
              پیوسته
            </span>
          </div>
          <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">
            شکوفایی بوته ریحان: ۷۸٪ بارور
          </span>
        </div>

      </div>

      {/* Main Retention Rate Chart (نمودار نرخ تثبیت در طول زمان) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E1E8DF] dark:border-[#24382E] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              منحنی پیشرفت نرخ تثبیت محفوظات در طول زمان (%)
            </h3>
            <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
              مقایسه درصد موفقیت تلاوت بدون لغزش با خط مبنای هدف (۹۰٪ تثبیت پایدار)
            </span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#2D6A4F]" />
              <span className="text-[#52665A] dark:text-[#8EAA97]">نرخ تثبیت شما</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-500 border-dashed" />
              <span className="text-[#52665A] dark:text-[#8EAA97]">حدنصاب هدف (۹۰٪)</span>
            </div>
          </div>
        </div>

        {/* Visual Chart Container */}
        <div className="w-full h-72 sm:h-80 pt-2" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentTimelineData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="period"
                stroke="#8EAA97"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[50, 100]}
                stroke="#8EAA97"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141F1A',
                  borderColor: '#24382E',
                  borderRadius: '12px',
                  color: '#E2ECE5',
                  fontSize: '12px',
                  direction: 'rtl',
                  textAlign: 'right',
                }}
                formatter={(value: any) => [`${value}٪`, 'نرخ تثبیت']}
                labelFormatter={(label) => `بازه: ${label}`}
              />
              <ReferenceLine y={90} stroke="#C9A227" strokeDasharray="4 4" label={{ value: 'هدف ۹۰٪', fill: '#C9A227', fontSize: 11, position: 'right' }} />
              <Area
                type="monotone"
                dataKey="retentionRate"
                stroke="#2D6A4F"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#retentionGradient)"
                dot={{ r: 4, fill: '#2D6A4F', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, fill: '#52B788' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-[#F8F9F6] dark:bg-[#0C1511] rounded-xl border border-[#E1E8DF] dark:border-[#24382E] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#52665A] dark:text-[#8EAA97]">
          <span>تحلیل سیستم: از هفته هفتم به بعد با افزایش تکرار در لایتنر، شیب رشد تثبیت با ثبات بیش از ۹۱٪ همراه بوده است.</span>
          <span className="font-bold text-[#2D6A4F] dark:text-[#52B788]">ثبت ۷ لغزش در برابر ۲۶۵ آیه</span>
        </div>

      </div>

      {/* Two Column Grid: Color Coded Juz Breakdown + Error Type Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Juz-by-Juz Color-Coded Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E1E8DF] dark:border-[#24382E] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
                وضعیت تثبیت به تفکیک جزءها با کدهای رنگی
              </h3>
              <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                شناسایی سریع جزءهای مستحکم و جزءهای آسیب‌پذیر
              </span>
            </div>

            <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl text-xs self-start">
              <button
                onClick={() => setSelectedJuzFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedJuzFilter === 'all'
                    ? 'bg-[#2D6A4F] text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}
              >
                همه اجزاء (۱۰ جزء)
              </button>
              <button
                onClick={() => setSelectedJuzFilter('weak')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedJuzFilter === 'weak'
                    ? 'bg-red-600 text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}
              >
                فقط نقاط ضعف ({juzBreakdownData.filter(j => j.status !== 'stable').length})
              </button>
            </div>
          </div>

          {/* Color Meaning Guide */}
          <div className="flex items-center gap-4 text-xs flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#2D6A4F]" />
              <span className="text-[#52665A] dark:text-[#8EAA97]">تثبیت پایدار (بالای ۸۵٪)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#D97706]" />
              <span className="text-[#52665A] dark:text-[#8EAA97]">هشدار / نیازمند مرور (۷۰٪ الی ۸۴٪)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#DC2626]" />
              <span className="text-[#52665A] dark:text-[#8EAA97]">نقطه ضعف بحرانی (زیر ۷۰٪)</span>
            </div>
          </div>

          {/* Horizontal Bar Visualizer */}
          <div className="w-full h-72 pt-2" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredJuzData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  stroke="#8EAA97"
                  fontSize={11}
                  tickFormatter={(val) => `${val}%`}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  dataKey="juz"
                  type="category"
                  stroke="#8EAA97"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#141F1A',
                    borderColor: '#24382E',
                    borderRadius: '12px',
                    color: '#E2ECE5',
                    fontSize: '12px',
                    direction: 'rtl',
                    textAlign: 'right',
                  }}
                  formatter={(value: any, name: any, item: any) => [
                    `${value}٪ (خطای عمده: ${item.payload.primaryError})`,
                    item.payload.name
                  ]}
                />
                <Bar dataKey="retention" radius={[0, 6, 6, 0]}>
                  {filteredJuzData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-1">
            {filteredJuzData.filter(j => j.status === 'critical').map((crit, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center justify-between text-xs text-red-900 dark:text-red-200"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-bold">{crit.name}:</span>
                  <span>{crit.weakSpots} آیه لرزان شناسایی شد · علت اصلی: {crit.primaryError}</span>
                </div>
                <span className="font-mono font-bold">{crit.retention}%</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right: Error Type Breakdown & Actionable Targets */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Categorized Error Heatmap Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
                تحلیل ریشه‌ای خطاها و لغزش‌ها
              </h3>
              <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
                تفکیک نوع خطای حافظ در آزمون‌ها و مباحثات برخط
              </span>
            </div>

            <div className="space-y-3">
              {errorCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1C2B22] dark:text-[#E2ECE5]">
                      {cat.type}
                    </span>
                    <span className="font-mono font-bold text-[#52665A] dark:text-[#8EAA97]">
                      {cat.count} مورد ({cat.percentage}٪)
                    </span>
                  </div>

                  <div className="w-full bg-black/5 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>

                  <span className="text-[11px] text-[#52665A] dark:text-[#8EAA97] block">
                    {cat.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Plan Card */}
          <div className="p-6 rounded-2xl bg-[#EBF3ED] dark:bg-[#141F1A] border border-[#CBE0D1] dark:border-[#24382E] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1F5F3E] dark:text-[#52B788]">
              <Sparkles className="w-4 h-4" />
              <span>پیشنهاد برنامه تثبیت امروز سیستم:</span>
            </div>
            <p className="text-xs text-[#113422] dark:text-[#E2ECE5] leading-relaxed">
              برای رساندن نرخ تثبیت جزء ۵ از ۶۴٪ به بالای ۸۵٪، توصیه می‌شود کارت‌های آیه ۲۳ الی ۲۸ سوره نساء را در جعبه لایتنر مرور کرده و یک جلسه مباحثه ۲۰ دقیقه‌ای اختصاص دهید.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={onNavigateToLeitner}
                className="px-3.5 py-1.5 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332] transition-colors flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>ورود به جعبه لایتنر آیات سخت</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Actionable Weak Points Table with direct drill links */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E1E8DF] dark:border-[#24382E] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E1E8DF] dark:border-[#24382E] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
              جدول کانون‌های بحرانی جهت مداخله آموزشی فوری (Actionable Focus Spots)
            </h3>
            <span className="text-xs text-[#52665A] dark:text-[#8EAA97]">
              آیات دارای بیش از ۳ بار تکرار لغزش در آزمون‌های متقابل همبحث
            </span>
          </div>
          <span className="text-xs text-red-600 font-bold bg-red-50 dark:bg-red-950/50 px-2.5 py-1 rounded-lg">
            ۳ موضع نیازمند بازبینی
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-[#E1E8DF] dark:border-[#24382E] text-[#52665A] dark:text-[#8EAA97]">
                <th className="py-2.5 px-3 font-semibold">موضع قرآنی</th>
                <th className="py-2.5 px-3 font-semibold">نوع اشکال</th>
                <th className="py-2.5 px-3 font-semibold">شرح ضعف</th>
                <th className="py-2.5 px-3 font-semibold">نرخ تسلط</th>
                <th className="py-2.5 px-3 font-semibold">اقدام پیشنهادی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8DF] dark:divide-[#24382E]">
              {criticalVerses.map((v, i) => (
                <tr key={i} className="hover:bg-[#F8F9F6] dark:hover:bg-[#0C1511]/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-[#1C2B22] dark:text-[#E2ECE5]">
                    سوره {v.surah} · {v.ayahRange} (جزء {v.juz})
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-medium text-[11px]">
                      {v.errorType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#52665A] dark:text-[#8EAA97] max-w-xs">
                    {v.issue}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-red-600">
                    {v.retentionScore}%
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={onNavigateToLeitner}
                      className="flex items-center gap-1 text-[#2D6A4F] dark:text-[#52B788] hover:underline font-bold"
                    >
                      <span>{v.recommendedAction}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

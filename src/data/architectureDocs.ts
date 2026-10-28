export const ARCHITECTURE_DOCS = {
  title: 'معماری جامع نرم‌افزار اپلیکیشن چندسکویی «ریحان» (Reyhan Architecture)',
  overview: `«ریحان» به عنوان سوپراپلیکیشن تخصصی حافظان قرآن، نیازمند معماری تاب‌آور، ماژولار و مبتنی بر Clean Architecture است که بتواند پردازش آفلاین متن و صوت قرآن، همگام‌سازی بی‌درنگ (Realtime) همبحث و ارتباطات صوتی نظیربه‌نظیر (WebRTC) را با نهایت پایداری فراهم کند.`,
  techStack: [
    {
      layer: 'سمت کاربر چندسکویی (Client Layer)',
      technology: 'Flutter (Dart) / React Native (Expo SDK 52+)',
      rationale: 'موتور گرافیکی Impeller در فلاتر بالاترین رندرینگ را برای خطوط پیچیده عثمان‌طه و اعراب‌گذاری دقیق بدون تاخیر (۶۰/۱۲۰ فریم) فراهم می‌کند. پکیج‌های Just_Audio برای مدیریت صفوف Loop و WebRTC برای صوت همبحث.'
    },
    {
      layer: 'پایگاه داده و بک‌اند سرویس (Backend & BaaS)',
      technology: 'Supabase (PostgreSQL 16) + Edge Functions (Deno/Node.js)',
      rationale: 'امکان ذخیره ساختار کامل آیات، درختواره‌های متشابهات با پسوند pgvector جهت جستجوی معنایی و صوتی، سیستم Realtime برای اعلام وضعیت آنلاین بودن همبحث و اعلان‌ها.'
    },
    {
      layer: 'ارتباطات بی‌درنگ صوت و تصویر (RTC Engine)',
      technology: 'LiveKit SFU / Cloud WebRTC Mesh',
      rationale: 'مصرف پهنای باند بهینه و تاخیر کمتر از ۱۵۰ میلی‌ثانیه برای ارتباط صوتی دونفره و اتاق‌های حلقه‌ای (محافل ۱۰ الی ۵۰ نفره) با رمزنگاری سرتاسری E2EE.'
    },
    {
      layer: 'هوش مصنوعی تحلیل تجوید و لحن (AI Speech & Tajweed)',
      technology: 'Fine-tuned Whisper / Wav2Vec2-Quranic-Acoustic + Gemini Flash',
      rationale: 'مدل صوتی تخصصی آموزش‌دیده روی قاریان جهان اسلام برای شناسایی مخرج حروف (قلقله، غنه، اخفاء، ادغام، تفخیم و ترقیق) و ارائه بازخورد در کسری از ثانیه.'
    },
    {
      layer: 'کشینگ و صف‌بندی مچینگ (Caching & Queue)',
      technology: 'Redis (Upstash / Redis Cloud)',
      rationale: 'مدیریت صف‌های مچینگ همبحث بر اساس جغرافیا، زمان آزاد و سطح جزء با TTL های کوتاه جهت جفت‌سازی آنی زیر ۲ ثانیه.'
    }
  ],
  folderStructure: `reyhan_core/
├── lib/
│   ├── app/
│   │   ├── config/ (themes, routes, localization, constants)
│   │   └── di/ (dependency injection via get_it / riverpod)
│   ├── core/
│   │   ├── audio/ (smart loop player, background audio service)
│   │   ├── database/ (drift / sqflite offline cache, hive)
│   │   ├── network/ (supabase client, dio, webrtc manager)
│   │   ├── utils/ (arabic tokenizers, diff highlight engine)
│   │   └── widgets/ (uthmani_text, serene_scaffold, blossom_gauge)
│   ├── features/
│   │   ├── quran_reader/
│   │   │   ├── data/ (sources, repositories, models)
│   │   │   ├── domain/ (usecases: get_surah, loop_recitation)
│   │   │   └── presentation/ (mushaf_page, tafsir_bottomsheet)
│   │   ├── mutashabihat/
│   │   │   ├── data/ (vector embeddings, tree node repository)
│   │   │   ├── domain/ (detect_similarity, get_mnemonic_anchor)
│   │   │   └── presentation/ (color_code_diff_view, memory_tree)
│   │   ├── partner_matching/
│   │   │   ├── data/ (matching_socket, rtc_room_repository)
│   │   │   ├── domain/ (match_partner_usecase, score_calculator)
│   │   │   └── presentation/ (radar_search_screen, live_test_call)
│   │   ├── tajweed_ai_academy/
│   │   │   ├── data/ (audio_stream_recorder, ai_eval_api)
│   │   │   └── presentation/ (makharij_waveform, phoneme_report)
│   │   ├── circles_arena/
│   │   │   └── presentation/ (live_halaqah_room, gamified_quiz)
│   │   └── leitner_progress/
│   │       └── presentation/ (spaced_card_deck, reyhan_bloom_tree)
│   └── main.dart`,
  databaseSchemaSql: `-- ۱. جدول کاربران و پروفایل تخصصی حافظ
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    gender TEXT CHECK (gender IN ('brother', 'sister')),
    birth_year INT,
    province_city TEXT,
    hifz_status TEXT NOT NULL, -- مثلا: '15_juz', 'hafez_kol', '5_juz'
    memorized_juzs INT[] DEFAULT '{}',
    current_target_juz INT,
    recitation_speed TEXT DEFAULT 'tadwir', -- 'tahqiq', 'tadwir', 'hadr'
    reliability_score NUMERIC(5,2) DEFAULT 100.0, -- شاخص تعهد زمانی
    total_test_hours INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ۲. جدول آیات قرآن با نمایه متنی و برداری
CREATE TABLE public.quran_ayahs (
    id SERIAL PRIMARY KEY,
    surah_number INT NOT NULL,
    ayah_number INT NOT NULL,
    juz INT NOT NULL,
    page INT NOT NULL,
    text_uthmani TEXT NOT NULL,
    text_simple TEXT NOT NULL,
    translation_fa TEXT,
    tafsir_brief TEXT,
    audio_verse_url TEXT,
    embedding vector(768) -- جهت جستجوی تشابه معنایی
);

-- ۳. جدول شبکه متشابهات و پیوندهای تفکیکی
CREATE TABLE public.mutashabihat_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    similarity_category TEXT CHECK (similarity_category IN ('particles', 'word_order', 'ending', 'beginning')),
    source_ayah_id INT REFERENCES public.quran_ayahs(id),
    target_ayah_id INT REFERENCES public.quran_ayahs(id),
    token_diff_json JSONB NOT NULL, -- کلمات متفاوت و یکسان با کد رنگی
    memory_anchor_mnemonic TEXT NOT NULL, -- ضابطه طلایی حفظ
    difficulty_rank INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ۴. جعبه لایتنر هوشمند آیات دشوار و تثبیت
CREATE TABLE public.leitner_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    ayah_id INT REFERENCES public.quran_ayahs(id),
    box_level INT DEFAULT 1 CHECK (box_level BETWEEN 1 AND 5),
    next_review_at TIMESTAMPTZ DEFAULT NOW(),
    repetition_count INT DEFAULT 0,
    consecutive_correct INT DEFAULT 0,
    last_state TEXT CHECK (last_state IN ('mastered', 'lapse', 'review_pending')),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ۵. صف و سوابق مچینگ همبحث آنلاین
CREATE TABLE public.matching_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID REFERENCES public.profiles(id),
    partner_id UUID REFERENCES public.profiles(id),
    target_juz INT NOT NULL,
    scheduled_slot TIMESTAMPTZ NOT NULL,
    duration_minutes INT DEFAULT 45,
    room_token TEXT NOT NULL,
    status TEXT CHECK (status IN ('queued', 'matched', 'in_progress', 'completed', 'cancelled')),
    requester_feedback JSONB, -- امتیاز و ثبت خطاهای حفظی پارتنر
    partner_feedback JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ۶. امنیت با سیاست‌های سطح سطر (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leitner_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view public profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users modify own leitner" ON public.leitner_cards FOR ALL USING (auth.uid() = user_id);`,
  mutashabihatCodeSnippet: `// ==========================================
// ماژول ۱: موتور تطبیق و تفاوت‌یابی آیات مشابه (Mutashabihat Engine)
// پیاده‌سازی به زبان Dart/TypeScript با محاسبه Token Diff و Levenshtein قرآنی
// ==========================================

export interface TokenDiffResult {
  token: string;
  isDifferent: boolean;
  type: 'identical' | 'replaced' | 'omitted' | 'transposed';
  colorTag: string; // برای نمایش با استایل ریحان (سبز، کهربایی، یاقوتی)
}

export class QuranMutashabihatEngine {
  /**
   * مقایسه دو آیه شبیه به هم و تفکیک کلمات همسان و متمایز
   */
  static analyzeDifference(ayahA: string, ayahB: string): { tokensA: TokenDiffResult[]; tokensB: TokenDiffResult[] } {
    const cleanTokens = (t: string) => t.trim().split(/\\s+/);
    const wordsA = cleanTokens(ayahA);
    const wordsB = cleanTokens(ayahB);

    const diffsA: TokenDiffResult[] = [];
    const diffsB: TokenDiffResult[] = [];

    let i = 0, j = 0;
    while (i < wordsA.length || j < wordsB.length) {
      const wordA = wordsA[i];
      const wordB = wordsB[j];

      if (wordA === wordB && wordA !== undefined) {
        diffsA.push({ token: wordA, isDifferent: false, type: 'identical', colorTag: 'neutral' });
        diffsB.push({ token: wordB, isDifferent: false, type: 'identical', colorTag: 'neutral' });
        i++; j++;
      } else {
        // شناسایی تقدم/تاخر یا جابجایی کلمات (مثلا شفاعة و عدل در بقره ۴۸ و ۱۲۳)
        const nextMatchInB = wordsB.indexOf(wordA, j);
        const nextMatchInA = wordsA.indexOf(wordB, i);

        if (wordA && (!wordB || (nextMatchInB !== -1 && nextMatchInB - j < 3))) {
          diffsA.push({ token: wordA, isDifferent: true, type: 'transposed', colorTag: 'amber' });
          i++;
        } else if (wordB && (!wordA || (nextMatchInA !== -1 && nextMatchInA - i < 3))) {
          diffsB.push({ token: wordB, isDifferent: true, type: 'transposed', colorTag: 'amber' });
          j++;
        } else {
          if (wordA) diffsA.push({ token: wordA, isDifferent: true, type: 'replaced', colorTag: 'emerald' });
          if (wordB) diffsB.push({ token: wordB, isDifferent: true, type: 'replaced', colorTag: 'emerald' });
          i++; j++;
        }
      }
    }

    return { tokensA: diffsA, tokensB: diffsB };
  }
}`,
  matchingEngineCodeSnippet: `// ==========================================
// ماژول ۲: سیستم مچینگ هوشمند همبحث آنلاین (Partner Matching Service)
// الگوریتم وزن‌دهی چندمعیاره بر اساس سطح جزء، زمان آزاد و شاخص تعهد
// ==========================================

export interface MatchingCriteria {
  requesterId: string;
  gender: 'brother' | 'sister';
  targetJuz: number[];
  preferredTimeSlot: string;
  recitationSpeed: 'tahqiq' | 'tadwir' | 'hadr';
  maxAgeDifference: number;
}

export class ReyhanPartnerMatcher {
  /**
   * محاسبه ضریب سازگاری بین دو حافظ قرآن (Compatibility Score: 0 to 100)
   */
  static calculateCompatibilityScore(
    user: MemorizerProfile,
    candidate: MemorizerProfile,
    criteria: MatchingCriteria
  ): number {
    // شرط قطعی شرعی و اخلاقی: تفکیک جنسیت
    if (user.gender !== candidate.gender) return 0;

    let totalScore = 0;

    // ۱. اشتراک جزءهای هدف (وزن: ۳۵ درصد)
    const commonJuzs = user.juzTarget.filter(j => candidate.juzTarget.includes(j));
    const juzScore = (commonJuzs.length / Math.max(user.juzTarget.length, 1)) * 35;
    totalScore += Math.min(juzScore, 35);

    // ۲. همپوشانی بازه‌های زمانی آزاد (وزن: ۳۰ درصد)
    const hasSharedSlot = candidate.freeTimeSlots.some(slot =>
      user.freeTimeSlots.includes(slot) || slot === criteria.preferredTimeSlot
    );
    if (hasSharedSlot) totalScore += 30;

    // ۳. تطابق سرعت خواندن و روش مرور (وزن: ۱۵ درصد)
    if (user.recitationSpeed === candidate.recitationSpeed) {
      totalScore += 15;
    } else {
      totalScore += 7; // تلورانس نزدیک
    }

    // ۴. شاخص تعهد و حضور قبلی (وزن: ۱۰ درصد)
    const reliabilityBonus = (candidate.reliabilityScore / 100) * 10;
    totalScore += reliabilityBonus;

    // ۵. تناسب سنی (وزن: ۱۰ درصد)
    const ageDiff = Math.abs(user.age - candidate.age);
    if (ageDiff <= 4) totalScore += 10;
    else if (ageDiff <= criteria.maxAgeDifference) totalScore += 5;

    return Math.round(totalScore);
  }

  /**
   * تولید شناسه نشست امن و توکن اتصال WebRTC LiveKit
   */
  static async allocateSecureRoom(userAId: string, userBId: string, juz: number): Promise<{ roomId: string; liveKitToken: string }> {
    const roomId = 'reyhan_room_' + juz + 'j_' + Date.now();
    // در پروداکشن، LiveKit AccessToken با مجوز ویدئو/صوت در Edge Function صادر می‌شود
    return {
      roomId,
      liveKitToken: 'jwt_livekit_mock_token_for_' + roomId
    };
  }
}`,
  flutterPubspecYaml: `name: reyhan_quran_app
description: "ریحان | سوپراپلیکیشن چندسکویی حافظان قرآن کریم"
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ">=3.3.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  google_fonts: ^6.2.1
  just_audio: ^0.9.36
  fl_chart: ^0.68.0
  supabase_flutter: ^2.5.6
  flutter_webrtc: ^0.10.8
  lucide_icons: ^0.257.0
  provider: ^6.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true`,
  flutterMainDart: `// ========================================================
// فایل اصلی اپلیکیشن فلاتر ریحان (lib/main.dart)
// قابل اجرا با دستور: flutter run
// ========================================================

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ReyhanApp());
}

class ReyhanApp extends StatefulWidget {
  const ReyhanApp({super.key});

  @override
  State<ReyhanApp> createState() => _ReyhanAppState();
}

class _ReyhanAppState extends State<ReyhanApp> {
  int _currentThemeIndex = 0; // 0: ریحان (Basil), 1: کاغذ سنتی, 2: روز, 3: شب
  int _activeNavIndex = 0;

  // پالت رنگی ۴ گانه معنوی ریحان
  final List<ThemeData> _themes = [
    // تم ۱: سبز ریحان آرامش‌بخش
    ThemeData(
      brightness: Brightness.light,
      scaffoldBackgroundColor: const Color(0xFFEBF3ED),
      primaryColor: const Color(0xFF2D6A4F),
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFF2D6A4F),
        primary: const Color(0xFF2D6A4F),
        secondary: const Color(0xFF52B788),
        surface: const Color(0xFFF3F8F4),
      ),
      fontFamily: 'Vazirmatn',
    ),
    // تم ۲: کاغذ سنتی (Parchment)
    ThemeData(
      brightness: Brightness.light,
      scaffoldBackgroundColor: const Color(0xFFF5EFEB),
      primaryColor: const Color(0xFF2C5E43),
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFF2C5E43),
        surface: const Color(0xFFFCFAF6),
      ),
      fontFamily: 'Vazirmatn',
    ),
    // تم ۳: روشنایی روز
    ThemeData(
      brightness: Brightness.light,
      scaffoldBackgroundColor: const Color(0xFFF8F9F6),
      primaryColor: const Color(0xFF1B4332),
      colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1B4332)),
      fontFamily: 'Vazirmatn',
    ),
    // تم ۴: حالت شب OLED
    ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: const Color(0xFF0C1511),
      primaryColor: const Color(0xFF52B788),
      colorScheme: ColorScheme.fromSeed(
        brightness: Brightness.dark,
        seedColor: const Color(0xFF40916C),
        surface: const Color(0xFF141F1A),
      ),
      fontFamily: 'Vazirmatn',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ریحان | حافظان قرآن',
      debugShowCheckedModeBanner: false,
      theme: _themes[_currentThemeIndex],
      locale: const Locale('fa', 'IR'),
      supportedLocales: const [Locale('fa', 'IR'), Locale('ar', 'SA')],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      home: Directionality(
        textDirection: TextDirection.rtl,
        child: Scaffold(
          appBar: AppBar(
            backgroundColor: Theme.of(context).colorScheme.surface,
            elevation: 0,
            title: Row(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: const Color(0xFF2D6A4F),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.eco, color: Colors.white, size: 20),
                ),
                const SizedBox(width: 8),
                const Text(
                  'ریحان',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                ),
              ],
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.palette_outlined),
                tooltip: 'تغییر تم معنوی',
                onPressed: () {
                  setState(() {
                    _currentThemeIndex = (_currentThemeIndex + 1) % _themes.length;
                  });
                },
              ),
            ],
          ),
          body: _buildActiveScreen(_activeNavIndex),
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: _activeNavIndex,
            onTap: (index) => setState(() => _activeNavIndex = index),
            type: BottomNavigationBarType.fixed,
            selectedItemColor: const Color(0xFF2D6A4F),
            unselectedItemColor: Colors.grey,
            items: const [
              BottomNavigationBarItem(icon: Icon(Icons.menu_book), label: 'مصحف'),
              BottomNavigationBarItem(icon: Icon(Icons.auto_awesome), label: 'متشابهات'),
              BottomNavigationBarItem(icon: Icon(Icons.group), label: 'همبحث'),
              BottomNavigationBarItem(icon: Icon(Icons.show_chart), label: 'نمودار تثبیت'),
              BottomNavigationBarItem(icon: Icon(Icons.view_carousel), label: 'لایتنر'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildActiveScreen(int index) {
    switch (index) {
      case 0:
        return const Center(child: Text('مصحف عثمان‌طه و پلیر تکرار هوشمند'));
      case 1:
        return const Center(child: Text('شبکه متشابهات با کد رنگی و کلیدهای حافظه'));
      case 2:
        return const Center(child: Text('رادار مچینگ همبحث و اتاق WebRTC'));
      case 3:
        return const Center(child: Text('نمودار تحلیلی نرخ تثبیت و ردیابی ضعف‌ها'));
      default:
        return const Center(child: Text('جعبه لایتنر ۵ خانه و گیمیفیکیشن ریحان'));
    }
  }
}`
};

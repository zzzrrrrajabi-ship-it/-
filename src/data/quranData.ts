import { Ayah, MutashabihGroup, MemorizerProfile, LeitnerCard, TestQuestion } from '../types';

export const QURAN_SURAHS = [
  { number: 1, name: 'الفاتحة', englishName: 'Al-Fatiha', ayahsCount: 7, revelationType: 'مکی', juz: 1 },
  { number: 2, name: 'البقرة', englishName: 'Al-Baqara', ayahsCount: 286, revelationType: 'مدنی', juz: 1 },
  { number: 3, name: 'آل عمران', englishName: 'Ali \'Imran', ayahsCount: 200, revelationType: 'مدنی', juz: 3 },
  { number: 18, name: 'الکهف', englishName: 'Al-Kahf', ayahsCount: 110, revelationType: 'مکی', juz: 15 },
  { number: 55, name: 'الرحمن', englishName: 'Ar-Rahman', ayahsCount: 78, revelationType: 'مدنی', juz: 27 },
  { number: 67, name: 'الملك', englishName: 'Al-Mulk', ayahsCount: 30, revelationType: 'مکی', juz: 29 },
];

export const SAMPLE_AYAHS: Ayah[] = [
  {
    number: 1,
    numberInSurah: 1,
    surahNumber: 2,
    surahName: 'البقرة',
    surahEnglishName: 'Al-Baqara',
    juz: 1,
    page: 2,
    textUthmani: 'الٓمٓ ﴿١﴾',
    translationFa: 'الف، لام، میم (از حروف مقطعه و رموز قرآن).',
    tafsirBrief: 'حروف مقطعه نشانه اعجاز قرآن است؛ کتابی برآمده از همین حروف الفبا که بشر از آوردن مثل آن عاجز است.',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    hasMutashabih: false,
  },
  {
    number: 2,
    numberInSurah: 2,
    surahNumber: 2,
    surahName: 'البقرة',
    surahEnglishName: 'Al-Baqara',
    juz: 1,
    page: 2,
    textUthmani: 'ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ ﴿٢﴾',
    translationFa: 'آن کتاب با عظمت که هیچ شکی در آن نیست، مایه هدایت پرهیزکاران است.',
    tafsirBrief: 'بیانگر اصالت و حقانیت قرآن است که در هدایتگری آن برای دل‌های آماده و حق‌طلب تردیدی وجود ندارد.',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3',
    hasMutashabih: true,
  },
  {
    number: 3,
    numberInSurah: 3,
    surahNumber: 2,
    surahName: 'البقرة',
    surahEnglishName: 'Al-Baqara',
    juz: 1,
    page: 2,
    textUthmani: 'ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ ﴿٣﴾',
    translationFa: 'کسانی که به غیب ایمان دارند و نماز را برپا می‌دارند و از آنچه روزیشان داده‌ایم انفاق می‌کنند.',
    tafsirBrief: 'سه خصلت بنیادین متقین: پیوند قلبی با غیب و خدا، ارتباط مداوم با پروردگار با نماز، و احسان به خلق.',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3',
    hasMutashabih: false,
  },
  {
    number: 4,
    numberInSurah: 4,
    surahNumber: 2,
    surahName: 'البقرة',
    surahEnglishName: 'Al-Baqara',
    juz: 1,
    page: 2,
    textUthmani: 'وَٱلَّذِينَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ أُنزِلَ مِن قَبۡلِكَ وَبِٱلۡأٓخِرَةِ هُمۡ يُوقِنُونَ ﴿٤﴾',
    translationFa: 'و آنان که به آنچه به سوی تو فرستاده شده و آنچه پیش از تو نازل شده ایمان می‌آورند و به آخرت یقین دارند.',
    tafsirBrief: 'ایمان جامع به تمام انبیای الهی و وحی آسمانی، به دور از تعصبات مذهبی جاهلی.',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3',
    hasMutashabih: false,
  },
  {
    number: 5,
    numberInSurah: 5,
    surahNumber: 2,
    surahName: 'البقرة',
    surahEnglishName: 'Al-Baqara',
    juz: 1,
    page: 2,
    textUthmani: 'أُوْلَـٰٓئِكَ عَلَىٰ هُدٗى مِّن رَّبِّهِمۡۖ وَأُوْلَـٰٓئِكَ هُمُ ٱلۡمُفۡلِحُونَ ﴿٥﴾',
    translationFa: 'آنان برخوردار از هدایتی از سوی پروردگار خویشند، و هم آنان رستگارانند.',
    tafsirBrief: 'نتیجه پنج صفت قبلی، نیل به هدایت ویژه الهی و رستگاری قطعی در دنیا و آخرت است.',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3',
    hasMutashabih: true,
  },
  {
    number: 48,
    numberInSurah: 48,
    surahNumber: 2,
    surahName: 'البقرة',
    surahEnglishName: 'Al-Baqara',
    juz: 1,
    page: 7,
    textUthmani: 'وَٱتَّقُواْ يَوۡمٗا لَّا تَجۡزِي نَفۡسٌ عَن نَّفۡسٖ شَيۡـٔٗا وَلَا يُقۡبَلُ مِنۡهَا شَفَٰعَةٞ وَلَا يُؤۡخَذُ مِنۡهَا عَدۡلٞ وَلَا هُمۡ يُنصَرُونَ ﴿٤٨﴾',
    translationFa: 'و بترسید از روزی که هیچ‌کس از دیگری کفایت نمی‌کند، و از او شفاعتی پذیرفته نمی‌شود، و تاوانی گرفته نمی‌شود، و یاری نخواهند شد.',
    tafsirBrief: 'انذار شدید به بنی‌اسرائیل که نسبت‌های نژادی و ادعای شفاعت بدون اذن در قیامت کارساز نخواهد بود.',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/48.mp3',
    hasMutashabih: true,
  },
  {
    number: 123,
    numberInSurah: 123,
    surahNumber: 2,
    surahName: 'البقرة',
    surahEnglishName: 'Al-Baqara',
    juz: 1,
    page: 19,
    textUthmani: 'وَٱتَّقُواْ يَوۡمٗا لَّا تَجۡزِي نَفۡسٌ عَن نَّفۡسٖ شَيۡـٔٗا وَلَا يُقۡبَلُ مِنۡهَا عَدۡلٞ وَلَا تَنفَعُهَا شَفَٰعَةٞ وَلَا هُمۡ يُنصَرُونَ ﴿١٢٣﴾',
    translationFa: 'و بترسید از روزی که هیچ‌کس عذاب دیگری را دفع نمی‌کند، و تاوانی از او پذیرفته نمی‌شود، و شفاعت سودی به او نمی‌بخشد، و یاری نخواهند شد.',
    tafsirBrief: 'تکرار هشدار در پایان بخش تاریخ بنی‌اسرائیل قبل از داستان حضرت ابراهیم (ع) با تفاوت ترتیبی دقیق.',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/123.mp3',
    hasMutashabih: true,
  }
];

export const MUTASHABIHAT_GROUPS: MutashabihGroup[] = [
  {
    id: 'mut-1',
    title: 'تشابه دوگانه آیه ۴۸ و ۱۲۳ سوره بقره (شفاعت و عدل)',
    similarityType: 'word_order',
    keyMemoryAnchor: 'رمز الفبایی ش-ع: در آیه نخست (۴۸) «شفاعت» مقدم است، در آیه دوم (۱۲۳) «عدل» اول آمده و فعل «لا تنفعها» به کار رفته است.',
    mnemonicRuleFa: '«در اولی شفاعت و در دومی فدیه (عدل) / شین بر عین مقدم است در آغاز دفتر»',
    treeLevel: 1,
    verses: [
      {
        surahName: 'البقرة',
        surahNumber: 2,
        ayahNumber: 48,
        juz: 1,
        textUthmani: 'وَٱتَّقُواْ يَوۡمٗا لَّا تَجۡزِي نَفۡسٌ عَن نَّفۡسٖ شَيۡـٔٗا وَلَا يُقۡبَلُ مِنۡهَا شَفَٰعَةٞ وَلَا يُؤۡخَذُ مِنۡهَا عَدۡلٞ وَلَا هُمۡ يُنصَرُونَ',
        tokens: [
          { text: 'وَٱتَّقُواْ يَوۡمٗا لَّا تَجۡزِي نَفۡسٌ عَن نَّفۡسٖ شَيۡـٔٗا', type: 'same' },
          { text: ' وَلَا يُقۡبَلُ مِنۡهَا شَفَٰعَةٞ', type: 'diff', highlightColor: 'emerald' },
          { text: ' وَلَا يُؤۡخَذُ مِنۡهَا عَدۡلٞ', type: 'diff', highlightColor: 'amber' },
          { text: ' وَلَا هُمۡ يُنصَرُونَ', type: 'same' }
        ],
        distinctionNote: 'آیه ۴۸: تقدم «شفاعت» با فعل «یُقبل» + «عدل» با فعل «یؤخذ»'
      },
      {
        surahName: 'البقرة',
        surahNumber: 2,
        ayahNumber: 123,
        juz: 1,
        textUthmani: 'وَٱتَّقُواْ يَوۡمٗا لَّا تَجۡزِي نَفۡسٌ عَن نَّفۡسٖ شَيۡـٔٗا وَلَا يُقۡبَلُ مِنۡهَا عَدۡلٞ وَلَا تَنفَعُهَا شَفَٰعَةٞ وَلَا هُمۡ يُنصَرُونَ',
        tokens: [
          { text: 'وَٱتَّقُواْ يَوۡمٗا لَّا تَجۡزِي نَفۡسٌ عَن نَّفۡسٖ شَيۡـٔٗا', type: 'same' },
          { text: ' وَلَا يُقۡبَلُ مِنۡهَا عَدۡلٞ', type: 'diff', highlightColor: 'amber' },
          { text: ' وَلَا تَنفَعُهَا شَفَٰعَةٞ', type: 'diff', highlightColor: 'emerald' },
          { text: ' وَلَا هُمۡ يُنصَرُونَ', type: 'same' }
        ],
        distinctionNote: 'آیه ۱۲۳: تقدم «عدل» با فعل «یُقبل» + «شفاعت» با فعل «لا تنفعها» (مؤنث)'
      }
    ]
  },
  {
    id: 'mut-2',
    title: 'تشابه «هُدًى وَبُشْرَى» میان سوره نمل و لقمان',
    similarityType: 'ending',
    keyMemoryAnchor: 'در سوره نمل «للمؤمنین» و در لقمان «للمحسنین»؛ تناسب نام سوره لقمان با احسان لقمان.',
    mnemonicRuleFa: '«نمل با مؤمنان آمد پدید / لقمان نیکوکاران (محسنین) برگزید»',
    treeLevel: 2,
    verses: [
      {
        surahName: 'النمل',
        surahNumber: 27,
        ayahNumber: 2,
        juz: 19,
        textUthmani: 'تِلۡكَ ءَايَٰتُ ٱلۡقُرۡءَانِ وَكِتَابٖ مُّبِينٖ ﴿١﴾ هُدٗى وَبُشۡرَىٰ لِلۡمُؤۡمِنِينَ ﴿٢﴾',
        tokens: [
          { text: 'هُدٗى وَبُشۡرَىٰ', type: 'same' },
          { text: ' لِلۡمُؤۡمِنِينَ', type: 'diff', highlightColor: 'emerald' }
        ],
        distinctionNote: 'سوره نمل: با میم شروع می‌شود و با «للمؤمنین» خاتمه می‌یابد.'
      },
      {
        surahName: 'لقمان',
        surahNumber: 31,
        ayahNumber: 3,
        juz: 21,
        textUthmani: 'تِلۡكَ ءَايَٰتُ ٱلۡكِتَٰبِ ٱلۡحَكِيمِ ﴿٢﴾ هُدٗى وَرَحۡمَةٗ لِّلۡمُحۡسِنِينَ ﴿٣﴾',
        tokens: [
          { text: 'هُدٗى وَرَحۡمَةٗ', type: 'diff', highlightColor: 'amber' },
          { text: ' لِّلۡمُحۡسِنِينَ', type: 'diff', highlightColor: 'cyan' }
        ],
        distinctionNote: 'سوره لقمان: ذکر «رحمة» به جای «بشری» و «للمحسنین» به تناسب وصایای اخلاقی لقمان.'
      }
    ]
  },
  {
    id: 'mut-3',
    title: 'تشابه در آغاز آیات با ادوات «قُلۡ سِيرُواْ فِي ٱلۡأَرۡضِ»',
    similarityType: 'particles',
    keyMemoryAnchor: 'سوره انعام با «قُلۡ سِيرُواْ» و سوره روم و نمل با «قُلۡ سِيرُواْ فِي ٱلۡأَرۡضِ فَٱنظُرُواْ كَيۡفَ كَانَ عَٰقِبَةُ...»',
    mnemonicRuleFa: 'انعام: «المکذبین» / نمل و روم: «المجرمین»',
    treeLevel: 2,
    verses: [
      {
        surahName: 'الأنعام',
        surahNumber: 6,
        ayahNumber: 11,
        juz: 7,
        textUthmani: 'قُلۡ سِيرُواْ فِي ٱلۡأَرۡضِ ثُمَّ ٱنظُرُواْ كَيۡفَ كَانَ عَٰقِبَةُ ٱلۡمُكَذِّبِينَ',
        tokens: [
          { text: 'قُلۡ سِيرُواْ فِي ٱلۡأَرۡضِ', type: 'same' },
          { text: ' ثُمَّ ٱنظُرُواْ', type: 'diff', highlightColor: 'emerald' },
          { text: ' كَيۡفَ كَانَ عَٰقِبَةُ', type: 'same' },
          { text: ' ٱلۡمُكَذِّبِينَ', type: 'diff', highlightColor: 'amber' }
        ],
        distinctionNote: 'در انعام واژه «ثمّ» آمده و پایان آیه «المکذبین» است.'
      },
      {
        surahName: 'النمل',
        surahNumber: 27,
        ayahNumber: 69,
        juz: 20,
        textUthmani: 'قُلۡ سِيرُواْ فِي ٱلۡأَرۡضِ فَٱنظُرُواْ كَيۡفَ كَانَ عَٰقِبَةُ ٱلۡمُجۡرِمِينَ',
        tokens: [
          { text: 'قُلۡ سِيرُواْ فِي ٱلۡأَرۡضِ', type: 'same' },
          { text: ' فَٱنظُرُواْ', type: 'diff', highlightColor: 'emerald' },
          { text: ' كَيۡفَ كَانَ عَٰقِبَةُ', type: 'same' },
          { text: ' ٱلۡمُجۡرِمِينَ', type: 'diff', highlightColor: 'amber' }
        ],
        distinctionNote: 'در نمل حرف «فـَ» آمده و پایان آیه «المجرمین» است.'
      }
    ]
  }
];

export const MEMORIZER_CANDIDATES: MemorizerProfile[] = [
  {
    id: 'user-1',
    name: 'محمدرضا اسماعیلی',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    gender: 'brother',
    age: 26,
    city: 'مشهد مقدس',
    hifzLevel: 'حافظ ۱۵ جزء',
    juzTarget: [1, 2, 3, 4, 5],
    freeTimeSlots: ['۲۰:۰۰ الی ۲۱:۳۰', 'صبحگاهی ۶:۰۰ الی ۷:۳۰'],
    recitationSpeed: 'tadwir',
    reliabilityScore: 98,
    bio: 'در حال تثبیت روزانه یک جزء. جویای همبحث باانگیزه جهت پرسش متقابل صفحات و آیات مشابه.',
    isOnline: true,
    matchScore: 97
  },
  {
    id: 'user-2',
    name: 'سید علی حسینی',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    gender: 'brother',
    age: 29,
    city: 'قم',
    hifzLevel: 'حافظ کل قرآن کریم',
    juzTarget: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    freeTimeSlots: ['۲۱:۰۰ الی ۲۲:۳۰'],
    recitationSpeed: 'hadr',
    reliabilityScore: 94,
    bio: 'تسلط بر وقف و ابتدا و تجوید تخصصی. به دنبال پارتنر منظم برای مرور دهگی (هر روز ۳ جزء).',
    isOnline: true,
    matchScore: 91
  },
  {
    id: 'user-3',
    name: 'حامد طاهری',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    gender: 'brother',
    age: 23,
    city: 'اصفهان',
    hifzLevel: 'حافظ ۵ جزء',
    juzTarget: [1, 2, 3],
    freeTimeSlots: ['۱۷:۰۰ الی ۱۸:۳۰', '۲۲:۰۰ الی ۲۳:۰۰'],
    recitationSpeed: 'tahqiq',
    reliabilityScore: 90,
    bio: 'قرآن‌آموز با پشتکار. تاکید زیاد بر سنجش اعراب و مخرج حروف.',
    isOnline: false,
    matchScore: 84
  },
  {
    id: 'user-4',
    name: 'فاطمه رضایی',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    gender: 'sister',
    age: 24,
    city: 'تهران',
    hifzLevel: 'حافظ ۲۰ جزء',
    juzTarget: [1, 2, 3, 4, 5],
    freeTimeSlots: ['۱۶:۰۰ الی ۱۷:۳۰', '۲۱:۰۰ الی ۲۲:۳۰'],
    recitationSpeed: 'tadwir',
    reliabilityScore: 99,
    bio: 'آمادگی برای مسابقات اوقاف و تثبیت دقیق وجوه تشابه سوره بقره و آل عمران.',
    isOnline: true,
    matchScore: 95
  }
];

export const SAMPLE_LEITNER_CARDS: LeitnerCard[] = [
  {
    id: 'leitner-1',
    surahNumber: 2,
    surahName: 'البقرة',
    ayahNumber: 48,
    textUthmani: 'وَٱتَّقُواْ يَوۡمٗا لَّا تَجۡزِي نَفۡسٌ عَن نَّفۡسٖ شَيۡـٔٗا وَلَا يُقۡبَلُ مِنۡهَا شَفَٰعَةٞ...',
    question: 'آیا در آیه ۴۸ بقره «شفاعت» مقدم است یا «عدل»؟ و فعل بعد از آن چیست؟',
    promptHint: 'ضابطه الفبایی ش-ع را به یاد آورید.',
    boxLevel: 2,
    nextReviewDays: 3,
    lastReviewedAt: 'دیروز',
    difficulty: 'hard'
  },
  {
    id: 'leitner-2',
    surahNumber: 2,
    surahName: 'البقرة',
    ayahNumber: 5,
    textUthmani: 'أُوْلَـٰٓئِكَ عَلَىٰ هُدٗى مِّن رَّبِّهِمۡۖ وَأُوْلَـٰٓئِكَ هُمُ ٱلۡمُفۡلِحُونَ',
    question: 'عبارت پایانی آیه ۵ بقره دقیقا با کدام آیه در سوره لقمان یکسان است؟',
    promptHint: 'آیه ۵ سوره لقمان نیز عیناً همین عبارت را دارد.',
    boxLevel: 4,
    nextReviewDays: 14,
    lastReviewedAt: '۶ روز پیش',
    difficulty: 'medium'
  },
  {
    id: 'leitner-3',
    surahNumber: 2,
    surahName: 'البقرة',
    ayahNumber: 123,
    textUthmani: 'وَٱتَّقُواْ يَوۡمٗا لَّا تَجۡزِي نَفۡسٌ عَن نَّفۡسٖ شَيۡـٔٗا وَلَا يُقۡبَلُ مِنۡهَا عَدۡلٞ وَلَا تَنفَعُهَا شَفَٰعَةٞ...',
    question: 'در آیه ۱۲۳ بقره صیغه فعل برای شفاعت چیست؟',
    promptHint: '«وَلا تَنفَعُها شَفاعَةٌ» به صورت مؤنث.',
    boxLevel: 1,
    nextReviewDays: 1,
    lastReviewedAt: 'امروز',
    difficulty: 'hard'
  }
];

export const SAMPLE_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 'q-1',
    type: 'mutashabih_choice',
    prompt: 'در آیه ۱۲۳ سوره بقره، پس از «وَلَا يُقۡبَلُ مِنۡهَا ...» کدام گزینه صحیح است؟',
    options: [
      'شَفَاعَةٌ وَلَا يُؤْخَذُ مِنْهَا عَدْلٌ',
      'عَدْلٌ وَلَا تَنفَعُهَا شَفَاعَةٌ',
      'شَفَاعَةٌ وَلَا هُمْ يُنصَرُونَ',
      'فِدْيَةٌ وَلَا يُؤْخَذُ مِنْهَا عَدْلٌ'
    ],
    correctIndex: 1,
    explanation: 'در آیه ۱۲۳ بقره کلمه «عَدل» مقدم شده و با فعل «لا تَنفَعُها شَفاعَة» ادامه می‌یابد (برخلاف آیه ۴۸).',
    surahName: 'البقرة',
    ayahNumber: 123
  },
  {
    id: 'q-2',
    type: 'next_ayah',
    prompt: 'پس از آیه مبارکه «ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ»، کدام آیه قرار دارد؟',
    options: [
      'أُوْلَـٰٓئِكَ عَلَىٰ هُدٗى مِّن رَّبِّهِمۡۖ',
      'وَٱلَّذِينَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ أُنزِلَ مِن قَبۡلِكَ وَبِٱلۡأٓخِرَةِ هُمۡ يُوقِنُونَ',
      'إِنَّ ٱلَّذِينَ كَفَرُواْ سَوَآءٌ عَلَيۡهِمۡ',
      'خَتَمَ ٱللَّهُ عَلَىٰ قُلُوبِهِمۡ وَعَلَىٰ سَمۡعِهِمۡ'
    ],
    correctIndex: 1,
    explanation: 'آیه ۴ سوره بقره صفت دوم متقین یعنی ایمان به کتب آسمانی گذشته و یقین به آخرت را بیان می‌فرماید.',
    surahName: 'البقرة',
    ayahNumber: 3
  },
  {
    id: 'q-3',
    type: 'fill_blank',
    prompt: 'جای خالی را تکمیل کنید: «ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى ...»',
    options: [
      'لِّلۡمُؤۡمِنِينَ',
      'لِّلۡمُحۡسِنِينَ',
      'لِّلۡمُتَّقِينَ',
      'لِّلنَّاسِ'
    ],
    correctIndex: 2,
    explanation: 'در آیه ۲ سوره مبارکه بقره، «هُدًى لِّلۡمُتَّقِينَ» آمده است.',
    surahName: 'البقرة',
    ayahNumber: 2
  }
];

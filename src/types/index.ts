export type ReadingTheme = 'day' | 'parchment' | 'basil' | 'night';

export interface Ayah {
  number: number;
  numberInSurah: number;
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  juz: number;
  page: number;
  textUthmani: string;
  translationFa: string;
  tafsirBrief: string;
  audioUrl?: string;
  hasMutashabih?: boolean;
}

export interface MutashabihTokenDiff {
  text: string;
  type: 'same' | 'diff' | 'omitted' | 'added';
  highlightColor?: string;
}

export interface MutashabihVerse {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  juz: number;
  textUthmani: string;
  tokens: MutashabihTokenDiff[];
  distinctionNote: string; // نکته تشخیصی و کلید حافظه
}

export interface MutashabihGroup {
  id: string;
  title: string;
  similarityType: 'particles' | 'word_order' | 'ending' | 'beginning'; // تشابه در ادوات، تقدم و تاخر، فواصل آیات، سرآیات
  keyMemoryAnchor: string; // رمز و ضابطه حفظی طلایی
  verses: MutashabihVerse[];
  mnemonicRuleFa: string; // قاعده منظوم یا علامتی
  treeLevel: number;
}

export interface MemorizerProfile {
  id: string;
  name: string;
  avatar: string;
  gender: 'brother' | 'sister';
  age: number;
  city: string;
  hifzLevel: string; // مثلا: ۱۰ جزء، کل قرآن، ۵ جزء
  juzTarget: number[];
  freeTimeSlots: string[];
  recitationSpeed: 'tahqiq' | 'tadwir' | 'hadr'; // تحقیق، تدویر، حدر (تندخوانی حفظ)
  reliabilityScore: number; // درصد تعهد و حضور به موقع
  bio: string;
  isOnline: boolean;
  matchScore?: number;
}

export interface LeitnerCard {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  textUthmani: string;
  question: string;
  promptHint: string;
  boxLevel: 1 | 2 | 3 | 4 | 5; // جعبه ۱ تا ۵
  nextReviewDays: number;
  lastReviewedAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestQuestion {
  id: string;
  type: 'next_ayah' | 'fill_blank' | 'surah_detect' | 'mutashabih_choice';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  surahName: string;
  ayahNumber: number;
}

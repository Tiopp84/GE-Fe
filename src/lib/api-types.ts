import type {
  Exercise,
  GrammarTopic,
  ListeningItem,
  ReadingPassage,
  ShadowingItem,
  SpeakingExamPrompt,
  VocabularyItem,
  WritingPrompt,
} from "./content-types";
import type { WritingReview } from "./writing-types";

export interface LessonCounts {
  vocabulary: number;
  grammar: number;
  exercises: number;
  workbook?: number;
  custom?: number;
  writingPrompts: number;
  shadowing: number;
  exams: number;
}

export interface LessonSummary {
  id: string;
  number: number;
  level: string;
  title: string;
  subtitle: string;
  available: boolean;
  bookReference: string | null;
  counts: LessonCounts;
}

export interface CatalogResponse {
  lessons: LessonSummary[];
}

export interface LessonBundle {
  lesson: LessonSummary;
  objectives: string[];
  vocabulary: VocabularyItem[];
  grammarTopics: GrammarTopic[];
  exercises: Exercise[];
  reading: ReadingPassage | null;
  listening: ListeningItem | null;
  writingPrompts: WritingPrompt[];
  speaking: {
    shadowing: ShadowingItem[];
    examPrompts: SpeakingExamPrompt[];
    selfCheck: string[];
  };
}

export interface ExercisePageData {
  exercise: Exercise;
  lesson: LessonSummary | null;
  grammarTopics: GrammarTopic[];
  vocabulary: VocabularyItem[];
}

export interface WritingReviewResponse {
  review: WritingReview;
  provider: "local" | "ai";
  fallback: boolean;
  reason?: string;
  notice?: string;
}

export type PartOfSpeech = "noun" | "verb" | "phrase" | "adjective" | "adverb" | "pronoun";

export interface VerbForms {
  infinitiv: string;
  present: Record<string, string>;
  note?: string;
}

export interface VocabularyItem {
  id: string;
  lemma: string;
  pos: PartOfSpeech;
  posLabel: string;
  meaningVi: string;
  phonetic: string;
  article?: "der" | "die" | "das";
  gender?: "m" | "f" | "n";
  plural?: string;
  verbForms?: VerbForms;
  note?: string;
  examples: { de: string; vi: string }[];
  lessonId: string;
  topicIds: string[];
}

export interface GrammarTopic {
  id: string;
  lessonId: string;
  title: string;
  subtitle: string;
  rule: string[];
  formula?: string;
  table?: { headers: string[]; rows: string[][] };
  examples: { de: string; vi: string; note?: string }[];
  exception?: string;
  linkedExerciseIds: string[];
  linkedVocabularyIds: string[];
}

export type QuestionType = "mcq" | "truefalse" | "fill" | "order";

export interface ExerciseQuestion {
  id: string;
  type: QuestionType;
  instruction: string;
  prompt: string;
  options?: { id: string; label: string }[];
  answer: string | string[];
  acceptable?: string[];
  words?: string[];
  explanation: string;
  translation?: string;
}

export interface Exercise {
  id: string;
  category: "workbook" | "custom";
  lessonId: string;
  title: string;
  description: string;
  topicIds: string[];
  sourceKind: "workbook_reference" | "original";
  reference: string;
  estimatedMinutes: number;
  questions: ExerciseQuestion[];
}

export interface ReadingQuestion {
  id: string;
  type: "mcq" | "truefalse";
  prompt: string;
  options: { id: string; label: string }[];
  answer: string;
  explanation: string;
}

export interface ReadingPassage {
  id: string;
  lessonId: string;
  title: string;
  subtitle: string;
  paragraphs: { de: string; vi?: string }[];
  tip: string;
  questions: ReadingQuestion[];
}

export interface ListeningItem {
  id: string;
  lessonId: string;
  title: string;
  subtitle: string;
  transcript: string;
  translation: string;
  notes: string[];
}

export interface WritingPrompt {
  id: string;
  lessonId: string;
  type: "sentence" | "paragraph";
  title: string;
  instruction: string;
  requirements: string[];
  targetVocabulary: string[];
  targetGrammar: string[];
  wordGuidance: string;
  sample: string;
}

export interface ShadowingItem {
  id: string;
  text: string;
  translation: string;
  topic: string;
}

export interface SpeakingExamPrompt {
  id: string;
  title: string;
  topic: string;
  instructions: string[];
  keywords: string[];
  template: { de: string; vi: string }[];
}

export type WritingErrorType = "grammar" | "vocabulary" | "spelling" | "task";

export interface WritingError {
  type: WritingErrorType;
  excerpt: string;
  correction: string;
  explanation: string;
}

export interface WritingCriterion {
  id: string;
  label: string;
  score: number;
  comment: string;
}

export type WritingReviewProvider = "ai" | "local";

export interface WritingReview {
  score: number;
  summary: string;
  criteria: WritingCriterion[];
  errors: WritingError[];
  suggestedText: string;
  model: string;
  promptVersion: string;
  createdAt: string;
  /** Có thể vắng mặt ở bản ghi cũ trong localStorage. */
  provider?: WritingReviewProvider;
  /** true khi kết quả đến từ bộ quy tắc cục bộ. */
  isDemo?: boolean;
}

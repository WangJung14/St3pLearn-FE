export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  roles: string[];
  status: string;
  targetCefr?: string;
  createdAt?: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  bio?: string;
  targetCefr?: string;
  avatarUrl?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface LoginHistoryItem {
  id: string;
  ipAddress: string;
  userAgent: string;
  loginTime: string;
  deviceType?: string;
  location?: string;
}

export interface EnrolledCourse {
  enrollmentId: string;
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  thumbnailUrl: string;
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
  lastLessonId?: string;
  lastLessonTitle?: string;
  enrolledAt: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
}

export interface WishlistItem {
  id: string;
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  thumbnailUrl: string;
  price: number;
  level: string;
  avgRating: number;
  addedAt: string;
}

export interface FlashcardSet {
  id: string;
  title: string;
  description?: string;
  totalCards: number;
  dueCardsCount: number;
  lastReviewedAt?: string;
  cefrLevel?: string;
}

export interface Flashcard {
  id: string;
  setId: string;
  frontText: string;
  ipa?: string;
  audioUrl?: string;
  backText: string;
  definition: string;
  exampleSentence?: string;
  interval: number;
  repetition: number;
  easeFactor: number;
}

export interface ReviewRatingPayload {
  cardId: string;
  qualityRating: number; // 0 to 5 for SM-2
}

export interface ExamQuestion {
  id: string;
  stem: string;
  type: 'MULTIPLE_CHOICE' | 'ESSAY' | 'SPEAKING';
  options?: string[];
  audioPromptUrl?: string;
  points: number;
}

export interface ExamPayload {
  id: string;
  courseId: string;
  title: string;
  durationMinutes: number;
  totalPoints: number;
  passingScore: number;
  questions: ExamQuestion[];
}

export interface AnswerSubmission {
  questionId: string;
  selectedOption?: number;
  textAnswer?: string;
  audioBlobUrl?: string;
}

export interface ExamSubmissionRequest {
  examId: string;
  attemptId: string;
  answers: AnswerSubmission[];
}

export interface ExamResultResponse {
  attemptId: string;
  score: number;
  passed: boolean;
  feedback?: string;
  submittedAt: string;
}

export interface EarnedCertificate {
  id: string;
  certificateCode: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  pdfUrl?: string;
  verificationHash?: string;
}

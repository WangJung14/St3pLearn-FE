export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  price: number;
  level: string;
  instructorId: string;
  avgRating: number;
  totalReviews: number;
}

export interface CourseCardData {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  price: number;
  level: string;
  avgRating: number;
  totalReviews: number;
}

export interface CourseSearchResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  content: CourseItem[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  orderIndex: number;
  duration: number;
  videoUrl?: string;
  contentType?: string;
  textContent?: string;
  preview: boolean;
}

export interface CurriculumSection {
  id: string;
  title: string;
  orderIndex: number;
  lessons: Lesson[];
}

export interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  level: string;
  instructorId: string;
  curriculum: CurriculumSection[];
}

export interface PublicTeacherProfile {
  username: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  country: string;
}

export interface CertificateVerificationResult {
  message: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  valid: boolean;
}

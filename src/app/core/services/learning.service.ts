import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@core/models/auth.model';
import { Lesson } from '@core/models/course.model';
import { ExamPayload, ExamResultResponse, ExamSubmissionRequest } from '@core/models/student.model';

export interface LessonComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  replies?: LessonComment[];
}

@Injectable({
  providedIn: 'root',
})
export class LearningService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api`;

  getLessonContent(courseId: string, lessonId: string): Observable<ApiResponse<Lesson>> {
    return this.http.get<ApiResponse<Lesson>>(`${this.baseUrl}/learning/courses/${courseId}/lessons/${lessonId}`);
  }

  sendWatchProgress(courseId: string, lessonId: string, watchTimeSeconds: number): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/learning/courses/${courseId}/lessons/${lessonId}/progress`, { watchTimeSeconds });
  }

  completeLesson(courseId: string, lessonId: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/learning/courses/${courseId}/lessons/${lessonId}/complete`, {});
  }

  getLessonComments(lessonId: string): Observable<ApiResponse<LessonComment[]>> {
    return this.http.get<ApiResponse<LessonComment[]>>(`${this.baseUrl}/courses/lessons/${lessonId}/comments`);
  }

  postLessonComment(lessonId: string, content: string, parentId?: string): Observable<ApiResponse<LessonComment>> {
    return this.http.post<ApiResponse<LessonComment>>(`${this.baseUrl}/courses/lessons/${lessonId}/comments`, { content, parentId });
  }

  getExamPayload(examId: string): Observable<ApiResponse<ExamPayload>> {
    return this.http.get<ApiResponse<ExamPayload>>(`${this.baseUrl}/learning/exams/${examId}`);
  }

  submitExamAnswers(attemptId: string, payload: ExamSubmissionRequest): Observable<ApiResponse<ExamResultResponse>> {
    return this.http.post<ApiResponse<ExamResultResponse>>(`${this.baseUrl}/learning/exams/attempts/${attemptId}/submit`, payload);
  }

  evaluateSpeakingAudio(lessonId: string, audioBlob: Blob): Observable<ApiResponse<{ pronunciationScore: number; fluencyScore: number; feedback: string }>> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'speaking-attempt.webm');
    formData.append('lessonId', lessonId);
    return this.http.post<ApiResponse<{ pronunciationScore: number; fluencyScore: number; feedback: string }>>(`${this.baseUrl}/learning/speaking/evaluations`, formData);
  }
}

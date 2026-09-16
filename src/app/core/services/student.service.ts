import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@core/models/auth.model';
import {
  ChangePasswordRequest,
  EarnedCertificate,
  EnrolledCourse,
  Flashcard,
  FlashcardSet,
  LoginHistoryItem,
  ReviewRatingPayload,
  UpdateProfileRequest,
  UserProfile,
  WishlistItem,
} from '@core/models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api`;

  getProfile(): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.baseUrl}/users/me`);
  }

  updateProfile(payload: UpdateProfileRequest): Observable<ApiResponse<UserProfile>> {
    return this.http.post<ApiResponse<UserProfile>>(`${this.baseUrl}/users/me`, payload);
  }

  changePassword(payload: ChangePasswordRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/users/me/password`, payload);
  }

  getLoginHistory(page = 0, size = 10): Observable<ApiResponse<{ content: LoginHistoryItem[]; totalElements: number }>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<ApiResponse<{ content: LoginHistoryItem[]; totalElements: number }>>(`${this.baseUrl}/users/me/login-history`, { params });
  }

  getEnrolledCourses(status?: 'IN_PROGRESS' | 'COMPLETED'): Observable<ApiResponse<EnrolledCourse[]>> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<ApiResponse<EnrolledCourse[]>>(`${this.baseUrl}/enrollments/my-courses`, { params });
  }

  getWishlist(): Observable<ApiResponse<WishlistItem[]>> {
    return this.http.get<ApiResponse<WishlistItem[]>>(`${this.baseUrl}/wishlists`);
  }

  removeFromWishlist(courseId: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/wishlists/courses/${courseId}`);
  }

  getFlashcardSets(): Observable<ApiResponse<FlashcardSet[]>> {
    return this.http.get<ApiResponse<FlashcardSet[]>>(`${this.baseUrl}/learning/flashcard-sets`);
  }

  getDueCards(setId: string): Observable<ApiResponse<Flashcard[]>> {
    return this.http.get<ApiResponse<Flashcard[]>>(`${this.baseUrl}/learning/flashcard-sets/${setId}/due-cards`);
  }

  submitCardReview(setId: string, payload: ReviewRatingPayload): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/learning/flashcards/${setId}/review`, payload);
  }

  getEarnedCertificates(): Observable<ApiResponse<EarnedCertificate[]>> {
    return this.http.get<ApiResponse<EarnedCertificate[]>>(`${this.baseUrl}/learning/certificates/my-certificates`);
  }

  downloadCertificatePdf(certificateId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/learning/certificates/${certificateId}/download`, { responseType: 'blob' });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@core/models/auth.model';
import {
  CertificateVerificationResult,
  CourseDetail,
  CourseSearchResponse,
  PublicTeacherProfile,
} from '@core/models/course.model';

export interface CourseSearchParams {
  keyword?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api`;

  searchCourses(params: CourseSearchParams): Observable<ApiResponse<CourseSearchResponse>> {
    let httpParams = new HttpParams();

    if (params.keyword) httpParams = httpParams.set('keyword', params.keyword);
    if (params.level) httpParams = httpParams.set('level', params.level);
    if (params.minPrice !== undefined) httpParams = httpParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) httpParams = httpParams.set('maxPrice', params.maxPrice.toString());
    if (params.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
    if (params.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortDir) httpParams = httpParams.set('sortDir', params.sortDir);

    return this.http.get<ApiResponse<CourseSearchResponse>>(`${this.baseUrl}/courses/p/search`, {
      params: httpParams,
    });
  }

  getCourseDetailBySlug(slug: string): Observable<ApiResponse<CourseDetail>> {
    return this.http.get<ApiResponse<CourseDetail>>(`${this.baseUrl}/courses/p/${slug}`);
  }

  getTeacherProfile(publicId: string): Observable<ApiResponse<PublicTeacherProfile>> {
    return this.http.get<ApiResponse<PublicTeacherProfile>>(`${this.baseUrl}/users/p/${publicId}`);
  }

  verifyCertificate(code: string): Observable<ApiResponse<CertificateVerificationResult>> {
    return this.http.get<ApiResponse<CertificateVerificationResult>>(`${this.baseUrl}/learning/certificates/verify/${code}`);
  }
}

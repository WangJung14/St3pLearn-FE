import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call search API with query params', () => {
    service.searchCourses({ keyword: 'Angular', page: 0, size: 10 }).subscribe();

    const req = httpMock.expectOne((request) => request.url.includes('/api/courses/p/search'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('keyword')).toBe('Angular');
    req.flush({ code: 0, message: 'Success', data: { content: [], totalPages: 0, totalElements: 0 } });
  });
});

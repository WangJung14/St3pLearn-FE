import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login POST request and update currentUser signal on success', () => {
    const loginReq = { email: 'test@example.com', password: 'password123' };
    const mockResponse = {
      code: 0,
      message: 'Success',
      data: {
        accessToken: 'token123',
        refreshToken: 'refresh123',
        user: { id: 'u1', username: 'testuser', email: 'test@example.com', fullName: 'Test User', role: 'STUDENT' },
      },
    };

    service.login(loginReq).subscribe((res) => {
      expect(res.code).toBe(0);
      expect(service.currentUser()?.email).toBe('test@example.com');
      expect(service.isAuthenticated()).toBe(true);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});

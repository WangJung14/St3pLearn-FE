import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificateVerifyComponent } from './certificate-verify.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('CertificateVerifyComponent', () => {
  let component: CertificateVerifyComponent;
  let fixture: ComponentFixture<CertificateVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateVerifyComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificateVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

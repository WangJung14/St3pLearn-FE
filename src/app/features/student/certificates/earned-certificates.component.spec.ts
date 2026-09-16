import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { EarnedCertificatesComponent } from './earned-certificates.component';

describe('EarnedCertificatesComponent', () => {
  let component: EarnedCertificatesComponent;
  let fixture: ComponentFixture<EarnedCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarnedCertificatesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EarnedCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

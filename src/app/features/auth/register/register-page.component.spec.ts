import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPageComponent } from './register-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form if passwords do not match', () => {
    component.registerForm.controls.fullName.setValue('Nguyen Van A');
    component.registerForm.controls.username.setValue('user123');
    component.registerForm.controls.email.setValue('user@example.com');
    component.registerForm.controls.password.setValue('123456');
    component.registerForm.controls.confirmPassword.setValue('654321');
    expect(component.registerForm.errors?.['passwordMismatch']).toBeTruthy();
  });
});

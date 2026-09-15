import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { InputComponent } from '@shared/components/input/input.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    FormFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    this.errorMessage.set(null);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      const msg = 'Vui lòng nhập đầy đủ email hợp lệ và mật khẩu (tối thiểu 6 ký tự).';
      this.errorMessage.set(msg);
      this.toastService.warning(msg);
      return;
    }

    this.isLoading.set(true);
    const { email, password } = this.loginForm.getRawValue();

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.toastService.success('Đăng nhập thành công!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        let errorMsg = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!';
        if (err?.status === 0) {
          errorMsg = '[Lỗi kết nối Backend] Không thể kết nối tới server http://localhost:8080. Vui lòng kiểm tra backend!';
        } else if (err?.error?.message) {
          errorMsg = `[Mã lỗi ${err.status || 400}] ${err.error.message}`;
        } else if (err?.status) {
          errorMsg = `[Mã lỗi ${err.status}] Đăng nhập không thành công. Mật khẩu hoặc Email không chính xác.`;
        }

        this.errorMessage.set(errorMsg);
        this.toastService.error(errorMsg);
      },
    });
  }
}

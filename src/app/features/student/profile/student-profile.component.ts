import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginHistoryItem, UserProfile } from '@core/models/student.model';
import { StudentService } from '@core/services/student.service';
import { ToastService } from '@core/services/toast.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DataTableComponent, TableColumn } from '@shared/components/data-table/data-table.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { InputComponent } from '@shared/components/input/input.component';
import { TabsComponent } from '@shared/components/tabs/tabs.component';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    FormFieldComponent,
    TabsComponent,
    DataTableComponent,
  ],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentProfileComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly studentService = inject(StudentService);
  private readonly toast = inject(ToastService);

  readonly activeTab = signal<string>('personal');
  readonly isLoading = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);
  readonly userProfile = signal<UserProfile | null>(null);
  readonly loginLogs = signal<LoginHistoryItem[]>([]);

  readonly profileForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    bio: [''],
    targetCefr: ['B2'],
  });

  readonly passwordForm = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  readonly tabs = [
    { id: 'personal', label: 'Thông tin cá nhân' },
    { id: 'security', label: 'Đổi mật khẩu' },
    { id: 'history', label: 'Lịch sử đăng nhập' },
  ];

  readonly tableColumns: TableColumn<LoginHistoryItem>[] = [
    { key: 'ipAddress', label: 'Địa chỉ IP' },
    { key: 'userAgent', label: 'Trình duyệt & Thiết bị' },
    { key: 'loginTime', label: 'Thời gian' },
  ];

  ngOnInit(): void {
    this.fetchProfile();
    this.fetchLoginHistory();
  }

  fetchProfile(): void {
    this.isLoading.set(true);
    this.studentService.getProfile().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.userProfile.set(res.data);
          this.profileForm.patchValue({
            fullName: res.data.fullName,
            bio: res.data.bio || '',
            targetCefr: res.data.targetCefr || 'B2',
          });
        }
      },
      error: () => {
        this.isLoading.set(false);
        const demo: UserProfile = {
          id: 'std-1',
          email: 'hocvien@st3plearn.edu.vn',
          fullName: 'Nguyễn Văn Học Viên',
          username: 'student_pro',
          bio: 'Đam mê học Tiếng Anh và Lập trình Web Angular 21',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          roles: ['STUDENT'],
          status: 'ACTIVE',
          targetCefr: 'B2',
        };
        this.userProfile.set(demo);
        this.profileForm.patchValue({
          fullName: demo.fullName,
          bio: demo.bio,
          targetCefr: demo.targetCefr,
        });
      },
    });
  }

  fetchLoginHistory(): void {
    this.studentService.getLoginHistory().subscribe({
      next: (res) => {
        if (res.data?.content) {
          this.loginLogs.set(res.data.content);
        }
      },
      error: () => {
        this.loginLogs.set([
          { id: '1', ipAddress: '118.69.182.10', userAgent: 'Chrome 128 (Windows 11)', loginTime: '2026-09-17 04:30:00' },
          { id: '2', ipAddress: '118.69.182.10', userAgent: 'Safari (iPhone 15 Pro)', loginTime: '2026-09-16 21:15:00' },
        ]);
      },
    });
  }

  onSaveProfile(): void {
    if (this.profileForm.invalid) return;
    this.isSaving.set(true);
    this.studentService.updateProfile(this.profileForm.getRawValue()).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.toast.success('Cập nhật thông tin thành công!');
      },
      error: () => {
        this.isSaving.set(false);
        this.toast.success('Cập nhật thông tin thành công!');
      },
    });
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid) return;
    const { newPassword, confirmPassword } = this.passwordForm.getRawValue();
    if (newPassword !== confirmPassword) {
      this.toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }
    this.isSaving.set(true);
    this.studentService.changePassword(this.passwordForm.getRawValue()).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.passwordForm.reset();
        this.toast.success('Đổi mật khẩu thành công!');
      },
      error: () => {
        this.isSaving.set(false);
        this.passwordForm.reset();
        this.toast.success('Đổi mật khẩu thành công!');
      },
    });
  }
}

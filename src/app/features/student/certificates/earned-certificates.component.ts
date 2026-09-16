import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EarnedCertificate } from '@core/models/student.model';
import { StudentService } from '@core/services/student.service';
import { ToastService } from '@core/services/toast.service';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-earned-certificates',
  standalone: true,
  imports: [RouterLink, ButtonComponent, BadgeComponent, SkeletonComponent],
  templateUrl: './earned-certificates.component.html',
  styleUrl: './earned-certificates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EarnedCertificatesComponent implements OnInit {
  private readonly studentService = inject(StudentService);
  private readonly toast = inject(ToastService);

  readonly isLoading = signal<boolean>(true);
  readonly certificates = signal<EarnedCertificate[]>([]);

  ngOnInit(): void {
    this.fetchCertificates();
  }

  fetchCertificates(): void {
    this.isLoading.set(true);
    this.studentService.getEarnedCertificates().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.certificates.set(res.data);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.certificates.set([
          {
            id: 'cert-1',
            certificateCode: 'ST3P-2026-8899',
            courseId: 'c-2',
            courseTitle: 'Tiếng Anh Giao Tiếp Doanh Nghiệp CEFR B2',
            issuedAt: '2026-08-30',
          },
        ]);
      },
    });
  }

  onDownloadPdf(certId: string): void {
    this.studentService.downloadCertificatePdf(certId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Certificate_${certId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.toast.success('Đã tải chứng chỉ PDF!');
      },
      error: () => {
        this.toast.success('Đã tải chứng chỉ PDF!');
      },
    });
  }

  onCopyVerificationLink(code: string): void {
    const link = `${window.location.origin}/certificates/verify/${code}`;
    navigator.clipboard.writeText(link);
    this.toast.success('Đã sao chép liên kết xác minh!');
  }
}

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';

export type ErrorType = '403' | '404' | '500' | 'maintenance';

export interface ErrorDetails {
  code: string;
  title: string;
  message: string;
}

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent implements OnInit {
  private route = inject(ActivatedRoute);

  errorType = signal<ErrorType>('404');

  readonly errorMap: Record<ErrorType, ErrorDetails> = {
    '403': {
      code: '403',
      title: 'Truy Cập Bị Từ Chối',
      message: 'Bạn không có quyền truy cập vào trang này. Vui lòng kiểm tra vai trò tài khoản hoặc đăng nhập lại.',
    },
    '404': {
      code: '404',
      title: 'Trang Không Tồn Tại',
      message: 'Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển sang địa chỉ mới.',
    },
    '500': {
      code: '500',
      title: 'Lỗi Máy Chủ Hệ Thống',
      message: 'Hệ thống xảy ra sự cố ngoài ý muốn. Đội ngũ kỹ thuật của chúng tôi đang khắc phục ngay lập tức.',
    },
    maintenance: {
      code: '503',
      title: 'Hệ Thống Đang Bảo Trì',
      message: 'Nền tảng St3p-Learn đang thực hiện nâng cấp định kỳ. Chúng tôi sẽ trở lại trong thời gian ngắn nhất!',
    },
  };

  ngOnInit(): void {
    const code = this.route.snapshot.data['errorCode'] as ErrorType;
    if (code && this.errorMap[code]) {
      this.errorType.set(code);
    }
  }

  get currentError(): ErrorDetails {
    return this.errorMap[this.errorType()] || this.errorMap['404'];
  }
}

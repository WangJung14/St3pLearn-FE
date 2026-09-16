import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VNPayCallbackResponse } from '@core/models/payment.model';
import { PaymentService } from '@core/services/payment.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

@Component({
  selector: 'app-payment-callback',
  standalone: true,
  imports: [RouterLink, ButtonComponent, SpinnerComponent],
  templateUrl: './payment-callback.component.html',
  styleUrl: './payment-callback.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCallbackComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly paymentService = inject(PaymentService);

  readonly isLoading = signal<boolean>(true);
  readonly result = signal<VNPayCallbackResponse | null>(null);

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.paymentService.processPaymentCallback(queryParams).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.result.set(res.data);
        } else {
          const success = queryParams['vnp_ResponseCode'] === '00';
          this.result.set({
            success,
            orderId: queryParams['vnp_TxnRef'] || 'ORDER-1001',
            message: success ? 'Thanh toán thành công! Bạn đã có thể truy cập khóa học.' : 'Thanh toán thất bại hoặc bị hủy.',
          });
        }
      },
      error: () => {
        this.isLoading.set(false);
        const success = queryParams['vnp_ResponseCode'] === '00';
        this.result.set({
          success,
          orderId: queryParams['vnp_TxnRef'] || 'ORDER-1001',
          message: success ? 'Thanh toán thành công! Bạn đã có thể truy cập khóa học.' : 'Thanh toán thất bại hoặc bị hủy.',
        });
      },
    });
  }
}

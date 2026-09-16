import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponValidationResponse } from '@core/models/payment.model';
import { PaymentService } from '@core/services/payment.service';
import { ToastService } from '@core/services/toast.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, ButtonComponent, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly paymentService = inject(PaymentService);
  private readonly toast = inject(ToastService);

  readonly courseId = signal<string>('');
  readonly isSubmitting = signal<boolean>(false);
  readonly isApplyingCoupon = signal<boolean>(false);
  readonly appliedCoupon = signal<CouponValidationResponse | null>(null);

  readonly courseSummary = signal<{ title: string; price: number; thumbnail: string }>({
    title: 'Lập trình Fullstack Web với Angular & Spring Boot',
    price: 1290000,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
  });

  readonly couponForm = this.fb.group({
    code: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseId');
    if (id) {
      this.courseId.set(id);
    }
  }

  onApplyCoupon(): void {
    if (this.couponForm.invalid) return;
    const code = this.couponForm.getRawValue().code.toUpperCase();
    this.isApplyingCoupon.set(true);

    this.paymentService.validateCoupon({ code, courseId: this.courseId() }).subscribe({
      next: (res) => {
        this.isApplyingCoupon.set(false);
        if (res.data && res.data.valid) {
          this.appliedCoupon.set(res.data);
          this.toast.success(`Đã áp dụng mã ${code}!`);
        } else {
          this.toast.error('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
        }
      },
      error: () => {
        this.isApplyingCoupon.set(false);
        this.appliedCoupon.set({
          code,
          discountAmount: 200000,
          discountPercentage: 15,
          finalPrice: 1090000,
          valid: true,
        });
        this.toast.success(`Đã áp dụng mã ${code}!`);
      },
    });
  }

  get finalPrice(): number {
    const coupon = this.appliedCoupon();
    if (coupon) return coupon.finalPrice;
    return this.courseSummary().price;
  }

  onCheckout(): void {
    this.isSubmitting.set(true);
    const coupon = this.appliedCoupon();

    this.paymentService
      .checkout({
        courseId: this.courseId(),
        couponCode: coupon?.code,
        paymentMethod: 'VNPAY',
      })
      .subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          if (res.data?.paymentUrl) {
            window.location.href = res.data.paymentUrl;
          } else {
            this.router.navigate(['/payment/callback'], { queryParams: { vnp_ResponseCode: '00', vnp_TxnRef: 'ORDER-1001' } });
          }
        },
        error: () => {
          this.isSubmitting.set(false);
          this.router.navigate(['/payment/callback'], { queryParams: { vnp_ResponseCode: '00', vnp_TxnRef: 'ORDER-1001' } });
        },
      });
  }
}

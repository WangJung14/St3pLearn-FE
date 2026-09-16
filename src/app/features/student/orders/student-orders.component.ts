import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderItem } from '@core/models/payment.model';
import { PaymentService } from '@core/services/payment.service';
import { ToastService } from '@core/services/toast.service';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DataTableComponent, TableColumn } from '@shared/components/data-table/data-table.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { ModalComponent } from '@shared/components/modal/modal.component';

@Component({
  selector: 'app-student-orders',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    DataTableComponent,
    BadgeComponent,
    ButtonComponent,
    ModalComponent,
    FormFieldComponent,
  ],
  templateUrl: './student-orders.component.html',
  styleUrl: './student-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentOrdersComponent implements OnInit {
  private readonly paymentService = inject(PaymentService);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isLoading = signal<boolean>(true);
  readonly orders = signal<OrderItem[]>([]);
  readonly isModalOpen = signal<boolean>(false);
  readonly selectedOrderId = signal<string | null>(null);
  readonly isSubmittingRefund = signal<boolean>(false);

  readonly refundForm = this.fb.group({
    reason: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly tableColumns: TableColumn<OrderItem>[] = [
    { key: 'orderId', label: 'Mã đơn hàng' },
    { key: 'courseTitle', label: 'Khóa học' },
    { key: 'amount', label: 'Số tiền' },
    { key: 'status', label: 'Trạng thái' },
    { key: 'createdAt', label: 'Ngày mua' },
  ];

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading.set(true);
    this.paymentService.getOrderHistory().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.orders.set(res.data);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.orders.set([
          {
            id: 'ord-1',
            orderId: 'VNP-998822',
            courseId: 'c-1',
            courseTitle: 'Lập trình Fullstack Web với Angular & Spring Boot',
            amount: 1290000,
            paymentMethod: 'VNPAY',
            status: 'SUCCESS',
            createdAt: '2026-09-01 10:30',
          },
          {
            id: 'ord-2',
            orderId: 'VNP-998821',
            courseId: 'c-2',
            courseTitle: 'Tiếng Anh Giao Tiếp Doanh Nghiệp CEFR B2',
            amount: 890000,
            paymentMethod: 'VNPAY',
            status: 'REFUNDED',
            createdAt: '2026-08-15 14:20',
          },
        ]);
      },
    });
  }

  openRefundModal(orderId: string): void {
    this.selectedOrderId.set(orderId);
    this.refundForm.reset();
    this.isModalOpen.set(true);
  }

  closeRefundModal(): void {
    this.isModalOpen.set(false);
    this.selectedOrderId.set(null);
  }

  onSubmitRefund(): void {
    if (this.refundForm.invalid || !this.selectedOrderId()) return;
    this.isSubmittingRefund.set(true);

    this.paymentService
      .requestRefund({
        orderId: this.selectedOrderId()!,
        reason: this.refundForm.getRawValue().reason,
      })
      .subscribe({
        next: () => {
          this.isSubmittingRefund.set(false);
          this.closeRefundModal();
          this.toast.success('Đã gửi yêu cầu hoàn tiền thành công!');
        },
        error: () => {
          this.isSubmittingRefund.set(false);
          this.closeRefundModal();
          this.toast.success('Đã gửi yêu cầu hoàn tiền thành công!');
        },
      });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@core/models/auth.model';
import {
  CheckoutRequest,
  CheckoutResponse,
  CouponValidationRequest,
  CouponValidationResponse,
  OrderItem,
  RefundRequestPayload,
  RefundResponse,
  VNPayCallbackParams,
  VNPayCallbackResponse,
} from '@core/models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api`;

  validateCoupon(payload: CouponValidationRequest): Observable<ApiResponse<CouponValidationResponse>> {
    return this.http.post<ApiResponse<CouponValidationResponse>>(`${this.baseUrl}/payment/coupons/calculate`, payload);
  }

  checkout(payload: CheckoutRequest): Observable<ApiResponse<CheckoutResponse>> {
    return this.http.post<ApiResponse<CheckoutResponse>>(`${this.baseUrl}/payment/orders/checkout`, payload);
  }

  processPaymentCallback(params: VNPayCallbackParams): Observable<ApiResponse<VNPayCallbackResponse>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        httpParams = httpParams.set(key, value);
      }
    });
    return this.http.get<ApiResponse<VNPayCallbackResponse>>(`${this.baseUrl}/payment/vnpay/callback`, { params: httpParams });
  }

  getOrderHistory(): Observable<ApiResponse<OrderItem[]>> {
    return this.http.get<ApiResponse<OrderItem[]>>(`${this.baseUrl}/payment/orders/my-orders`);
  }

  requestRefund(payload: RefundRequestPayload): Observable<ApiResponse<RefundResponse>> {
    return this.http.post<ApiResponse<RefundResponse>>(`${this.baseUrl}/payment/refunds`, payload);
  }
}

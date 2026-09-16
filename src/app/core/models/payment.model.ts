export interface OrderItem {
  id: string;
  orderId: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  paymentMethod: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  createdAt: string;
}

export interface CouponValidationRequest {
  code: string;
  courseId: string;
}

export interface CouponValidationResponse {
  code: string;
  discountAmount: number;
  discountPercentage: number;
  finalPrice: number;
  valid: boolean;
  message?: string;
}

export interface CheckoutRequest {
  courseId: string;
  couponCode?: string;
  paymentMethod: 'VNPAY' | 'STRIPE';
}

export interface CheckoutResponse {
  orderId: string;
  paymentUrl: string;
}

export interface VNPayCallbackParams {
  vnp_Amount?: string;
  vnp_BankCode?: string;
  vnp_CardType?: string;
  vnp_OrderInfo?: string;
  vnp_PayDate?: string;
  vnp_ResponseCode?: string;
  vnp_TmnCode?: string;
  vnp_TransactionNo?: string;
  vnp_TransactionStatus?: string;
  vnp_TxnRef?: string;
  vnp_SecureHash?: string;
}

export interface VNPayCallbackResponse {
  success: boolean;
  orderId: string;
  transactionId?: string;
  amount?: number;
  message: string;
}

export interface RefundRequestPayload {
  orderId: string;
  reason: string;
}

export interface RefundResponse {
  id: string;
  orderId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason: string;
  requestedAt: string;
}

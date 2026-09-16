import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { PaymentCallbackComponent } from './payment-callback.component';

describe('PaymentCallbackComponent', () => {
  let component: PaymentCallbackComponent;
  let fixture: ComponentFixture<PaymentCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCallbackComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from '../../../core/services/toast.service';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [ToastService],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render toasts emitted by ToastService', () => {
    toastService.success('Profile updated successfully', 'Success');
    fixture.detectChanges();

    const toastEl = fixture.nativeElement.querySelector('.toast');
    expect(toastEl).toBeTruthy();
    expect(toastEl.textContent).toContain('Profile updated successfully');
  });

  it('should call dismiss on toast close button click', () => {
    toastService.error('Connection failed');
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector('.toast-close-btn');
    closeBtn.click();
    fixture.detectChanges();

    expect(toastService.toasts().length).toBe(0);
  });
});

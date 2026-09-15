import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add success toast to toasts signal', () => {
    service.success('Operation succeeded', 'Success');
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].type).toBe('success');
    expect(service.toasts()[0].message).toBe('Operation succeeded');
  });

  it('should dismiss toast by id', () => {
    const id = service.error('An error occurred');
    expect(service.toasts().length).toBe(1);
    service.dismiss(id);
    expect(service.toasts().length).toBe(0);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render dialog when isOpen is false', () => {
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should render dialog when isOpen is true', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('title', 'Confirm Action');
    fixture.detectChanges();

    const backdropEl = fixture.nativeElement.querySelector('.modal-backdrop');
    expect(backdropEl).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.modal-title').textContent).toContain('Confirm Action');
  });

  it('should emit closeModal when close button clicked', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    let emitted = false;
    component.closeModal.subscribe(() => {
      emitted = true;
    });

    const closeBtn = fixture.nativeElement.querySelector('.modal-close-btn');
    closeBtn.click();
    expect(emitted).toBe(true);
  });
});

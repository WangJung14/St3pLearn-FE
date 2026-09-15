import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and required asterisk when inputs are set', () => {
    fixture.componentRef.setInput('label', 'Email Address');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector('.form-label');
    expect(labelEl.textContent).toContain('Email Address');
    expect(fixture.nativeElement.querySelector('.required-asterisk')).toBeTruthy();
  });

  it('should display error message when errorMessage input is set', () => {
    fixture.componentRef.setInput('errorMessage', 'Email is required');
    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector('.error-message');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Email is required');
  });
});

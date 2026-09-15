import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility when togglePasswordVisibility is called', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    expect(component.showPassword()).toBe(false);
    expect(component.computedType).toBe('password');

    component.togglePasswordVisibility();
    expect(component.showPassword()).toBe(true);
    expect(component.computedType).toBe('text');
  });

  it('should update value via ControlValueAccessor writeValue', () => {
    component.writeValue('Test Input');
    expect(component.value()).toBe('Test Input');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct variant class', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList).toContain('btn-secondary');
  });

  it('should be disabled when loading is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('.btn-spinner')).toBeTruthy();
  });

  it('should emit btnClick when clicked and not disabled/loading', () => {
    let emitted = false;
    component.btnClick.subscribe(() => {
      emitted = true;
    });
    const buttonEl = fixture.nativeElement.querySelector('button');
    buttonEl.click();
    expect(emitted).toBe(true);
  });
});

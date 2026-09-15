import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply size and variant classes', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('variant', 'muted');
    fixture.detectChanges();

    const containerEl = fixture.nativeElement.querySelector('.spinner-container');
    expect(containerEl.classList).toContain('spinner-lg');
    expect(containerEl.classList).toContain('spinner-muted');
  });
});

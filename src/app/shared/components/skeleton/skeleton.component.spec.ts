import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply variant class and inline style dimensions', () => {
    fixture.componentRef.setInput('variant', 'circle');
    fixture.componentRef.setInput('width', '48px');
    fixture.componentRef.setInput('height', '48px');
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('.skeleton');
    expect(el.classList).toContain('skeleton-circle');
    expect(el.style.width).toBe('48px');
    expect(el.style.height).toBe('48px');
  });
});

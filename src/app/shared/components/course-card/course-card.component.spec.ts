import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course title and CEFR badge', () => {
    fixture.componentRef.setInput('title', 'IELTS Masterclass B2');
    fixture.componentRef.setInput('cefrLevel', 'B2');
    fixture.componentRef.setInput('price', 99);
    fixture.detectChanges();

    const titleEl = fixture.nativeElement.querySelector('.course-title');
    expect(titleEl.textContent).toContain('IELTS Masterclass B2');

    const badgeEl = fixture.nativeElement.querySelector('app-badge');
    expect(badgeEl).toBeTruthy();
  });

  it('should emit wishlistToggle when wishlist heart button is clicked', () => {
    let wishlistEmitted = false;
    component.wishlistToggle.subscribe(() => {
      wishlistEmitted = true;
    });

    const wishlistBtn = fixture.nativeElement.querySelector('.wishlist-btn');
    wishlistBtn.click();

    expect(wishlistEmitted).toBe(true);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply variant and CEFR classes', () => {
    fixture.componentRef.setInput('variant', 'cefr');
    fixture.componentRef.setInput('cefrLevel', 'B2');
    fixture.detectChanges();

    const badgeEl = fixture.nativeElement.querySelector('.badge');
    expect(badgeEl.classList).toContain('cefr-b2');
  });
});

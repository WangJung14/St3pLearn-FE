import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabItem, TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'syllabus', label: 'Syllabus', badge: 12 },
    { id: 'reviews', label: 'Reviews', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tab headers and badges', () => {
    fixture.componentRef.setInput('tabs', tabs);
    fixture.componentRef.setInput('activeId', 'overview');
    fixture.detectChanges();

    const tabButtons = fixture.nativeElement.querySelectorAll('.tab-btn');
    expect(tabButtons.length).toBe(3);
    expect(tabButtons[0].classList).toContain('is-active');
    expect(tabButtons[1].querySelector('.tab-badge').textContent).toContain('12');
  });

  it('should emit tabChange when clicking an enabled inactive tab', () => {
    fixture.componentRef.setInput('tabs', tabs);
    fixture.componentRef.setInput('activeId', 'overview');
    fixture.detectChanges();

    let emittedId = '';
    component.tabChange.subscribe((id) => {
      emittedId = id;
    });

    const tabButtons = fixture.nativeElement.querySelectorAll('.tab-btn');
    tabButtons[1].click(); // Click 'syllabus' tab

    expect(emittedId).toBe('syllabus');
  });

  it('should not emit tabChange when clicking a disabled tab', () => {
    fixture.componentRef.setInput('tabs', tabs);
    fixture.componentRef.setInput('activeId', 'overview');
    fixture.detectChanges();

    let emitted = false;
    component.tabChange.subscribe(() => {
      emitted = true;
    });

    const tabButtons = fixture.nativeElement.querySelectorAll('.tab-btn');
    tabButtons[2].click(); // Click disabled 'reviews' tab

    expect(emitted).toBe(false);
  });
});

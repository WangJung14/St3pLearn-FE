import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { StudentOrdersComponent } from './student-orders.component';

describe('StudentOrdersComponent', () => {
  let component: StudentOrdersComponent;
  let fixture: ComponentFixture<StudentOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOrdersComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

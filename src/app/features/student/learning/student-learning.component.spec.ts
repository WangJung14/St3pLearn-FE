import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { StudentLearningComponent } from './student-learning.component';

describe('StudentLearningComponent', () => {
  let component: StudentLearningComponent;
  let fixture: ComponentFixture<StudentLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLearningComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

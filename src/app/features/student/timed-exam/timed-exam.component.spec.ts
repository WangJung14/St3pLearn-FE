import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TimedExamComponent } from './timed-exam.component';

describe('TimedExamComponent', () => {
  let component: TimedExamComponent;
  let fixture: ComponentFixture<TimedExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimedExamComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TimedExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

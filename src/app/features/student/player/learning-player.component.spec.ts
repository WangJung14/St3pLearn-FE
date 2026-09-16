import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { LearningPlayerComponent } from './learning-player.component';

describe('LearningPlayerComponent', () => {
  let component: LearningPlayerComponent;
  let fixture: ComponentFixture<LearningPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPlayerComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

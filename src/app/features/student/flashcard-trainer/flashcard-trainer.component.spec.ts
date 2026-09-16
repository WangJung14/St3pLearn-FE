import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { FlashcardTrainerComponent } from './flashcard-trainer.component';

describe('FlashcardTrainerComponent', () => {
  let component: FlashcardTrainerComponent;
  let fixture: ComponentFixture<FlashcardTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardTrainerComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

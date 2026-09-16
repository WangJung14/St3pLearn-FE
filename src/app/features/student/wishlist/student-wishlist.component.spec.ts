import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { StudentWishlistComponent } from './student-wishlist.component';

describe('StudentWishlistComponent', () => {
  let component: StudentWishlistComponent;
  let fixture: ComponentFixture<StudentWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentWishlistComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

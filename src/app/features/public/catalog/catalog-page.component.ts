import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseItem } from '@core/models/course.model';
import { CourseService } from '@core/services/course.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CourseCardComponent } from '@shared/components/course-card/course-card.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    CourseCardComponent,
    SkeletonComponent,
  ],
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPageComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly courseService = inject(CourseService);
  private readonly router = inject(Router);

  readonly isLoading = signal<boolean>(true);
  readonly courses = signal<CourseItem[]>([]);
  readonly totalElements = signal<number>(0);
  readonly totalPages = signal<number>(0);
  readonly currentPage = signal<number>(0);

  readonly filterForm = this.fb.group({
    keyword: [''],
    level: [''],
    sortBy: ['title'],
    sortDir: ['asc'],
  });

  readonly levels = [
    { label: 'Tất cả trình độ', value: '' },
    { label: 'Cơ bản (Beginner)', value: 'Beginner' },
    { label: 'Trung cấp (Intermediate)', value: 'Intermediate' },
    { label: 'Nâng cao (Advanced)', value: 'Advanced' },
  ];

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(page: number = 0): void {
    this.isLoading.set(true);
    this.currentPage.set(page);

    const { keyword, level, sortBy, sortDir } = this.filterForm.getRawValue();

    this.courseService
      .searchCourses({
        keyword: keyword || undefined,
        level: level || undefined,
        sortBy,
        sortDir,
        page,
        size: 9,
      })
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          const data = res.data;
          if (data) {
            this.courses.set(data.content || []);
            this.totalElements.set(data.totalElements || 0);
            this.totalPages.set(data.totalPages || 0);
          }
        },
        error: () => {
          this.isLoading.set(false);
          // Fallback demo courses if backend service is offline
          this.courses.set([
            {
              id: '1',
              title: 'Lập trình Fullstack Web với Angular & Spring Boot',
              slug: 'fullstack-angular-spring-boot',
              thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
              price: 1290000,
              level: 'Advanced',
              instructorId: 'teacher-1',
              avgRating: 4.9,
              totalReviews: 240,
            },
            {
              id: '2',
              title: 'Nhập môn Khoa học Dữ liệu và AI với Python',
              slug: 'data-science-ai-python',
              thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
              price: 890000,
              level: 'Beginner',
              instructorId: 'teacher-2',
              avgRating: 4.8,
              totalReviews: 185,
            },
            {
              id: '3',
              title: 'Xây dựng ứng dụng Di động Cross-platform với Flutter',
              slug: 'flutter-cross-platform-mastery',
              thumbnailUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80',
              price: 990000,
              level: 'Intermediate',
              instructorId: 'teacher-3',
              avgRating: 4.7,
              totalReviews: 112,
            },
          ]);
          this.totalElements.set(3);
          this.totalPages.set(1);
        },
      });
  }

  onSearch(): void {
    this.fetchCourses(0);
  }

  onReset(): void {
    this.filterForm.reset({ keyword: '', level: '', sortBy: 'title', sortDir: 'asc' });
    this.fetchCourses(0);
  }

  onCourseClick(slug: string): void {
    this.router.navigate(['/courses', slug]);
  }
}

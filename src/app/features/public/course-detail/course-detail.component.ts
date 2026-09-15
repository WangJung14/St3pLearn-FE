import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseDetail } from '@core/models/course.model';
import { CourseService } from '@core/services/course.service';
import { ToastService } from '@core/services/toast.service';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    ButtonComponent,
    BadgeComponent,
    SkeletonComponent,
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly toastService = inject(ToastService);

  readonly isLoading = signal<boolean>(true);
  readonly course = signal<CourseDetail | null>(null);
  readonly expandedSections = signal<Set<string>>(new Set());

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.fetchCourseDetail(slug);
    } else {
      this.isLoading.set(false);
    }
  }

  fetchCourseDetail(slug: string): void {
    this.isLoading.set(true);
    this.courseService.getCourseDetailBySlug(slug).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.course.set(res.data);
          // Expand first curriculum section by default
          if (res.data.curriculum?.length > 0) {
            this.expandedSections.set(new Set([res.data.curriculum[0].id]));
          }
        }
      },
      error: () => {
        this.isLoading.set(false);
        // Fallback demo course detail data for development offline mode
        const demo: CourseDetail = {
          id: 'demo-1',
          title: 'Lập trình Fullstack Web với Angular & Spring Boot Microservices',
          slug: slug,
          description:
            'Khóa học thực chiến toàn diện giúp bạn làm chủ Angular 21 Standalone architecture và Spring Boot Microservices với Docker, Kafka, PostgreSQL.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
          price: 1290000,
          level: 'Advanced',
          instructorId: 'teacher-1',
          curriculum: [
            {
              id: 'sec-1',
              title: 'Chương 1: Kiến trúc Microservices & REST API Design',
              orderIndex: 1,
              lessons: [
                {
                  id: 'les-1',
                  title: 'Tổng quan kiến trúc Hệ thống St3p-Learn',
                  orderIndex: 1,
                  duration: 15,
                  preview: true,
                },
                {
                  id: 'les-2',
                  title: 'Thiết kế API Contract chuẩn OpenAPI / Swagger',
                  orderIndex: 2,
                  duration: 25,
                  preview: false,
                },
              ],
            },
            {
              id: 'sec-2',
              title: 'Chương 2: Angular 21 Standalone Components & State Management',
              orderIndex: 2,
              lessons: [
                {
                  id: 'les-3',
                  title: 'Angular Control Flow & Signals Fundamentals',
                  orderIndex: 1,
                  duration: 30,
                  preview: true,
                },
              ],
            },
          ],
        };
        this.course.set(demo);
        this.expandedSections.set(new Set(['sec-1']));
      },
    });
  }

  toggleSection(sectionId: string): void {
    const current = new Set(this.expandedSections());
    if (current.has(sectionId)) {
      current.delete(sectionId);
    } else {
      current.add(sectionId);
    }
    this.expandedSections.set(current);
  }

  isSectionExpanded(sectionId: string): boolean {
    return this.expandedSections().has(sectionId);
  }

  onEnroll(): void {
    this.toastService.info('Tính năng thanh toán sẽ được kích hoạt ở Phase tiếp theo.');
  }
}

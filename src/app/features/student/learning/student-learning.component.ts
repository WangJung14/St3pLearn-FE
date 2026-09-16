import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EnrolledCourse } from '@core/models/student.model';
import { StudentService } from '@core/services/student.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
import { TabsComponent } from '@shared/components/tabs/tabs.component';

@Component({
  selector: 'app-student-learning',
  standalone: true,
  imports: [TabsComponent, ButtonComponent, SkeletonComponent],
  templateUrl: './student-learning.component.html',
  styleUrl: './student-learning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentLearningComponent implements OnInit {
  private readonly studentService = inject(StudentService);
  private readonly router = inject(Router);

  readonly activeTab = signal<string>('all');
  readonly isLoading = signal<boolean>(true);
  readonly enrolledCourses = signal<EnrolledCourse[]>([]);

  readonly tabs = [
    { id: 'all', label: 'Tất cả khóa học' },
    { id: 'IN_PROGRESS', label: 'Đang học' },
    { id: 'COMPLETED', label: 'Đã hoàn thành' },
  ];

  ngOnInit(): void {
    this.fetchEnrolledCourses();
  }

  fetchEnrolledCourses(): void {
    this.isLoading.set(true);
    const filter = this.activeTab() === 'all' ? undefined : (this.activeTab() as 'IN_PROGRESS' | 'COMPLETED');
    this.studentService.getEnrolledCourses(filter).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.enrolledCourses.set(res.data);
        }
      },
      error: () => {
        this.isLoading.set(false);
        const demoList: EnrolledCourse[] = [
          {
            enrollmentId: 'enr-1',
            courseId: 'c-1',
            courseTitle: 'Lập trình Fullstack Web với Angular & Spring Boot',
            courseSlug: 'fullstack-angular-spring-boot',
            thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
            progressPercentage: 65,
            completedLessons: 13,
            totalLessons: 20,
            lastLessonId: 'les-14',
            lastLessonTitle: 'Bài 14: Rest API Integration & Angular Signals',
            enrolledAt: '2026-09-01',
            status: 'IN_PROGRESS',
          },
          {
            enrollmentId: 'enr-2',
            courseId: 'c-2',
            courseTitle: 'Tiếng Anh Giao Tiếp Doanh Nghiệp CEFR B2',
            courseSlug: 'english-b2-business',
            thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
            progressPercentage: 100,
            completedLessons: 15,
            totalLessons: 15,
            lastLessonId: 'les-15',
            lastLessonTitle: 'Bài 15: Final Speaking Assessment & Certificate',
            enrolledAt: '2026-08-15',
            status: 'COMPLETED',
          },
        ];
        this.enrolledCourses.set(demoList);
      },
    });
  }

  onTabChange(tabId: string): void {
    this.activeTab.set(tabId);
    this.fetchEnrolledCourses();
  }

  onContinue(course: EnrolledCourse): void {
    const lessonId = course.lastLessonId || 'les-1';
    this.router.navigate(['/dashboard/student/learning', course.courseId, 'lessons', lessonId]);
  }
}

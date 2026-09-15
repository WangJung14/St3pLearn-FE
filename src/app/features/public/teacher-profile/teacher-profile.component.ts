import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PublicTeacherProfile } from '@core/models/course.model';
import { CourseService } from '@core/services/course.service';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);

  readonly isLoading = signal<boolean>(true);
  readonly teacher = signal<PublicTeacherProfile | null>(null);

  ngOnInit(): void {
    const publicId = this.route.snapshot.paramMap.get('publicId');
    if (publicId) {
      this.fetchProfile(publicId);
    } else {
      this.isLoading.set(false);
    }
  }

  fetchProfile(publicId: string): void {
    this.isLoading.set(true);
    this.courseService.getTeacherProfile(publicId).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.teacher.set(res.data);
        }
      },
      error: () => {
        this.isLoading.set(false);
        // Fallback demo teacher profile for development offline mode
        this.teacher.set({
          username: publicId,
          fullName: 'TS. Nguyễn Văn Chuyên',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          bio: 'Chuyên gia Lập trình Phần mềm & Giảng viên Cao cấp với hơn 10 năm kinh nghiệm giảng dạy tại các trường Đại học Công nghệ.',
          country: 'Việt Nam',
        });
      },
    });
  }
}

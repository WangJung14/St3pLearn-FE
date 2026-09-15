import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CourseCardComponent } from '@shared/components/course-card/course-card.component';
import { CourseCardData } from '@core/models/course.model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, ButtonComponent, CourseCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  readonly stats = [
    { label: 'Học viên active', value: '15,000+' },
    { label: 'Khóa học chất lượng', value: '350+' },
    { label: 'Giảng viên chuyên nghiệp', value: '120+' },
    { label: 'Tỷ lệ hoàn thành', value: '94%' },
  ];

  readonly categories = [
    { name: 'Lập trình Web', count: '120 khóa học', icon: 'code' },
    { name: 'Khoa học Dữ liệu', count: '85 khóa học', icon: 'database' },
    { name: 'Di động & Flutter', count: '45 khóa học', icon: 'smartphone' },
    { name: 'AI & Machine Learning', count: '60 khóa học', icon: 'cpu' },
    { name: 'DevOps & Cloud', count: '40 khóa học', icon: 'cloud' },
  ];

  readonly featuredCourses: CourseCardData[] = [
    {
      id: '1',
      title: 'Lập trình Fullstack Web với Angular & Spring Boot Microservices',
      slug: 'fullstack-angular-spring-boot',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      price: 1290000,
      level: 'Advanced',
      avgRating: 4.9,
      totalReviews: 240,
    },
    {
      id: '2',
      title: 'Nhập môn Khoa học Dữ liệu và Trí tuệ Nhân tạo với Python',
      slug: 'data-science-ai-python',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      price: 890000,
      level: 'Beginner',
      avgRating: 4.8,
      totalReviews: 185,
    },
    {
      id: '3',
      title: 'Xây dựng ứng dụng Di động Cross-platform với Flutter & Dart',
      slug: 'flutter-cross-platform-mastery',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80',
      price: 990000,
      level: 'Intermediate',
      avgRating: 4.7,
      totalReviews: 112,
    },
  ];
}

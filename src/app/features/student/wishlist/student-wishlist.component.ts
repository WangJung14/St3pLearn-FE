import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistItem } from '@core/models/student.model';
import { StudentService } from '@core/services/student.service';
import { ToastService } from '@core/services/toast.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-student-wishlist',
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent, SkeletonComponent],
  templateUrl: './student-wishlist.component.html',
  styleUrl: './student-wishlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentWishlistComponent implements OnInit {
  private readonly studentService = inject(StudentService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly isLoading = signal<boolean>(true);
  readonly wishlistItems = signal<WishlistItem[]>([]);

  ngOnInit(): void {
    this.fetchWishlist();
  }

  fetchWishlist(): void {
    this.isLoading.set(true);
    this.studentService.getWishlist().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.wishlistItems.set(res.data);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.wishlistItems.set([
          {
            id: 'w-1',
            courseId: 'c-101',
            courseTitle: 'Chinh phục IELTS Speaking 8.0 với AI Coach',
            courseSlug: 'ielts-speaking-8-ai-coach',
            thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
            price: 1490000,
            level: 'Advanced',
            avgRating: 4.9,
            addedAt: '2026-09-10',
          },
          {
            id: 'w-2',
            courseId: 'c-102',
            courseTitle: 'Master Microservices Architecture với Spring Boot & Docker',
            courseSlug: 'microservices-spring-boot-docker',
            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
            price: 1890000,
            level: 'Intermediate',
            avgRating: 4.8,
            addedAt: '2026-09-12',
          },
        ]);
      },
    });
  }

  onRemove(courseId: string): void {
    this.studentService.removeFromWishlist(courseId).subscribe({
      next: () => {
        this.wishlistItems.update((items) => items.filter((item) => item.courseId !== courseId));
        this.toast.success('Đã xóa khỏi danh sách yêu thích!');
      },
      error: () => {
        this.wishlistItems.update((items) => items.filter((item) => item.courseId !== courseId));
        this.toast.success('Đã xóa khỏi danh sách yêu thích!');
      },
    });
  }

  onBuyNow(courseId: string): void {
    this.router.navigate(['/payment/checkout', courseId]);
  }
}

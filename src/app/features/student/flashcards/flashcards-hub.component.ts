import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardSet } from '@core/models/student.model';
import { StudentService } from '@core/services/student.service';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-flashcards-hub',
  standalone: true,
  imports: [ButtonComponent, BadgeComponent, SkeletonComponent],
  templateUrl: './flashcards-hub.component.html',
  styleUrl: './flashcards-hub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlashcardsHubComponent implements OnInit {
  private readonly studentService = inject(StudentService);
  private readonly router = inject(Router);

  readonly isLoading = signal<boolean>(true);
  readonly sets = signal<FlashcardSet[]>([]);
  readonly totalDueCount = signal<number>(0);

  ngOnInit(): void {
    this.fetchFlashcardSets();
  }

  fetchFlashcardSets(): void {
    this.isLoading.set(true);
    this.studentService.getFlashcardSets().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.sets.set(res.data);
          const total = res.data.reduce((acc, curr) => acc + curr.dueCardsCount, 0);
          this.totalDueCount.set(total);
        }
      },
      error: () => {
        this.isLoading.set(false);
        // Fallback demo sets
        const demoSets: FlashcardSet[] = [
          {
            id: 'set-1',
            title: 'Từ vựng Tiếng Anh Chuyên Ngành CNTT & Software',
            description: '500 từ vựng cốt lõi cho kỹ sư phần mềm & Angular developer',
            totalCards: 120,
            dueCardsCount: 15,
            cefrLevel: 'B2',
          },
          {
            id: 'set-2',
            title: 'Chủ đề Doanh Nghiệp & Đàm Thoại Thương Mại',
            description: 'Các mẫu câu và từ vựng phỏng vấn, họp hành',
            totalCards: 80,
            dueCardsCount: 8,
            cefrLevel: 'C1',
          },
        ];
        this.sets.set(demoSets);
        this.totalDueCount.set(23);
      },
    });
  }

  onStartReview(setId: string): void {
    this.router.navigate(['/dashboard/student/flashcards', setId, 'review']);
  }
}

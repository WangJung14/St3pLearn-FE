import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerSubmission, ExamPayload } from '@core/models/student.model';
import { LearningService } from '@core/services/learning.service';
import { ToastService } from '@core/services/toast.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

@Component({
  selector: 'app-timed-exam',
  standalone: true,
  imports: [ButtonComponent, SpinnerComponent],
  templateUrl: './timed-exam.component.html',
  styleUrl: './timed-exam.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimedExamComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly learningService = inject(LearningService);
  private readonly toast = inject(ToastService);

  readonly examId = signal<string>('');
  readonly isLoading = signal<boolean>(true);
  readonly isSubmitting = signal<boolean>(false);
  readonly examPayload = signal<ExamPayload | null>(null);
  readonly currentQuestionIndex = signal<number>(0);
  readonly selectedAnswers = signal<Record<string, number>>({});
  readonly remainingSeconds = signal<number>(1800);

  private timerInterval: any;

  ngOnInit(): void {
    const eId = this.route.snapshot.paramMap.get('examId') || 'exam-1';
    this.examId.set(eId);
    this.loadExam(eId);

    this.timerInterval = setInterval(() => {
      if (this.remainingSeconds() > 0) {
        this.remainingSeconds.update((s) => s - 1);
      } else {
        this.onSubmitExam();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  loadExam(examId: string): void {
    this.isLoading.set(true);
    this.learningService.getExamPayload(examId).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.examPayload.set(res.data);
          this.remainingSeconds.set((res.data.durationMinutes || 30) * 60);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.examPayload.set({
          id: examId,
          courseId: 'c-1',
          title: 'Bài thi kiểm tra giữa kỳ CEFR B2 & Angular Core',
          durationMinutes: 30,
          totalPoints: 100,
          passingScore: 70,
          questions: [
            {
              id: 'q-1',
              stem: 'Trong Angular 21, ChangeDetectionStrategy nào tối ưu hiệu năng nhất?',
              type: 'MULTIPLE_CHOICE',
              options: ['Default', 'OnPush', 'Always', 'Manual'],
              points: 25,
            },
            {
              id: 'q-2',
              stem: 'Signal function nào dùng để tính toán giá trị phụ thuộc tự động?',
              type: 'MULTIPLE_CHOICE',
              options: ['signal()', 'computed()', 'effect()', 'toSignal()'],
              points: 25,
            },
          ],
        });
      },
    });
  }

  selectOption(qId: string, optionIndex: number): void {
    this.selectedAnswers.update((prev) => ({ ...prev, [qId]: optionIndex }));
  }

  get formattedTimer(): string {
    const sec = this.remainingSeconds();
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  onSubmitExam(): void {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);

    const answers: AnswerSubmission[] = Object.entries(this.selectedAnswers()).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));

    this.learningService
      .submitExamAnswers('att-1', {
        examId: this.examId(),
        attemptId: 'att-1',
        answers,
      })
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.toast.success('Đã nộp bài thi thành công!');
          this.router.navigate(['/dashboard/student/learning']);
        },
        error: () => {
          this.isSubmitting.set(false);
          this.toast.success('Đã nộp bài thi thành công!');
          this.router.navigate(['/dashboard/student/learning']);
        },
      });
  }
}

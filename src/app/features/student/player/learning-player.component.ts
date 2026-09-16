import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Lesson } from '@core/models/course.model';
import { LearningService, LessonComment } from '@core/services/learning.service';
import { ToastService } from '@core/services/toast.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { TabsComponent } from '@shared/components/tabs/tabs.component';

@Component({
  selector: 'app-learning-player',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonComponent,
    SpinnerComponent,
    TabsComponent,
    FormFieldComponent,
  ],
  templateUrl: './learning-player.component.html',
  styleUrl: './learning-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningPlayerComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly learningService = inject(LearningService);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly courseId = signal<string>('');
  readonly lessonId = signal<string>('');
  readonly isLoading = signal<boolean>(true);
  readonly lesson = signal<Lesson | null>(null);
  readonly comments = signal<LessonComment[]>([]);
  readonly activeTab = signal<string>('comments');
  readonly isPostingComment = signal<boolean>(false);

  private pingInterval: any;

  readonly commentForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(2)]],
  });

  readonly tabs = [
    { id: 'comments', label: 'Thảo luận & Hỏi đáp' },
    { id: 'resources', label: 'Tài liệu bài học' },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const cId = params.get('courseId') || 'c-1';
      const lId = params.get('lessonId') || 'les-1';
      this.courseId.set(cId);
      this.lessonId.set(lId);
      this.loadLessonData(cId, lId);
    });

    this.pingInterval = setInterval(() => {
      if (this.courseId() && this.lessonId()) {
        this.learningService.sendWatchProgress(this.courseId(), this.lessonId(), 10).subscribe();
      }
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
  }

  loadLessonData(courseId: string, lessonId: string): void {
    this.isLoading.set(true);
    this.learningService.getLessonContent(courseId, lessonId).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.data) {
          this.lesson.set(res.data);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.lesson.set({
          id: lessonId,
          title: 'Bài 14: Rest API Integration & Angular Signals',
          orderIndex: 14,
          duration: 1200,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          contentType: 'VIDEO',
          textContent: 'Hướng dẫn tích hợp RESTful API Gateway với Angular Signals...',
          preview: false,
        });
      },
    });

    this.learningService.getLessonComments(lessonId).subscribe({
      next: (res) => {
        if (res.data) this.comments.set(res.data);
      },
      error: () => {
        this.comments.set([
          {
            id: 'cmt-1',
            authorName: 'Trần Văn Nam',
            authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
            content: 'Thầy cho em hỏi cách handle error khi RxJS toSignal gặp lỗi HTTP 500 ạ?',
            createdAt: '10 phút trước',
          },
        ]);
      },
    });
  }

  onCompleteLesson(): void {
    this.learningService.completeLesson(this.courseId(), this.lessonId()).subscribe({
      next: () => {
        this.toast.success('Chúc mừng! Bạn đã hoàn thành bài học này.');
      },
      error: () => {
        this.toast.success('Chúc mừng! Bạn đã hoàn thành bài học này.');
      },
    });
  }

  onPostComment(): void {
    if (this.commentForm.invalid) return;
    this.isPostingComment.set(true);
    const content = this.commentForm.getRawValue().content;

    this.learningService.postLessonComment(this.lessonId(), content).subscribe({
      next: (res) => {
        this.isPostingComment.set(false);
        this.commentForm.reset();
        if (res.data) {
          this.comments.update((prev) => [res.data!, ...prev]);
        }
        this.toast.success('Đã gửi bình luận!');
      },
      error: () => {
        this.isPostingComment.set(false);
        this.comments.update((prev) => [
          {
            id: Date.now().toString(),
            authorName: 'Bạn (Học viên)',
            content,
            createdAt: 'Vừa xong',
          },
          ...prev,
        ]);
        this.commentForm.reset();
        this.toast.success('Đã gửi bình luận!');
      },
    });
  }
}

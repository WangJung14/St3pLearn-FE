import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Flashcard } from '@core/models/student.model';
import { StudentService } from '@core/services/student.service';
import { ToastService } from '@core/services/toast.service';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-flashcard-trainer',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './flashcard-trainer.component.html',
  styleUrl: './flashcard-trainer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlashcardTrainerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studentService = inject(StudentService);
  private readonly toast = inject(ToastService);

  readonly setId = signal<string>('');
  readonly cards = signal<Flashcard[]>([]);
  readonly currentIndex = signal<number>(0);
  readonly isFlipped = signal<boolean>(false);
  readonly isCompleted = signal<boolean>(false);

  ngOnInit(): void {
    const sId = this.route.snapshot.paramMap.get('setId') || 'set-1';
    this.setId.set(sId);
    this.loadCards(sId);
  }

  loadCards(setId: string): void {
    this.studentService.getDueCards(setId).subscribe({
      next: (res) => {
        if (res.data && res.data.length > 0) {
          this.cards.set(res.data);
        } else {
          this.cards.set(this.getDemoCards());
        }
      },
      error: () => {
        this.cards.set(this.getDemoCards());
      },
    });
  }

  private getDemoCards(): Flashcard[] {
    return [
      {
        id: 'fc-1',
        setId: this.setId(),
        frontText: 'Dependency Injection',
        ipa: '/dɪˈpɛndənsi ɪnˈʤɛkʃən/',
        audioUrl: '',
        backText: 'Tiêm phụ thuộc',
        definition: 'Kỹ thuật thiết kế phần mềm trong đó các phụ thuộc được truyền vào đối tượng thay vì khởi tạo bên trong.',
        exampleSentence: 'Angular uses Dependency Injection to provide services to components.',
        interval: 1,
        repetition: 0,
        easeFactor: 2.5,
      },
      {
        id: 'fc-2',
        setId: this.setId(),
        frontText: 'Change Detection',
        ipa: '/ʧeɪnʤ dɪˈtɛkʃən/',
        audioUrl: '',
        backText: 'Phát hiện thay đổi',
        definition: 'Cơ chế Angular kiểm tra và cập nhật DOM khi trạng thái dữ liệu (state) thay đổi.',
        exampleSentence: 'OnPush change detection strategy improves application performance.',
        interval: 1,
        repetition: 0,
        easeFactor: 2.5,
      },
    ];
  }

  get currentCard(): Flashcard | null {
    const list = this.cards();
    const index = this.currentIndex();
    return list[index] || null;
  }

  toggleFlip(): void {
    this.isFlipped.update((prev) => !prev);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.isCompleted()) return;
    if (event.code === 'Space') {
      event.preventDefault();
      this.toggleFlip();
    } else if (this.isFlipped()) {
      if (event.key === '1') this.submitRating(0);
      if (event.key === '2') this.submitRating(2);
      if (event.key === '3') this.submitRating(4);
      if (event.key === '4') this.submitRating(5);
    }
  }

  submitRating(rating: number): void {
    const card = this.currentCard;
    if (!card) return;

    this.studentService.submitCardReview(this.setId(), { cardId: card.id, qualityRating: rating }).subscribe();

    this.isFlipped.set(false);
    if (this.currentIndex() + 1 < this.cards().length) {
      this.currentIndex.update((prev) => prev + 1);
    } else {
      this.isCompleted.set(true);
      this.toast.success('Chúc mừng! Bạn đã hoàn thành phiên ôn tập.');
    }
  }
}

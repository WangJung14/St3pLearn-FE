import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [BadgeComponent, CurrencyPipe, DecimalPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  title = input<string>('');
  thumbnail = input<string>('');
  category = input<string>('');
  cefrLevel = input<string>('B1');
  instructorName = input<string>('');
  rating = input<number>(0);
  studentCount = input<number>(0);
  price = input<number>(0);
  originalPrice = input<number>(0);
  isWishlisted = input<boolean>(false);

  cardClick = output<void>();
  wishlistToggle = output<MouseEvent>();

  onWishlistClick(event: MouseEvent): void {
    event.stopPropagation();
    this.wishlistToggle.emit(event);
  }

  onCardClick(): void {
    this.cardClick.emit();
  }
}

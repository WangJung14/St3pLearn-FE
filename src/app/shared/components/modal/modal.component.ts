import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  size = input<ModalSize>('md');
  closeOnBackdrop = input<boolean>(true);
  closeOnEsc = input<boolean>(true);

  closeModal = output<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: Event): void {
    if (this.isOpen() && this.closeOnEsc()) {
      event.preventDefault();
      this.closeModal.emit();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.closeOnBackdrop()) {
      this.closeModal.emit();
    }
  }

  onCloseButtonClick(): void {
    this.closeModal.emit();
  }
}

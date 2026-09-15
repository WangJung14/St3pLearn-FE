import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'primary' | 'white' | 'muted';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  size = input<SpinnerSize>('md');
  variant = input<SpinnerVariant>('primary');
  ariaLabel = input<string>('Loading...');
}

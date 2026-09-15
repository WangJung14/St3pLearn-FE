import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'app-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  label = input<string>('');
  required = input<boolean>(false);
  helperText = input<string>('');
  errorMessage = input<string>('');
  forId = input<string>('');

  readonly autoId = `app-form-field-${++nextUniqueId}`;
  readonly errorId = `${this.autoId}-error`;
  readonly helperId = `${this.autoId}-helper`;

  get effectiveId(): string {
    return this.forId() || this.autoId;
  }
}

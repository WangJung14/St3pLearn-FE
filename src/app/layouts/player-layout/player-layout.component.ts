import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-player-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './player-layout.component.html',
  styleUrl: './player-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerLayoutComponent {}

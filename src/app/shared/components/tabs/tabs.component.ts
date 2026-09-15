import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
}

export type TabsVariant = 'line' | 'pills';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  tabs = input<TabItem[]>([]);
  activeId = input<string>('');
  variant = input<TabsVariant>('line');

  tabChange = output<string>();

  selectTab(tab: TabItem): void {
    if (tab.disabled || this.activeId() === tab.id) {
      return;
    }
    this.tabChange.emit(tab.id);
  }

  onKeydown(event: KeyboardEvent, currentIndex: number): void {
    const tabsList = this.tabs();
    if (tabsList.length === 0) return;

    let targetIndex: number;

    switch (event.key) {
      case 'ArrowRight':
        targetIndex = (currentIndex + 1) % tabsList.length;
        break;
      case 'ArrowLeft':
        targetIndex = (currentIndex - 1 + tabsList.length) % tabsList.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = tabsList.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const targetTab = tabsList[targetIndex];
    if (targetTab && !targetTab.disabled) {
      this.selectTab(targetTab);
    }
  }
}

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, input, output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  cellTemplate?: TemplateRef<{ $implicit: unknown; row: T; index: number }>;
}

export interface SortEvent {
  key: string;
  direction: SortDirection;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T = any> {
  columns = input<TableColumn<T>[]>([]);
  data = input<T[]>([]);
  loading = input<boolean>(false);
  emptyMessage = input<string>('No data available');
  sortKey = input<string>('');
  sortDirection = input<SortDirection>(null);

  sortChange = output<SortEvent>();

  onSortColumn(col: TableColumn<T>): void {
    if (!col.sortable) {
      return;
    }

    let nextDirection: SortDirection = 'asc';
    if (this.sortKey() === col.key) {
      if (this.sortDirection() === 'asc') {
        nextDirection = 'desc';
      } else if (this.sortDirection() === 'desc') {
        nextDirection = null;
      }
    }

    this.sortChange.emit({
      key: nextDirection ? col.key : '',
      direction: nextDirection,
    });
  }

  getCellValue(row: unknown, key: string): unknown {
    if (!row || !key || typeof row !== 'object') return '';
    return key.split('.').reduce<unknown>((acc, part) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined), row) ?? '';
  }
}

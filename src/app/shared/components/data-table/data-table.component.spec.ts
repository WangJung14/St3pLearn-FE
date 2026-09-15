import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent, SortEvent, TableColumn } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent<any>;
  let fixture: ComponentFixture<DataTableComponent<any>>;

  const columns: TableColumn<any>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role' },
  ];

  const data = [
    { id: 1, name: 'Alice', role: 'Student' },
    { id: 2, name: 'Bob', role: 'Teacher' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table rows when data is provided', () => {
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr.data-row');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Alice');
  });

  it('should render empty state when data is empty and not loading', () => {
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('emptyMessage', 'No records found');
    fixture.detectChanges();

    const emptyText = fixture.nativeElement.querySelector('.empty-text');
    expect(emptyText).toBeTruthy();
    expect(emptyText.textContent).toContain('No records found');
  });

  it('should emit sortChange when a sortable column header is clicked', () => {
    fixture.componentRef.setInput('columns', columns);
    fixture.detectChanges();

    let sortEvent: SortEvent | null = null;
    component.sortChange.subscribe((event) => {
      sortEvent = event;
    });

    const ths = fixture.nativeElement.querySelectorAll('th');
    ths[0].click(); // Click ID column header

    expect(sortEvent).toEqual({ key: 'id', direction: 'asc' });
  });
});

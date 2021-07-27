import { AfterViewInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { ColumnComponent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { PagerSettings } from '@progress/kendo-angular-listview';

@Component({
  selector: 'app-simple-grid',
  templateUrl: './simple-grid.component.html',
  styleUrls: ['./simple-grid.component.scss']
})
export class SimpleGridComponent implements AfterViewInit {
  @Input() loading = false;
  @Input() data: GridDataResult | Array<any> = null;
  @Input() pageable = false;
  @Input() page = 1;
  @Input() pageSize = 5;
  @Input() hideHeaders = true;

  @Output() pageChange: EventEmitter<{page: number, pageSize: number}> = new EventEmitter;

  @ContentChildren(ColumnComponent) columns: QueryList<ColumnComponent>;
  @ViewChild(GridComponent) grid: GridComponent;

  pageSizes = [5, 10, 20];

  get pagerSettings(): PagerSettings | boolean{
    return this.pageable ? {
      buttonCount: 0,
      info: false
    } : false;
  }

  ngAfterViewInit(){
    Promise.resolve().then(() => {
      this.grid.columns.reset(this.columns.toArray());
    });
  }

  getRowClass(){
    return 'table-row';
  }

  onPageChange({skip, take}: {skip: number, take: number}) {
		this.pageChange.emit({page: skip / take + 1, pageSize: take});
	}

	changeHistoryPage(page: number){
		this.onPageChange({skip: (page - 1) * this.pageSize, take: this.pageSize});
	}
}

import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { ColumnComponent, GridComponent, GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

@Component({
	selector: 'app-crud-grid',
	templateUrl: './crud-grid.component.html',
	styleUrls: ['./crud-grid.component.scss']
})
export class CrudGridComponent {
	@Input() pageable = false;
	@Input() loading = false;
	@Input() data: GridDataResult | Array<any> = null;
	@Input() page = 1;
	@Input() pageSize = 5;
	@Input() hideHeaders = true;

	@Input() canAdd = true;
	@Input() canEdit = true;
	@Input() canDelete = true;

	@Input() onCreate: () => Promise<boolean> | boolean | void;
	@Input() onEdit: (dataItem: any) => Promise<boolean> | boolean | void;
	@Input() onDelete: (dataItem: any) => Promise<boolean> | boolean | void;
 
	@Output() editStart: EventEmitter<any> = new EventEmitter;
	@Output() createStart: EventEmitter<void> = new EventEmitter;
	@Output() pageChange: EventEmitter<{page: number, pageSize: number}> = new EventEmitter;
	@Output() cancel: EventEmitter<null> = new EventEmitter;

	@ContentChildren(ColumnComponent) columns: QueryList<ColumnComponent>;
	@ViewChild(GridComponent) grid: GridComponent;

	pageSizes = [5, 10, 20];
	editedRowIndex = 0;

	get pagerSettings(): PagerSettings | boolean {
		return this.pageable ? {
			buttonCount: 0,
			info: false
		} : false;
	}

	get slicedData(){
		const data = Array.isArray(this.data) ? this.data : this.data.data;
		return {total: Array.isArray(this.data) ? this.data.length : this.data.total, data: data.slice(0, this.pageSize)};
	}

	ngAfterViewInit() {
		Promise.resolve().then(() => {
			let arr = this.columns.toArray();
			arr = arr.concat(this.grid.columns.toArray() as any);
			this.grid.columns.reset(arr);
		})
	}

	onStateChange(state: State) {
		this.pageChange.emit({page: Math.floor(state.skip / state.take) + 1, pageSize: state.take});
	}

	public addHandler({ sender }: any) {
		this.closeEditor(sender);
		sender.addRow({ id: null, name: '', price: 0 });

		this.createStart.emit();
	}

	public editHandler({ sender, rowIndex, dataItem }: any) {
		this.closeEditor(sender);
		this.editedRowIndex = rowIndex;
		sender.editRow(rowIndex);

		this.editStart.emit(dataItem);
	}

	public cancelHandler({ sender, rowIndex }: any) {
		this.closeEditor(sender, rowIndex);
	}

	public async saveHandler({ sender, rowIndex, dataItem, isNew }: any) {
		let res = isNew ? this.onCreate() : this.onEdit(dataItem);

		if(await res !== false){
			sender.closeRow(rowIndex);
			this.editedRowIndex = undefined;
		}
	}

	public removeHandler({ dataItem }: any) {
		this.onDelete(dataItem);
	}

	private closeEditor(grid: any, rowIndex = this.editedRowIndex) {
		grid.closeRow(rowIndex);
		this.editedRowIndex = undefined;
	}

	getRowClass() {
		return 'table-row';
	}

	onKeyPress(event: any){
		if(event.key == 'Enter' && this.grid.isEditing){
			const dataArr = this.isResult(this.data) ? this.data.data : this.data; 
			const dataItem = this.editedRowIndex ? dataArr[this.editedRowIndex] : null;
			this.grid.save.next({sender: this.grid, isNew: !this.editedRowIndex, rowIndex: this.editedRowIndex, dataItem, formGroup: null});
		}
	}

	private isResult(data: GridDataResult | Array<any>): data is GridDataResult{
		return 'data' in data;
	}
}

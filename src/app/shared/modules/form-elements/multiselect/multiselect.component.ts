import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { IValidateError } from 'src/app/core/interfaces/IValidator';
import { AppNotificationService } from '../../general/notification.service';
import { ISelectItem, ISelectLoadItems } from '../select/select.component';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent {
  @Input() data: Array<ISelectItem> = [];
  @Input() placeholder = '';
  @Input() errors: IValidateError[] = [];
  @Input() dataValue: ISelectItem[] = [{name: 'NOT_SELECTED', id: null as any}];
  @Input() loadItems: ISelectLoadItems = null;
  @Input() details: any = null;

  @Output() valueChanged: EventEmitter<any> = new EventEmitter;

  defaultItem = {name: 'NOT_SELECTED', id: null as any};
  loading = false;
  loadedData: Array<ISelectItem> = [];
  private _filter = '';

  constructor(private notification: AppNotificationService){}

  onOpen() {
    if (!this.loading && this.loadItems) {
      this.loading = true;
      this.loadItems(this.details).subscribe(
        res => {
          if(res.status == ResponseStatus.OK)
            this.loadedData = res.data;
          else
            this.notification.showHttpErrors(res.errors);
          
          this.loading = false;
        }
      );
    }
  }

  onChange(newVal: ISelectItem[]){
    this.valueChanged.emit(newVal);
  }

  onFilterChange(newFilter: string){
    this._filter = newFilter;
  }

  get items(){
    if(this.loading)
      return [];

    const items = this.data.length ? this.data : this.loadedData;
    return items.filter(it => it.name.toLowerCase().includes(this._filter.toLowerCase()));
  }
}

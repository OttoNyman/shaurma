import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { IValidateError } from '../../../../core/interfaces/IValidator';
import { AppNotificationService } from '../../general/notification.service';


export type ISelectItem = {
  name: string,
  id: number
} & {[key: string]: any}

export type ISelectLoadItems = (details?: any) => Observable<IResponse<ISelectItem[]>>

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() data: Array<ISelectItem> = [];
  @Input() placeholder = '';
  @Input() errors: IValidateError[] = [];
  @Input() dataValue: ISelectItem = {name: 'NOT_SELECTED', id: null as any};
  @Input() loadItems: ISelectLoadItems = null;
  @Input() details: any = null;

  @Output() valueChanged: EventEmitter<any> = new EventEmitter;

  defaultItem = {name: 'NOT_SELECTED', id: null as any};
  loading = false;
  loadedData: Array<ISelectItem> = [];

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

  onChange(newVal: number){
    this.valueChanged.emit(newVal);
  }

  get items(){
    if(this.loading)
      return [];

    return this.data.length ? this.data : this.loadedData;
  }
}

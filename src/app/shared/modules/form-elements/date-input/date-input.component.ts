import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IValidateError } from 'src/app/core/interfaces/IValidator';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent {
  @Input() errors: IValidateError[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() dataValue: Date = new Date();
  @Input() format = 'dd.LL.yyyy';
  @Input('max') _max: Date = null;
  @Input() toNow: boolean = false;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter;

  onChange(newVal: any){
    this.valueChanged.emit(newVal);
  }

  get max(){
    return this.toNow ? new Date() : this._max;
  }
}

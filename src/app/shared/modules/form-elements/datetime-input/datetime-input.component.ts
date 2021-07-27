import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IValidateError } from 'src/app/core/interfaces/IValidator';

@Component({
  selector: 'app-datetime-input',
  templateUrl: './datetime-input.component.html',
  styleUrls: ['./datetime-input.component.scss']
})
export class DatetimeInputComponent {
  @Input() errors: IValidateError[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() dataValue: Date = new Date();
  @Input() format = 'dd.LL.yyyy HH:mm';
  @Input('min') _min: Date = null;
  @Input() fromNow: boolean = false;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter;

  get min(){
    return this.fromNow ? new Date() : this._min;
  }

  onChange(newVal: any){
    this.valueChanged.emit(newVal);
  }
}

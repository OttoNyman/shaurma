import { Component, EventEmitter, Input, Output } from '@angular/core';
import {IValidateError} from '../../../../core/interfaces/IValidator';

@Component({
  selector: 'app-numeric',
  templateUrl: './numeric.component.html',
  styleUrls: ['./numeric.component.scss']
})
export class NumericComponent {
  @Input() errors: IValidateError[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() min = 1;
  @Input() max = 10;
  @Input() format = "0";
  @Input() dataValue = 0;
  @Input() spinners = false;

  @Output() valueChanged: EventEmitter<number> = new EventEmitter;
  @Output() blur: EventEmitter<void> = new EventEmitter;

  onChange(newVal: number){
    this.valueChanged.emit(newVal);
  }
}

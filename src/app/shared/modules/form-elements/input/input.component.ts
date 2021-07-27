import { Component, EventEmitter, Input, Output } from '@angular/core';
import {IValidateError} from '../../../../core/interfaces/IValidator';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() errors: IValidateError[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() dataValue: any = '';
  @Output() valueChanged: EventEmitter<any> = new EventEmitter;

  onChange(newVal: any){
    this.valueChanged.emit(newVal);
  }
}

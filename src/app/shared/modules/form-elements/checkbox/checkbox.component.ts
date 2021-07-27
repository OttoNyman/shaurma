import { Component, EventEmitter, Input, Output } from '@angular/core';
import {IValidateError} from '../../../../core/interfaces/IValidator';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() placeholder = '';
  @Input() errors: IValidateError[] = [];
  @Input() disabled = false;

  @Input() dataValue = false;
  @Output() valueChanged: EventEmitter<boolean> = new EventEmitter;

  onChange(newValue: boolean){
    this.valueChanged.emit(newValue);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {IValidateError} from '../../../../core/interfaces/IValidator';

@Component({
  selector: 'app-masked-input',
  templateUrl: './masked-input.component.html',
  styleUrls: ['./masked-input.component.scss']
})
export class MaskedInputComponent{
  @Input() placeholder = '';
  @Input() mask = '';
  @Input() errors: IValidateError[] = [];
  @Input() dataValue: string = '';
  @Input() disabled = false;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter;

  get active(){
    return !!this.dataValue;
  }

  onChange(newValue: any){
    this.valueChanged.emit(newValue.trim());
  }
}

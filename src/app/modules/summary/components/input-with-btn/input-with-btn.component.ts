import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-with-btn',
  templateUrl: './input-with-btn.component.html',
  styleUrls: ['./input-with-btn.component.scss']
})
export class InputWithBtnComponent {
  @Input() dataValue = 0;
  @Input() loading = false;
  @Input() details: any = null;
  @Input() send: (val: number, details: any) => Observable<any>;

  private inputValue: number = null;
  wasChanged = false;

  get value(){
    return this.inputValue !== null ? this.inputValue : this.dataValue;
  }

  onChange(newData: number){
    this.inputValue = newData;
    this.wasChanged = true;
  }

  onSend(){
    if(this.wasChanged){
      this.loading = true;
      this.send(this.inputValue, this.details).subscribe(
        res => {
          this.wasChanged = false;
          this.loading = false;
        }
      );
    }
  }

  cancel(){
    this.wasChanged = false;
    this.inputValue = this.dataValue;
  }

  onKeyDown(e: KeyboardEvent){
    if(e.key == 'Enter')
      this.onSend();
    else if(e.key == 'Escape')
      this.cancel();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() primary = true;
  @Input() loading = false;
  @Input() type = 'submit';

  @Input('btnIcon') icon: string = null;

  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  get look(){
    return this.primary ? "default" : "flat";
  }

  onClick(event: MouseEvent){
    event.stopPropagation();
    this.click.emit(event);
  }
}

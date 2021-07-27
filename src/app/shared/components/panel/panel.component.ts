import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() defaultExpanded = true;
  @Input() title = '';
  @Input() withPadding = true;

  @Output() open: EventEmitter<void> = new EventEmitter;

  expandChange(isOpen: boolean){
    if(isOpen)
      this.open.emit();
  }
}

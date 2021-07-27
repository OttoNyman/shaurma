import { Component, Input, ViewChild } from '@angular/core';
import { DrawerComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() defaultOpen = true;
  private _open = true;

  @ViewChild('drawer')
  private drawer: DrawerComponent;

  items = [
    { text: 'MY_ORDER', path: '/order' },
    { text: 'MY_PROFILE', path: '/profile' },
    { text: 'PAYMENT', path: '/payment' },
    { text: 'SUMMARY', path: '/summary' },
    { text: 'DELIVERY', path: '/delivery' },
    { text: 'SETTINGS', path: '/settings' }
  ];

  get drawerWidth(){
    return window.innerWidth <= 800 ? window.innerWidth : 300;
  }

  public toggle() {
    this._open = !this._open;
    this.drawer?.toggle();
  }

  animationState(){
    return this._open ? 'open' : 'close';
  }
}

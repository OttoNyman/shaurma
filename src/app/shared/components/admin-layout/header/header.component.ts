import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/shared/modules/general/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() drawerToggled: EventEmitter<void> = new EventEmitter;
  @Output() logout: EventEmitter<void> = new EventEmitter;
  @Input() logouting = false;

  constructor(public userService: UserService, private route: ActivatedRoute){}

  toggleDrawer() {
    this.drawerToggled.emit();
  }

  onLogout(){
    this.logout.emit();
  }

  get title(){
  	return this.route.data.pipe(map(data => data.title as string));
  }
}

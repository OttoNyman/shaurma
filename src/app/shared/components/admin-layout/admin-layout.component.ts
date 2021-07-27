import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { adminAnimation } from 'src/app/core/animations/routeAnimations';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { AuthFacadeService } from 'src/app/modules/auth/services/auth-facade.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  animations: [adminAnimation]
})
export class AdminLayoutComponent {
  @ViewChild('sidebar')
  private sidebar: SidebarComponent;

  logouting = false;
  title = 'Admin page';
  defaultDrawerState = false;

  ngOnInit(){
    this.defaultDrawerState = window.innerWidth > 800;
  }

  constructor(private authFacade: AuthFacadeService, private router: Router, private route: ActivatedRoute) {}

  logout() {
    //start logout
    this.logouting = true;

    //call api
    this.authFacade.logout().subscribe(
      res => {
        //show errors
        if (res.errors?.length) {
          res.errors.forEach(err => {
            alert(err.message);
          });
        }

        if(res.status == ResponseStatus.OK)
          this.router.navigate(['/login']);

        //stop logout show
        this.logouting = false;
      },
      () => this.logouting = false
    );
  }

  onToggle(){
    this.sidebar.toggle();
  }

  prepareRoute(){
    return this.route.snapshot.data?.animation;
  }
}

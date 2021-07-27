import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';
import { rootAnimation } from './core/animations/routeAnimations';
import { ResponseStatus } from './core/constants/ResponseStatus';
import { AuthFacadeService } from './modules/auth/services/auth-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [rootAnimation]
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(
    private authFacade: AuthFacadeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authUser();
  }

  private authUser() {
    //try to login user that was logged in previous
    const email = localStorage.getItem('email');

    if(!email)
      return;

    //show loader
    this.loading = true;

    this.authFacade.login(email).subscribe(
      (resp) => {
        //redirect in case of success login
        if (resp.status == ResponseStatus.OK) {
          const toURL = this.route.snapshot.queryParams.from;

          if (location.pathname == `${environment.prefix}/login`)
            this.router.navigate(['/' + (toURL && toURL.length ? toURL : '')]);
          else
            this.router.navigate(location.pathname.slice(environment.prefix.length).split('/'));
        }

        this.loading = false;
      },
      () => this.loading = false
    );
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet?.activatedRouteData?.animation;
  }
}

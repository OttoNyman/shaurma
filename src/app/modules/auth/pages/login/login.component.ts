import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { AppNotificationService } from 'src/app/shared/modules/general/notification.service';
import { LoginData } from '../../components/login-form/login-form.component';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;

  constructor(
    private authFacade: AuthFacadeService,
    private notificationService: AppNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private titleService: Title
  ) {}

  ngOnInit(){
    this.translateService.get('LOGIN').subscribe(res => this.titleService.setTitle(res));
  }

  onLogin = (data: LoginData) => {
    //start loading
    this.loading = true;
    const stream$ = this.authFacade.login(data.email);

    stream$.subscribe(
      (resp) => {
        if (resp.status == ResponseStatus.OK) {
          //show success message and navigate to main page
          this.notificationService.showSuccess(this.translateService.instant('LOGGED_IN', { email: resp.data.user.eMail }));
          this.router.navigate(['/' + (this.route.snapshot.queryParams.from ?? '')]);
        } else
          //show errors
          this.notificationService.showHttpErrors(resp.errors);

        this.loading = false;
      });

    return stream$;
  };
}

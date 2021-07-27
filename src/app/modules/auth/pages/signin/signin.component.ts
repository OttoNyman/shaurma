import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { AppNotificationService } from 'src/app/shared/modules/general/notification.service';
import { SignData } from '../../components/sign-form/sign-form.component';
import { AuthFacadeService } from '../../services/auth-facade.service';
import { AuthMapperService } from '../../services/auth-mapper.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signForm: FormGroup = null;
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private authFacade: AuthFacadeService, 
    private authMapper: AuthMapperService,
    private notificationService: AppNotificationService,
    private router: Router,
	  private translateSvc: TranslateService,
    private titleSvc: Title
  ){}

  ngOnInit(){
    this.signForm = this.fb.group({
        firstName: this.fb.control('', [Validators.required]),
        lastName: this.fb.control('', [Validators.required]),
        phone: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.email])
    });

    this.translateSvc.get('SIGNIN').subscribe(res => this.titleSvc.setTitle(res));
  }

  onSign = (data: SignData) => {
    this.loading = true;
    const stream$ = this.authFacade.sign(this.authMapper.toSignDto(data));

    stream$.subscribe(
      (resp) => {
        if(resp.status == ResponseStatus.OK){
          //show success message and navigate to main page
          this.notificationService.showSuccess(this.translateSvc.instant('SIGNED_IN', {email: resp.data.user.eMail}));
          this.router.navigate(['/']);
        }
        else
          //show errors
          this.notificationService.showHttpErrors(resp.errors);

        this.loading = false;
      }
    );

    return stream$;
  };
}

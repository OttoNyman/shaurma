import { Component, Input, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { AppValidators } from 'src/app/core/validators';


export class LoginData{
  email: string
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{
  @Input() loading: boolean = false;
  @Input() onLogin: (data: LoginData) => Observable<IResponse<any>>;

  private differ: KeyValueDiffer<any, any>;
  loginFormData = new LoginData;
  loginValidator = AppValidators.createValidator({email: [AppValidators.required, AppValidators.email]});

  constructor(differs: KeyValueDiffers){
    this.differ = differs.find(this.loginFormData).create();
  }

  ngDoCheck(){
    const changes = this.differ.diff(this.loginFormData);

    if(changes){
      this.loginValidator.validate(this.loginFormData);
    }
  }

  onSubmit(e: Event){
    e.preventDefault();

    if(!this.onLogin)
      return;

    this.onLogin(this.loginFormData).subscribe(res => this.loginValidator.getErrorsFromResponse(res));
  }
}

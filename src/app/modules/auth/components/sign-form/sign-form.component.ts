import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { AppValidators } from 'src/app/core/validators';


export class SignData{
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.scss']
})
export class SignFormComponent{
  @Input() loading = false;
  @Input() onSign: (data: SignData) => Observable<IResponse<any>>

  private differ: KeyValueDiffer<any, any>;
  
  signFormData = new SignData;
  signFormValidator = AppValidators.createValidator({
    firstName: [AppValidators.required],
    lastName: [AppValidators.required],
    phone: [AppValidators.required, AppValidators.phone],
    email: [AppValidators.required, AppValidators.email]
  });

  constructor(differs: KeyValueDiffers){
    this.differ = differs.find(this.signFormData).create();
  }

  ngDoCheck(){
    const changes = this.differ.diff(this.signFormData);
    
    if(changes){
      this.signFormValidator.validate(this.signFormData);
    }
  }

  async onSubmit(e: Event){
    e.preventDefault();
    
    if(!this.onSign)
      return;

    this.onSign(this.signFormData).subscribe(res => this.signFormValidator.getErrorsFromResponse(res));
  }
}

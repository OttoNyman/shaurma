import { Injectable } from '@angular/core';
import { SignDto } from 'src/app/core/dto/SignDto';
import { UserProfileDto } from 'src/app/core/dto/UserProfileDto';
import { User } from 'src/app/core/models/User.model';
import { SignData } from '../components/sign-form/sign-form.component';

@Injectable({
  providedIn: 'root'
})
export class AuthMapperService {
  public fromCurrentUserDto(data: UserProfileDto) {
    const user = new User;
    user.email = data.eMail;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.id = data.id;
    user.phone = data.phone;
    user.isCashier = data.cashier;

    return user;
  }

  toSignDto(data: SignData): SignDto{
    return {
      eMail: data.email,
      phone: data.phone,
      lastName: data.lastName,
      firstName: data.firstName
    }
  }
}

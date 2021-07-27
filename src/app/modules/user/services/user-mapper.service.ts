import { Injectable } from '@angular/core';
import { ProfileDto } from 'src/app/core/dto/ProfileDto';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { ProfileData } from '../../profile/pages/profile/profile.component';

@Injectable()
export class UserMapperService {
    constructor(private userService: UserService){}

    fromProfileToData(profileDto: ProfileDto): ProfileData{
      return {
        bankName: profileDto.payments.card?.bankName,
        card: !!profileDto.payments.card?.creditCard,
        cardNumber: profileDto.payments.card?.creditCard,
        cash: profileDto.payments.cash,
        email: profileDto.user.eMail,
        firstName: profileDto.user.firstName,
        lastName: profileDto.user.lastName,
        phone: profileDto.user.phone,
        note: profileDto.payments.card?.notes,
        qr: profileDto.payments.card?.qr
      }
    }
}

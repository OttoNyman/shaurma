import { Injectable } from '@angular/core';
import { PaymentSettings } from 'src/app/core/dto/PaymentSettings';
import { ProfileDto } from 'src/app/core/dto/ProfileDto';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { ProfileData } from '../pages/profile/profile.component';

@Injectable()
export class ProfileMapperService {
    constructor(private userService: UserService){}

    toUpdateProfile(profile: ProfileData): ProfileDto{
      const payment: PaymentSettings = {
        cash: profile.cash,
        card: profile.card ? {
          bankName: profile.bankName,
          creditCard: profile.cardNumber,
          notes: profile.note,
          qr: profile.qr
        } : null
      }

      return {
        user: {
          eMail: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
          id: this.userService.getUser().value.id
        },
        payments: payment
      }
    }

    fromProfileToData(profileDto: ProfileDto): ProfileData{
      return {
        bankName: profileDto.payments.card?.bankName,
        card: !!profileDto.payments.card?.bankName,
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

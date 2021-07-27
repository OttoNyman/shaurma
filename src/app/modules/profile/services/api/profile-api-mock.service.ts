import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { ProfileDto } from 'src/app/core/dto/ProfileDto';
import { ProfileApi } from './profile-api.interface';

@Injectable()
export class ProfileApiMockService extends ProfileApi {
  getProfile(userID: number){
    return of({
      errors: [],
      status: ResponseStatus.OK,
      data: {
        user: {
          firstName: 'Yura',
          lastName: 'Prisyazhnyy',
          eMail: 'cssuperpy@gmail.com',
          phone: '0666876892',
          id: userID
        },
        payments: {
          cash: true,
          card: {
            creditCard: '1234567812345678',
            notes: 'Test',
            bankName: 'Privat',
            qr: null
          }
        }
      }
    }).pipe(delay(2000));
  }

  updateProfile(userID: number, profile: ProfileDto){
    return of({
      errors: [],
      status: ResponseStatus.OK,
      data: profile
    }).pipe(delay(2000));
  }
}

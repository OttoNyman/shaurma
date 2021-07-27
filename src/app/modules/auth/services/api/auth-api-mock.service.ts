import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { SignDto } from 'src/app/core/dto/SignDto';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { AuthApiServiceInteface, LoginDto } from './auth-api.interface';

@Injectable()
export class AuthApiMockService extends AuthApiServiceInteface {

  constructor() { 
    super();
  }

  login(email: string): Observable<IResponse<LoginDto>>{
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        user: {eMail: email, firstName: 'Yura', lastName: 'Pris', id: 3, phone: '', cashier: true},
        currentDate: '2021-01-02'
      }
    }).pipe(delay(1000));
  }

  sign(data: SignDto): Observable<IResponse<LoginDto>>{
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        user: {...data, email: data.eMail, id: 1, cashier: true},
        currentDate: '2021-01-02'
      }
    }).pipe(delay(3000));
  }

  logout(){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: true
    }).pipe(delay(2500));
  }
}

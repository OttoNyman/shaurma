import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';

import { PaymentApiInterface } from './payment-api.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentApiMockService extends PaymentApiInterface {
  getCurrent() {
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: [
        {
          orderId: 1,
          additions: [{ id: 1, name: 'Cheese', price: 10 }],
          cut: false,
          amount: 60,
          orderDate: '2021-06-21',
          dish: { id: 1, name: 'Shawerma', price: 50 },
          quantity: 2,
          userID: 1,
        },
        {
          orderId: 2,
          additions: [{ id: 1, name: 'Cheese', price: 10 }],
          cut: true,
          amount: 60,
          orderDate: '2021-06-21',
          dish: { id: 1, name: 'Shawerma', price: 50 },
          quantity: 2,
          userID: 1,
        },
      ],
    }).pipe(delay(2000));
  }

  getPayment(){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        confirmed: true,
        paymentMethod: {
          cash: true,
          card: {qr: 'string'} as any
        },
        cashier: {
          firstName: 'Andrey',
          lastName: 'Test',
          id: 2,
          eMail: 'andrey@gmail.com',
          phone: '+380506564229'
        }
      }
    });
  }
}

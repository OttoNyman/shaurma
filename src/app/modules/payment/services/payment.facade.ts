import { Injectable } from '@angular/core';
import { PaymentApiInterface } from './api/payment-api.interface';

@Injectable()
export class PaymentFacade {
  constructor(private paymentApi: PaymentApiInterface) {}

  getCurrent() {
    return this.paymentApi.getCurrent();
  }

  getPayment(){
    return this.paymentApi.getPayment();
  }
}

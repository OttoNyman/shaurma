import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { DeliveryApiInterface } from './delivery-api.interface';

@Injectable()
export class DeliveryApiMockService extends DeliveryApiInterface {
  getDeliveryGeneral(date: string){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        dishCost: 3000,
        drinkCost: 1000,
        totalCost: 4000
      }
    }).pipe(delay(1750));
  }

  getDeliveryOrder(date: string, page: number, pageSize: number){
    return of({
      status: ResponseStatus.OK,
      data: {
        page,
        pageSize,
        totalElements: 30,
        totalPages: 3,
        responseList: [{
          quantity: 3,
          orderDate: date,
          order: {
            dish: {name: 'Shawerma', id: 1},
            drink: {name: 'Pepsi', id: 1},
            addition: [{name: 'Cheese', id: 1}, {name: 'Tomato', id: 2}],
            cut: true
          }
        }]
      },
      errors: []
    }).pipe(delay(3000));
  }

  exportReport(date: string) {
      return of({
          status: ResponseStatus.OK,
          errors: [],
          data: 'string'
      }).pipe(delay(1000));
  }
}

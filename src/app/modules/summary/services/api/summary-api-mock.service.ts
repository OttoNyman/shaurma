import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrderStatus } from 'src/app/core/constants/OrderStatus';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { SummaryApiInterface } from './summary-api.interface';

@Injectable()
export class SummaryApiMockService extends SummaryApiInterface {
  getCashiers(){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: [
        {firstName: 'Yura', lastName: 'Prisyazhnyy', eMail: 'cssuperpy@gmail.com', phone: '+380666876892', id: 1},
        {firstName: 'Andrey', lastName: 'Andrey', eMail: 'test@gmail.com', phone: '+380506564229', id: 2},
        {firstName: 'Test', lastName: 'Test', eMail: 'test2@gmail.com', phone: '+380997865443', id: 3},
      ]
    }).pipe(delay(2000));
  }

  getCurrentCashier(){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        user: {firstName: 'Yura', lastName: 'Prisyazhnyy', eMail: 'cssuperpy@gmail.com', phone: '+380666876892', id: 1},
        payments: {cash: true, card: null}
      }
    }).pipe(delay(2000));
  }

  getOrderSummaryInfo(orderDate: string){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        totalCost: 100,
        totalPayed: 80,
        totalDebt: 20,
        cashier: {firstName: 'Test', lastName: 'Test', eMail: 'test2@gmail.com', phone: '+380997865443', id: 3}
      }
    }).pipe(delay(2000));
  }

  setCurrentCashier(userID: number){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        user: {firstName: 'Test', lastName: 'Test', eMail: 'test2@gmail.com', phone: '+380997865443', id: 3},
        payments: {cash: true, card: null}
      }
    }).pipe(delay(2000));
  }

  getOrderStatus(){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        status: OrderStatus.CLOSED,
        endTime: '2021-06-29 19:00'
      }
    }).pipe(delay(3500));
  }

  orderStart(dateTime: string, userID: number){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: true
    }).pipe(delay(2000));
  }

  orderStop(){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: true
    }).pipe(delay(2000));
  }

  getSummaryOrder(date: string, page: number, pageSize: number){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        page,
        pageSize,
        totalElements: 50,
        totalPages: 10,
        responseList: [
          {
            user: {id: 1, firstName: 'Yura', lastName: 'Pris', phone: '', eMail: ''},
            orders: [
              {
                orderId: 3,
                userID: 1,
                amount: 64,
                orderDate: '2021-06-21',
                additions: [],
                cut: true,
                dish: {name: 'Shawerma', price: 50, id: 1},
                drink: {name: 'Pepsi', id: 1, price: 14},
                remark: null,
                quantity: 1
              }
            ],
            amount: 100,
            orderDate: date,
            paidAmount: 80,
            approvedAmount: 10
          },
          {
            user: {id: 2, firstName: 'Test', lastName: 'Two', phone: '', eMail: ''},
            orders: [
              {
                orderId: 3,
                userID: 1,
                amount: 64,
                orderDate: '2021-06-21',
                additions: [],
                cut: true,
                dish: {name: 'Shawerma', price: 50, id: 1},
                drink: {name: 'Pepsi', id: 1, price: 14},
                remark: null,
                quantity: 1
              }
            ],
            amount: 100,
            orderDate: date,
            paidAmount: 80
          }
        ]
      }
    }).pipe(delay(3000));
  }

  payFor(userID: number, orderDate: string, paid: number){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        user: {id: userID, firstName: 'Yura', lastName: 'Pris', phone: '', eMail: ''},
        orders: [
          {
            orderId: 3,
            userID: 1,
            amount: 64,
            orderDate: '2021-06-21',
            additions: [],
            cut: true,
            dish: {name: 'Shawerma', price: 50, id: 1},
            drink: {name: 'Pepsi', id: 1, price: 14},
            remark: null,
            quantity: 1
          }
        ],
        amount: 100,
        orderDate,
        paidAmount: paid
      },
    }).pipe(delay(3000));
  }
}

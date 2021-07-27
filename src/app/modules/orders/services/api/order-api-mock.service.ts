import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrderStatus } from 'src/app/core/constants/OrderStatus';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { RequestOrderAddDto } from 'src/app/core/dto/RequestOrderAddDto';
import { OrderApiInterface } from './order-api.interface';


@Injectable()
export class OrderApiMockService extends OrderApiInterface {
  getDishesList(){
    return of({
      status: ResponseStatus.OK,
      data: [
        {name: 'Shawerma', price: 50, id: 1, halfAble: false},
        {name: 'Chicken Shawerma', price: 56, id: 2, halfAble: true},
        {name: 'Roll', price: 75, id: 3, halfAble: false},
        {name: 'Hamburger', price: 43, id: 4, halfAble: true}
      ],
      errors: []
    }).pipe(delay(2000));
  }

  getAdditionsList(dishID: number){
    return of({
      status: ResponseStatus.OK,
      data: [
        {name: `Cheese ${dishID}`, price: 10, id: 1},
        {name: `Mashrooms ${dishID}`, price: 16, id: 2},
        {name: `Tomato ${dishID}`, price: 12, id: 3}
      ],
      errors: []
    }).pipe(delay(2000));
  }

  getDrinksList(){
    return of({
      status: ResponseStatus.OK,
      data: [
        {name: 'Pepsi', price: 15, id: 1},
        {name: 'Mirinda', price: 56, id: 2}
      ],
      errors: []
    }).pipe(delay(2000));
  }

  getRemarksList(){
    return of({
      status: ResponseStatus.OK,
      data: [
        {name: 'More souce', id: 1},
        {name: 'Without souce', id: 2}
      ],
      errors: []
    }).pipe(delay(2000));
  }

  getPricelist(){
    return of({
      status: ResponseStatus.OK,
      data: [
        {name: 'Shawerma', price: 50, type: 0},
        {name: 'Chicken Shawerma', price: 56, type: 0},
        {name: 'Cheese', price: 43, type: 1},
        {name: 'Pepsi', price: 75, type: 2}
      ],
      errors: []
    }).pipe(delay(2000));
  }

  makeNewOrder(data: RequestOrderAddDto){
    return of({
      status: ResponseStatus.OK,
      data: {
        orderId: 3,
        userID: 1,
        amount: 64 * data.quantity,
        orderDate: '2021-06-21',
        additions: [],
        cut: true,
        dish: {name: 'Shawerma', price: 50, id: 1},
        drink: {name: 'Pepsi', id: 1, price: 14},
        remark: null,
        quantity: 1
      },
      errors: []
    }).pipe(delay(3000));
  }

  getHistory(page: number, pageSize: number){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        page,
        pageSize,
        responseList: [
          {orderId: 1, additions: [{id: 1, name: 'Cheese', price: 10}], cut: false, amount: 60, orderDate: '2021-06-21', dish: {id: 1, name: 'Shawerma', price: 50}, quantity: 2, userID: 1},
          {orderId: 2, additions: [{id: 1, name: 'Cheese', price: 10}], cut: true, amount: 60, orderDate: '2021-06-21', dish: {id: 1, name: 'Shawerma', price: 50}, quantity: 2, userID: 1}
        ],
        totalPages: 10,
        totalElements: 50
      }
    }).pipe(delay(3000));
  }

  getCurrent(){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: [
          {orderId: 1, additions: [{id: 1, name: 'Cheese', price: 10}], cut: false, amount: 60, orderDate: '2021-06-21', dish: {id: 1, name: 'Shawerma', price: 50}, quantity: 2, userID: 1},
          {orderId: 2, additions: [{id: 1, name: 'Cheese', price: 10}], cut: true, amount: 60, orderDate: '2021-06-21', dish: {id: 1, name: 'Shawerma', price: 50}, quantity: 2, userID: 1}
      ]
    }).pipe(delay(3000));
  }

  deleteOrder(id: number){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        orderId: id, additions: [{id: 1, name: 'Cheese', price: 10}], cut: false, amount: 60, orderDate: '2021-06-21', dish: {id: 1, name: 'Shawerma', price: 50}, quantity: 2, userID: 1
      }
    }).pipe(delay(3000));
  }

  getOrderStatus(){
    return of({
      status: ResponseStatus.OK,
      errors: [],
      data: {
        status: OrderStatus.OPEN,
        endTime: '2021-06-29 19:00'
      }
    }).pipe(delay(3500));
  }
}

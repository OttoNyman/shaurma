import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { OrderStatusDto } from 'src/app/core/dto/OrderStatusDto';
import { OrderSummaryDto } from 'src/app/core/dto/OrderSummaryDto';
import { OrderSummaryInfoDto } from 'src/app/core/dto/OrderSummaryInfoDto';
import { ProfileDto } from 'src/app/core/dto/ProfileDto';
import { UserDto } from 'src/app/core/dto/UserDto';
import { IPaginator } from 'src/app/core/interfaces/IPaginator';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { environment } from 'src/environments/environment';
import { SummaryApiInterface } from './summary-api.interface';

@Injectable()
export class SummaryApiService extends SummaryApiInterface {
  constructor(private http: HttpClient) {
    super();
  }

  getCurrentCashier(){
    return this.http.get<IResponse<ProfileDto>>(environment.APP_URL + '/cashier/current').pipe(share());
  }

  getCashiers(){
    return this.http.get<IResponse<UserDto[]>>(environment.APP_URL + '/cashier/dropdown').pipe(share());
  }

  getOrderSummaryInfo(date: string){
    return this.http.get<IResponse<OrderSummaryInfoDto>>(environment.APP_URL + '/order/summary/info', {params: {date: date}})
      .pipe(share());
  }

  setCurrentCashier(userID: number){
    return this.http.post<IResponse<ProfileDto>>(environment.APP_URL + `/cashier/current/${userID}`, null)
      .pipe(share());
  }

  getOrderStatus(){
    return this.http.get<IResponse<OrderStatusDto>>(environment.APP_URL + '/order/status').pipe(share());
  }

  orderStart(dateTime: string, userID: number){
    return this.http.post<IResponse<boolean>>(environment.APP_URL + '/order/start', {endTime: dateTime, userId: userID})
      .pipe(share());
  }

  orderStop(){
    return this.http.post<IResponse<boolean>>(environment.APP_URL + '/order/stop', null).pipe(share());
  }

  getSummaryOrder(date: string, page: number, pageSize: number){
    return this.http.get<IResponse<IPaginator<OrderSummaryDto>>>(environment.APP_URL + '/order/summary', {
      params: {page, pageSize, date}
    }).pipe(share());
  }

  payFor(userID: number, orderDate: string, paid: number){
    return this.http.post<IResponse<OrderSummaryDto>>(environment.APP_URL + '/payment/confirm', {
      userId: userID,
      orderDate,
      paid
    }).pipe(share());
  }
}

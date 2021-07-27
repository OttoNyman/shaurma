import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { ResponseStatus } from 'src/app/core/constants/ResponseStatus';
import { DishDropdownDto } from 'src/app/core/dto/DishDropdownDto';
import { OrderItemDto } from 'src/app/core/dto/OrderItemDto';
import { OrderStatusDto } from 'src/app/core/dto/OrderStatusDto';
import { PriceListItemDto } from 'src/app/core/dto/PriceListItemDto';
import { RequestOrderAddDto } from 'src/app/core/dto/RequestOrderAddDto';
import { IPaginator } from 'src/app/core/interfaces/IPaginator';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { ISimpleItem } from 'src/app/core/interfaces/ISimpleItem';
import { ISimplePriceItem } from 'src/app/core/interfaces/ISimplePriceItem';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { environment } from 'src/environments/environment';
import { OrderApiInterface } from './order-api.interface';

@Injectable()
export class OrderApiService extends OrderApiInterface {
  constructor(private http: HttpClient, private userService: UserService, private datePipe: DatePipe) {
    super();
  }

  getDishesList(){
    return this.http
      .get<IResponse<DishDropdownDto[]>>(environment.APP_URL + '/dish/dropdown').pipe(share());
  }

  getAdditionsList(dishID: number){
    return this.http
      .get<IResponse<ISimplePriceItem[]>>(environment.APP_URL + `/additional/dropdown?dishId=${dishID}`).pipe(share());
  }

  getDrinksList(){
    return this.http.get<IResponse<ISimplePriceItem[]>>(environment.APP_URL + '/drink/dropdown').pipe(share());
  }

  getRemarksList(){
    return this.http.get<IResponse<ISimpleItem[]>>(environment.APP_URL + '/remark/dropdown').pipe(share());
  }

  getPricelist(){
    return this.http.get<IResponse<PriceListItemDto[]>>(environment.APP_URL + '/price').pipe(share());
  }

  makeNewOrder(data: RequestOrderAddDto){
    return this.http.post<IResponse<OrderItemDto>>(environment.APP_URL + '/order', data).pipe(share());
  }

  getHistory(page: number, pageSize: number){
    const userID = this.userService.getUser().value.id;

    return this.http
      .get<IResponse<IPaginator<OrderItemDto>>>(environment.APP_URL + `/order/history/${userID}`, {
        params: {page, pageSize}
      }).pipe(share());
  }

  getCurrent(){
    const date = new Date();

    return this.http
      .get<IResponse<OrderItemDto[]>>(environment.APP_URL + '/order', {params: {
          userId: this.userService.getUser().value.id, 
          date: this.datePipe.transform(date, 'YYYY-MM-dd')
        }}).pipe(share());
  }

  deleteOrder(id: number){
    return this.http
      .delete<IResponse<OrderItemDto>>(environment.APP_URL + `/order/${id}`).pipe(share());
  }

  getOrderStatus(){
    return this.http
      .get<IResponse<OrderStatusDto>>(environment.APP_URL + '/order/status').pipe(share());
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { ResponseOrderDeliveryDto } from 'src/app/core/dto/ResponseOrderDeliveryDto';
import { IPaginator } from 'src/app/core/interfaces/IPaginator';
import { IResponse } from 'src/app/core/interfaces/IResponse';
import { environment } from 'src/environments/environment';
import { DeliveryApiInterface } from './delivery-api.interface';
import {DeliveryGeneralDto} from '../../../../core/dto/DeliveryGeneralDto';

@Injectable()
export class DeliveryApiService extends DeliveryApiInterface {
  constructor(private http: HttpClient) {
    super();
  }

  getDeliveryGeneral(date: string){
    return this.http
      .get<IResponse<DeliveryGeneralDto>>(environment.APP_URL + '/order/delivery/general', {params: {dateStr: date}})
      .pipe(share());
  }

  getDeliveryOrder(date: string, page: number, pageSize: number){
    return this.http
      .get<IResponse<IPaginator<ResponseOrderDeliveryDto>>>(environment.APP_URL + '/order/delivery', {
        params: {dateStr: date, pageSize, page}
      }).pipe(share());
  }

  exportReport(date: string){
      return this.http
          .get<IResponse<string>>(environment.APP_URL + '/order/delivery/print', {
              params: {dateStr: date}
          });
  }
}

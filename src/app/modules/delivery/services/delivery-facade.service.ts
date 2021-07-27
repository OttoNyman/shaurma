import { Injectable } from '@angular/core';
import { DeliveryApiInterface } from './api/delivery-api.interface';

@Injectable()
export class DeliveryFacadeService {
  constructor(private deliveryApi: DeliveryApiInterface){}

  getDeliveryGeneral(date: string){
    return this.deliveryApi.getDeliveryGeneral(date);
  }

  getDeliveryOrder(date: string, page: number, pageSize: number){
    return this.deliveryApi.getDeliveryOrder(date, page, pageSize);
  }

  exportReport(date: string){
      return this.deliveryApi.exportReport(date);
  }
}

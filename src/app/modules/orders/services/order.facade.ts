import { Injectable } from '@angular/core';
import { RequestOrderAddDto } from 'src/app/core/dto/RequestOrderAddDto';
import { OrderApiInterface } from './api/order-api.interface';

@Injectable()
export class OrderFacade {
  constructor(private orderApi: OrderApiInterface) { }

  getDishesList(){
    return this.orderApi.getDishesList();
  }

  getAdditionsList(dishID: number){
    return this.orderApi.getAdditionsList(dishID);
  }

  getDrinksList(){
    return this.orderApi.getDrinksList();
  }

  getRemarksList(){
    return this.orderApi.getRemarksList();
  }

  getPricelist(){
    return this.orderApi.getPricelist();
  }

  makeNewOrder(data: RequestOrderAddDto){
    return this.orderApi.makeNewOrder(data);
  }

  getHistory(page: number, pageSize: number){
    return this.orderApi.getHistory(page, pageSize);
  }

  getCurrent(){
    return this.orderApi.getCurrent();
  }

  deleteOrder(id: number){
    return this.orderApi.deleteOrder(id);
  }

  getOrderStatus(){
    return this.orderApi.getOrderStatus();
  }
}

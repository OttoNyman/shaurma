import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { SummaryApiInterface } from './api/summary-api.interface';

@Injectable()
export class SummaryFacadeService {
  constructor(private api: SummaryApiInterface, private userService: UserService, private datePipe: DatePipe) { }

  getCurrentCashier(){
    return this.api.getCurrentCashier();
  }

  getCashiers(){
    return this.api.getCashiers();
  }

  getOrderSummaryInfo(date: string){
    return this.api.getOrderSummaryInfo(date);
  }

  setCurrentCashier(userID: number){
    return this.api.setCurrentCashier(userID);
  }

  getOrderStatus(){
    return this.api.getOrderStatus();
  }

  orderStart(dateTime: Date){
    const dateStr = this.datePipe.transform(dateTime, 'yyyy-LL-ddTHH:mm:ss');
    return this.api.orderStart(dateStr, this.userService.getUser().value.id);
  }

  orderStop(){
    return this.api.orderStop();
  }

  getSummaryOrder(date: Date, page: number, pageSize: number){
    return this.api.getSummaryOrder(this.datePipe.transform(date, 'yyyy-LL-dd'), page, pageSize);
  }

  payFor(userID: number, orderDate: string, paid: number){
      return this.api.payFor(userID, orderDate, paid);
  }
}

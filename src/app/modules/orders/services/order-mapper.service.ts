import { Injectable } from '@angular/core';
import { OrderItemDto } from 'src/app/core/dto/OrderItemDto';
import { RequestOrderAddDto } from 'src/app/core/dto/RequestOrderAddDto';
import { UserService } from 'src/app/shared/modules/general/user.service';
import { NewOrderData } from '../components/new-order-form/new-order-form.component';

@Injectable({
  providedIn: 'root'
})
export class OrderMapperService {
  constructor(private userSvc: UserService){}

  toMakeOrderRequest(data: NewOrderData): RequestOrderAddDto{
    return {
      dish: data.dish.id,
      additions: data.additions.filter(add => add).map(add => add.id),
      quantity: data.quantity,
      cut: data.cut,
      drink: data.drink?.id,
      remark: data.remark?.id,
      userId: this.userSvc.getUserValue().id
    }
  }

  toRestoreForm(item: OrderItemDto): NewOrderData{
    return {
      additions: item.additions,
      cut: item.cut,
      dish: item.dish as any,
      quantity: item.quantity,
      drink: item.drink,
      remark: item.remark
    }
  }
}

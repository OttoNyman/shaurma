import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrderItemDto } from '../dto/OrderItemDto';

@Pipe({
  name: 'orderToString'
})
export class OrderToStringPipe implements PipeTransform {
  constructor(private translateSvc: TranslateService){}

  transform(order: OrderItemDto, withQuantity: boolean = false): string {
    let result = '';

    if (withQuantity)
      result += order.quantity + ' x  ';

    result += order.dish?.name || '';

    if(order.cut)
      result += ' / ' + this.translateSvc.instant('CUT');

    if (order.additions?.length && order.additions[0].id)
      result += ' / ' + order.additions.map(add => add.name).join(', ');

    if (order.drink?.id)
      result += (order.dish?.name ? ' / ' : '') + order.drink.name;

    if (order.remark?.id)
      result += ' / ' + order.remark.name;

    return result;
  }
}

import { Injectable } from '@angular/core';
import { UserDto } from 'src/app/core/dto/UserDto';
import { ISelectItem } from 'src/app/shared/modules/form-elements/select/select.component';

@Injectable()
export class SummaryMapperService {
  fromCashiersToSelect(cashiers: UserDto[]): ISelectItem[]{
    return cashiers.map(cashier => this.fromCashierToSelect(cashier));
  }

  fromCashierToSelect(cashier: UserDto): ISelectItem{
    return {
      name: cashier.firstName + ' ' + cashier.lastName + ' ' + cashier.phone,
      id: cashier.id
    };
  }
}

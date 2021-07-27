import { Component, Input } from '@angular/core';
import { PriceListTypes } from 'src/app/core/constants/PriceListTypes';
import { PriceListItemDto } from 'src/app/core/dto/PriceListItemDto';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.scss']
})
export class PricelistComponent {
  @Input() prices: Array<PriceListItemDto> = [];

  private getPricesForType(type: PriceListTypes){
    return this.prices.filter(priceItem => priceItem.type == type);
  }

  get dishesPrice(){
    return this.getPricesForType(PriceListTypes.DISH);
  }

  get additionsPrice(){
    return this.getPricesForType(PriceListTypes.ADDITION);
  }

  get drinksPrice(){
    return this.getPricesForType(PriceListTypes.DRINK);
  }
}

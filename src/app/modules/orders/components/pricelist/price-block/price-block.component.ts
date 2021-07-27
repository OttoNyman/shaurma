import { Component, Input } from '@angular/core';
import { PriceListItemDto } from 'src/app/core/dto/PriceListItemDto';

@Component({
  selector: 'app-price-block',
  templateUrl: './price-block.component.html',
  styleUrls: ['./price-block.component.scss']
})
export class PriceBlockComponent {
  @Input() prices: Array<PriceListItemDto> = [];
  @Input() title = '';
}

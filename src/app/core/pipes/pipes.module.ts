import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionsToStringPipe } from './additions-to-string.pipe';
import { BackgroundUrlPipe } from './background-url.pipe';
import { OrderToStringPipe } from './order-to-string.pipe';
import { FormatCardPipe } from './format-card.pipe';



@NgModule({
  declarations: [AdditionsToStringPipe, BackgroundUrlPipe, OrderToStringPipe, FormatCardPipe],
  imports: [CommonModule],
  exports: [AdditionsToStringPipe, OrderToStringPipe, BackgroundUrlPipe, FormatCardPipe]
})
export class PipesModule { }

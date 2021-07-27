import { Pipe, PipeTransform } from '@angular/core';
import { ISimplePriceItem } from '../interfaces/ISimplePriceItem';

@Pipe({
  name: 'additionsToString'
})
export class AdditionsToStringPipe implements PipeTransform {
  transform(additions: ISimplePriceItem[]): string {
    return additions.map(add => add.name).join(', ');
  }
}

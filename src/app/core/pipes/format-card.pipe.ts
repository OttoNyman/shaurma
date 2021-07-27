import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCard'
})
export class FormatCardPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\D/g, '').replace(/\d{4}/g, val => val + ' ');
  }

}

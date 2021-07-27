import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backgroundUrl'
})
export class BackgroundUrlPipe implements PipeTransform {
  transform(value: string): string {
    return `url(${value})`;
  }
}

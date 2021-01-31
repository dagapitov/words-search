import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return `${Math.round(value * 100)} %`;
  }
}

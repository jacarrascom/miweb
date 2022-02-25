import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(number: number, numberDecimal: number): string {
    const f = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: numberDecimal
    })
    console.log(f.format(number))
    return f.format(number).split('€')[1];
  }
}

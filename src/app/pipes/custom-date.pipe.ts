import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, args?: any): Date {
    let res = value.replace(/a.m.|p.m./gi, '');  
    return new Date(res);
  }

}

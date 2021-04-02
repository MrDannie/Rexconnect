import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resolveTimeDiffernce',
})
export class ResolveTimeDifferncePipe implements PipeTransform {
  transform(when: any, args?: any): any {
    let dateString = when.split(' ')[0];
    let timeString = when.split(' ')[1];

    // Add one hour to timeString

    timeString = timeString.split(':').join('');
    if (+timeString < 90000) {
      timeString = String(+timeString + +'10000');
      timeString = '0' + timeString;
      timeString = [
        timeString.slice(0, 2),
        ':',
        timeString.slice(2, 4),
        ':',
        timeString.slice(4, 6),
      ].join('');

      return dateString + ' ' + timeString;
    } else {
      timeString = String(+timeString + +'10000');
      timeString = [
        timeString.slice(0, 2),
        ':',
        timeString.slice(2, 4),
        ':',
        timeString.slice(4, 6),
      ].join('');

      return dateString + ' ' + timeString;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitize',
})
export class SanitizePermissionsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.replace(/_/g, ' ').replace('CAN', '');
  }
}

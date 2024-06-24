import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DataToName', pure: false })
export class DataToNamePipe implements PipeTransform {
  transform(value: any, data: any): any {
    if (!value || !data) {
      return '';
    }
    const res = data?.find((item: any) => item.value == value);
    return res?.name ? res.name : '';

  }
}

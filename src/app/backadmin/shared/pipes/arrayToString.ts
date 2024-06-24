import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ToString', pure: false })
export class ArrayToStringPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) {
      return '';
    }
    const res = value?.map((item: any) => item.name );
    return res.join(', ');
  }
}

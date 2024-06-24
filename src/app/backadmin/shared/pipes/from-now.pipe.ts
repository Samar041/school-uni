import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow',
  pure: false
})
export class FromNowPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    moment.locale('fr');
    const date = moment(value);
    return date.fromNow();
  }
}

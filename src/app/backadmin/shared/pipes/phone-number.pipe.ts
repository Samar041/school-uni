import { Pipe, PipeTransform } from '@angular/core';
import * as phone from 'google-libphonenumber';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    const phoneUtil = phone.PhoneNumberUtil.getInstance();
    let phoneNumber;
    try {
      phoneNumber = phoneUtil.parse(value, 'FR');
    } catch (e) {
      console.error(`Error parsing phone number: ${e}`);
      return value; 
    }
    const formattedNumber = phoneUtil.format(phoneNumber, phone.PhoneNumberFormat.INTERNATIONAL);
    return formattedNumber;
  }
}

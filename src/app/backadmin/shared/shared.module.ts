import { SafeURLPipe } from './pipes/safe-url.pipe';
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";
import { NgModule } from '@angular/core';
import { IconsComponent } from './icons/icons.component';
import { DataToNamePipe } from './pipes/dataName.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { FromNowPipe } from './pipes/from-now.pipe'
import { ArrayToStringPipe } from './pipes/arrayToString';

@NgModule({
  declarations: [SafeHtmlPipe, SafeURLPipe, IconsComponent, DataToNamePipe, PhoneNumberPipe, FromNowPipe, ArrayToStringPipe],
  exports: [SafeHtmlPipe, SafeURLPipe, IconsComponent, DataToNamePipe, PhoneNumberPipe, FromNowPipe, ArrayToStringPipe],
})
export class SharedModule { }

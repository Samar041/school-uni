import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private translate: TranslateService) {
    translate.addLangs(['fr'])
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
}

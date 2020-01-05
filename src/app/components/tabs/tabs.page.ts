import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  samplesTitle: string;
  customsTitle: string;

  constructor(private translate: TranslateService) {
    this.samplesTitle = translate.instant('tab1.sample_exercises');
    this.customsTitle = translate.instant('tab2.custom_exercises');
  }

}

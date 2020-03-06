import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateService } from '@ngx-translate/core';

import {registerWebPlugin} from "@capacitor/core";
import {OAuth2Client} from '@byteowls/capacitor-oauth2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    registerWebPlugin(OAuth2Client);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initTranslate();
    });
  }

  private initTranslate()
  {
     this.translate.setDefaultLang('en');


     if (this.translate.getBrowserLang() !== undefined)
     {
         this.translate.use(this.translate.getBrowserLang());
     }
     else
     {
         this.translate.use('en');
     }
  }
}

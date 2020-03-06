import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropboxService } from 'src/app/services/cloud/dropbox.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  title: string;
  miscConnectionError: string;
  connectionRefusedError: string;
  connectionError: string;

  constructor(private translate: TranslateService, 
    private dropbox: DropboxService,
    private alertController: AlertController) {
    this.title = this.translate.instant('tab2.custom_exercises');
    this.miscConnectionError = this.translate.instant('cloud.misc_error');
    this.connectionRefusedError = this.translate.instant('cloud.user_refusal_error');
    this.connectionError = this.translate.instant('cloud.connection_error');
  }

  private async connectToDropbox() {
    try {
      await this.dropbox.connect();
    }
    catch (error) {
      let errToDisplay = this.miscConnectionError;
      if (error === 'ERR_NO_ACCESS_TOKEN' || error === 'USER_CANCELLED') {
        errToDisplay = this.connectionRefusedError;
      }
      const alert = await this.alertController.create({
        header: this.connectionError,
        message: errToDisplay,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

}

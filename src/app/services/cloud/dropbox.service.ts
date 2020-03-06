import Configurations from './configurations';

const {dropbox} = Configurations;

import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  private accessToken: String;

  connect() {
    return new Promise((resolve, reject) => {
      if (! [null, undefined].includes(this.accessToken)) {
        resolve();
        return;
      };
  
      Plugins.OAuth2Client.authenticate(
        dropbox
      ).then(resourceUrlResponse => {
        this.accessToken = resourceUrlResponse["access_token"];
        resolve();
      }).catch(reason => {
          const message = reason.message;
          reject(message);
      });
    });
  }
  
}

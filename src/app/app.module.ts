import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { Loloof64ChessPromotionPageModule } from './pages/loloof64-chess-promotion/loloof64-chess-promotion.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
     BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule, 
     HttpClientModule,
     Loloof64ChessPromotionPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

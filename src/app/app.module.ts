import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { AccountinfoPage } from '../pages/accountinfo/accountinfo';
import { DoorauthenticPage } from '../pages/doorauthentic/doorauthentic';
import { LoginPage } from '../pages/login/login';
import { XtvthistoryPage } from '../pages/xtvthistory/xtvthistory'; 
import { SignupPage } from '../pages/signup/signup';
import { UpdatePage } from '../pages/update/update';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { MyproviderProvider } from '../providers/myprovider/myprovider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    AccountinfoPage,
    DoorauthenticPage,
    LoginPage,
    XtvthistoryPage,
    SignupPage,
    UpdatePage
  ],
  imports: [
    BrowserModule,
    HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    AccountinfoPage,
    DoorauthenticPage,
    LoginPage,
    XtvthistoryPage,
    SignupPage,
    UpdatePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyproviderProvider
  ]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountinfoPage } from './accountinfo';

@NgModule({
  declarations: [
    AccountinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountinfoPage),
  ],
})
export class AccountinfoPageModule {}

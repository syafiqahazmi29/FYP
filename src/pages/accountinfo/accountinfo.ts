import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { isEmbeddedView } from '@angular/core/src/view/util';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';

import { UpdatePage } from '../update/update';
/**
 * Generated class for the AccountinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accountinfo',
  templateUrl: 'accountinfo.html',
})
export class AccountinfoPage {

  userdata: any = [];
  user: any = {};
  id: any ={};
  passval: any;

  constructor(public navController: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
    
    // console.log("haha")
    this.userdata = JSON.parse(localStorage.getItem('userlogin')) || [];
    console.log(this.userdata[0].user_email);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountinfoPage');
  }

  refresh()
  {

  }

  update()
  {
    this.navController.push(UpdatePage);
  }


}

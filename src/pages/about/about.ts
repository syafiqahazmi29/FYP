import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import jsSHA from 'jssha';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  encrypt: string;
  decrypt: string;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  let shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.update ("This is a password");
  this.encrypt = shaObj.getHash("HEX");
  // console.log(this.encrypt);

  let shaObje = new jsSHA("SHA-256", "TEXT");
  shaObje.update ("This is a password");
  this.decrypt = shaObje.getHash("HEX");
  // console.log(this.decrypt);

  if(this.encrypt == this.decrypt)
  {
    // console.log("sama");
  }else
  {
    // console.log("tak sama");
  }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AboutPage');
  }

}

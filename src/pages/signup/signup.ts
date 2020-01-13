import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { isEmbeddedView } from '@angular/core/src/view/util';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import jsSHA from 'jssha';

import { LoginPage } from '../login/login'
import { MyproviderProvider } from '../../providers/myprovider/myprovider';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: any = {};
  data: string;
  usergender: string;
  encrypt: string;
  Cencrypt : string;

  @ViewChild("fullname") fullname;
  @ViewChild("gender") gender;
  @ViewChild("email") email;
  @ViewChild("id") id;
  @ViewChild("phone") phone;
  @ViewChild("username") username;
  @ViewChild("password") password;
  @ViewChild("confirmpass") confirmpass;


  constructor(public provider: MyproviderProvider, public navCtrl: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  NavPageLogin (){
    this.navCtrl.setRoot(LoginPage);
  }

  public optionsFn(): void { //here item is an object 
    // console.log(this.gender);

    let item = this.gender; // Just did this in order to avoid changing the next lines of code :P
    this.usergender = item;
    
    // console.log(this.usergender);
    
  }

  signUp(){

    let shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.update (this.user.password);
  this.encrypt = shaObj.getHash("HEX");
  // console.log(this.encrypt);

  let shaObje = new jsSHA("SHA-256", "TEXT");
  shaObje.update (this.user.confirmpass);
  this.Cencrypt = shaObje.getHash("HEX");
  // console.log(this.Cencrypt);

    // console.log("masuk tak ni?");
    var headers = new Headers();
				headers.append("Accept", 'application/json');
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });

				let data = {
          id: this.user.id,
          fullname: this.user.fullname,
          gender: this.usergender,
          email: this.user.email,
          phone: this.user.phone,
          username: this.user.username,
          password: this.encrypt,
          confirmpass:  this.Cencrypt
        };

        // console.log(data);
				// console.log(JSON.stringify(data));
        
        this.http.post(this.provider.BASE_URL + 'psmDB/signup.php', JSON.stringify(data), options)
						.map(res => res.json())
						.subscribe(data => {
							// console.log(data)
              // console.log("masuk");
              // console.log(data.data[0]);
              // this.navController.setRoot(HomePage);
							// loader.dismiss()
							if (data.resp == "Registration successfull") {
                let alert = this.alertCtrl.create({
									title: "Register Successfully!",
									// subTitle: (data.message),
									buttons: ['OK']
                });
                alert.present();
                this.navCtrl.setRoot(LoginPage);
              }
              else
              {

								let alert = this.alertCtrl.create({
									title: "Error!",
									subTitle: (data.message),
									buttons: ['OK']
                });
                alert.present();
              }
          
            
          });
  }
}

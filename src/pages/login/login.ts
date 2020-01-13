import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { isEmbeddedView } from '@angular/core/src/view/util';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import jsSHA from 'jssha';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {};

	@ViewChild("username") username;
  @ViewChild("password") password;
  data: string;
	userdata: any ;
	encrypt: string;

  constructor(public navController: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public provider: MyproviderProvider) {
  }
  login() {
		this.events.publish('user:login');
		console.log(this.userdata);
		console.log('ionViewDidLoad LoginPage');
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  NavPageSignup(){
    this.navController.push(SignupPage);
  }

  NavHomePage(){
    this.navController.setRoot(HomePage);
  }

  signIn() {

		let shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.update (this.user.password);
  this.encrypt = shaObj.getHash("HEX");
  // console.log(this.encrypt);

		if (this.username.value == "") {

			let alert = this.alertCtrl.create({

				title: "Error!",
				subTitle: "Username field is empty",
				buttons: ['OK']
			});

			alert.present();
		} else

		if (this.password.value == "") {

			let alert = this.alertCtrl.create({

				title: "Error!",
				subTitle: "Password field is empty",
				buttons: ['OK']
			});

			alert.present();

		} else 
		
		{



				var headers = new Headers();
				headers.append("Accept", 'application/json');
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });

				let data = {
					username: this.user.username,
					password: this.encrypt
				};

				// console.log(data);
				// console.log(JSON.stringify(data));



				// let loader = this.loadingCtrl.create({
				// 	content: 'Processing please wait...',
				// });


				// loader.present().then(() => {

					// console.log(this.provider.BASE_URL + 'psmDB/login.php');
					
					this.http.post(this.provider.BASE_URL + 'psmDB/login.php', JSON.stringify(data), options)
						.map(res => res.json())
						.subscribe(data => {
							// console.log(data)
              // console.log("masuk");
              // this.navController.setRoot(HomePage);
							// loader.dismiss()
							if (data.status == "true") {
                let alert = this.alertCtrl.create({
									title: "Welcome!",
									// subTitle: (data.message),
									buttons: ['OK']
								});
								
								localStorage.clear();
								var logindata = JSON.parse(localStorage.getItem('userlogin')) || [];
								// console.log("masuk dalam lagi");
								// console.log(data.data);
								logindata.push(data.data[0]);
								localStorage.setItem('userlogin', JSON.stringify(logindata))
								
								// console.log(logindata);

                alert.present();
                this.navController.setRoot(HomePage);
              }
							else
							
							if(data.status == "false")
              {

								let alert = this.alertCtrl.create({
									title: "Error!",
									subTitle: (data.message),
									buttons: ['OK']
                });
                alert.present();
              }
								
								
              // }
          
            
          });
        }

			}
}

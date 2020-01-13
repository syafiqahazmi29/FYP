import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { isEmbeddedView } from '@angular/core/src/view/util';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { AccountinfoPage } from '../accountinfo/accountinfo';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';


/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  user: any = {};
  userdata: any = [];
  newdata: any = [];
  passval: any;
  newName: any;
  newPhone: any;
  newEmail: any;
  newUsername: any;
  newPassword: any;
  newCPassword: any;

  @ViewChild("name") name;
  @ViewChild("name") email;
  @ViewChild("name") phone;
  @ViewChild("name") username;
  @ViewChild("name") password;
  @ViewChild("name") cpassword;

  constructor(public provider: MyproviderProvider, public navController: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
    this.userdata = JSON.parse(localStorage.getItem('userlogin')) || [];
    // console.log(this.userdata[0].user_id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }

  pop(_passval) {
    
    this.newName = this.user.name;
    this.newPhone = this.user.phone;
    this.newEmail = this.user.email;
    this.newUsername = this.user.username;
    this.newPassword = this.user.password;
    this.newCPassword = this.user.cpassword;
    // console.log(this.newName);
    // console.log(this.passval);

    if (this.newName == null) {
      let alert = this.alertCtrl.create({

        title: "Error: name empty",
        subTitle: "Please Complete The Form.",
        buttons: ['OK']
      });

      alert.present();

    }
    else if (this.newPhone == null) {
      let alert = this.alertCtrl.create({

        title: "Error: phone empty",
        subTitle: "Please Complete The Form.",
        buttons: ['OK']
      });

      alert.present();
    }
    else if (this.newUsername == null) {
      let alert = this.alertCtrl.create({

        title: "Error: username empty",
        subTitle: "Please Complete The Form.",
        buttons: ['OK']
      });

      alert.present();
    }
    else if (this.newPassword == null) {
      let alert = this.alertCtrl.create({

        title: "Error: password empty",
        subTitle: "Please Complete The Form.",
        buttons: ['OK']
      });

      alert.present();
    }
    else if (this.newCPassword == null) {
      let alert = this.alertCtrl.create({

        title: "Error: confirm password empty",
        subTitle: "Please Complete The Form.",
        buttons: ['OK']
      });

      alert.present();
    }
    else if (this.newEmail == null) {
      let alert = this.alertCtrl.create({

        title: "Error: Email is empty",
        subTitle: "Please Complete The Form.",
        buttons: ['OK']
      });

      alert.present();
    }
    else{
      if (this.newPassword == this.newCPassword) {
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let data = {
          ID: this.userdata[0].user_id,
          fullname: this.newName,
          email: this.newEmail,
          phone: this.newPhone,
          username: this.newUsername,
          password: this.newPassword

          
        };
        // console.log(data);

        let loader = this.loadingCtrl.create({
          content: 'Processing please wait...',
        });

        // console.log("masuk");


        this.http.post(this.provider.BASE_URL + 'psmDB/fetch.php' , JSON.stringify(data), options)
          .map(res => res.json())
          .subscribe(data => {

            localStorage.clear();

            var logindata = JSON.parse(localStorage.getItem('userlogin')) || [];
								// console.log("masuk dalam lagi");
								// console.log(data.data);
								logindata.push(data.data[0]);
                localStorage.setItem('userlogin', JSON.stringify(logindata))
               
                // console.log(data);
            
            // console.log("fetch array");
            // console.log(data.data[0]);
           
           this.userdata = JSON.parse(localStorage.getItem('userlogin')) || [];
          //  console.log(this.userdata[0].user_name);

           
            loader.dismiss()

            // console.log("sedapnya");
            this.navController.setRoot(AccountinfoPage);
          });
        
        // console.log("dalam lagi masukkkkk");

        
      }
      else {
        let alert = this.alertCtrl.create({
          title: "ERROR",
          subTitle: "Mismatch Password",
          buttons: ['OK']
        });

        alert.present();
      }
    }

  }

}

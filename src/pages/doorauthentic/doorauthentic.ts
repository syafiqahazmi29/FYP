import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { isEmbeddedView } from '@angular/core/src/view/util';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';


/**
 * Generated class for the DoorauthenticPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doorauthentic',
  templateUrl: 'doorauthentic.html',
})
export class DoorauthenticPage{

  @ViewChild("verify") verify;
  user: any = {};
  public Status:boolean = true;
  ToggleDisabled: boolean = false;
  InputDisabled: boolean = false;
  ButtonDisabled: boolean = false;
  userdata: any = [];
  min : number;
  max : number;
  code: any;
  searchresult : any;
  distance: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public provider: MyproviderProvider) {
    
    this.userdata = JSON.parse(localStorage.getItem('userlogin')) || [];

    this.min = Math.ceil(100000);
    this.max = Math.floor(999999);
    this.code = Math.floor(Math.random() * (this.max - this.min)) + this.min;
    
    // console.log (this.code);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoorauthenticPage');
  }

request()
{





  
 


  // console.log("masuk tak ni?");
    var headers = new Headers();
				headers.append("Accept", 'application/json');
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });

				let Indata = {
          generateNo: this.code,
          user: this.userdata[0].user_name,
          id: this.userdata[0].user_id,
          phone: this.userdata[0].user_phone,
          username: this.userdata[0].user_usrname,
          email: this.userdata[0].user_email,
        };

        let data = {
          generateNo: this.code,
          email: this.userdata[0].user_email,
          phone: this.userdata[0].user_phone,
        };

        // console.log(Indata);
        // console.log(JSON.stringify(data));
        
        this.http.post(this.provider.BASE_URL + 'psmDB/sonarDistance.php', JSON.stringify(data), options).map(res => res.json())
      .subscribe(data => {
        this.distance = data.distance;
        console.log(this.distance);
      });

      if(this.distance < 400)
      {
        this.http.post(this.provider.BASE_URL + 'psmDB/requestRAC.php', JSON.stringify(data), options)
						.map(res => res.json())
						.subscribe(data => {

							if (data.status == true) {
                let alert = this.alertCtrl.create({
									title: (data.message),
									buttons: ['OK']
                });
                alert.present();              }
              else
              {

								let alert = this.alertCtrl.create({
									title: "Alert !",
									subTitle: (data.message),
									buttons: ['OK']
                });
                alert.present();
              }
          
            
          });

          this.InputDisabled = true;
  this.ButtonDisabled = true;
      }
      else
      {
        let alert = this.alertCtrl.create({
          title: "Alert !",
          subTitle: ("Invalid Request"),
          buttons: ['OK']
        });
        alert.present();
      }

        
        
  }

  verifying()
  {
    if(this.code == this.user.verify)
    {
      this.ToggleDisabled= true;
    }
    else
    {
      let alert = this.alertCtrl.create({
        title: "Error!",
        subTitle: "Mismatch RAC Code",
        buttons: ['OK']
      });
      alert.present();
    }
  }

  change()
  {

    var headers = new Headers();
				headers.append("Accept", 'application/json');
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });

				let data = {
          name: this.userdata[0].user_name,
          id: this.userdata[0].user_id,
          phone: this.userdata[0].user_phone,
          username: this.userdata[0].user_usrname,
        };

        // console.log(data);

    if(this.Status == true)
    {
      this.http.post(this.provider.BASE_URL + 'psmDB/lockDoor.php', JSON.stringify(data), options)
      .map(res => res.json())
      .subscribe(data => {
        this.searchresult = data;
        console.log(this.searchresult);
      });
    }

    if(this.Status == false)
    {
      this.http.post(this.provider.BASE_URL + 'psmDB/unlockDoor.php', JSON.stringify(data), options)
      .map(res => res.json())
        .subscribe(data => {
        this.searchresult = data;
        console.log(this.searchresult);
      });
    }
  }
    
}

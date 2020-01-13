import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { isEmbeddedView } from '@angular/core/src/view/util';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';



import {LoginPage} from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  status : any;
  gambar: any;
  refresh: boolean = false;

  constructor(public provider: MyproviderProvider, public navController: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
    this.refresh = true;
    if(this.refresh == true)
    {
      var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.get(this.provider.BASE_URL + 'psmDB/doorstat.php')
        .map(res => res.json())
        .subscribe(data => {
          // console.log(data)
          // console.log("masuk");
        
          this.status = data[0].door_status;
          // console.log(this.status);
          if(this.status == "Lock")
          {
            this.gambar = "/assets/imgs/kunci2.png";
          }
          else if(this.status == "Unlock")
          {
            this.gambar = "/assets/imgs/kunci.png";
          }
      });

      this.refresh = false
    }

}
NavPageLogin (){
this.navController.push(LoginPage);
}
}

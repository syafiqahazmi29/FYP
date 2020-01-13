import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { MyproviderProvider } from '../../providers/myprovider/myprovider';



/**
 * Generated class for the XtvthistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xtvthistory',
  templateUrl: 'xtvthistory.html',
})
export class XtvthistoryPage {

  searchresult: any ;
  userdata: any = [];

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public provider: MyproviderProvider) {
    this.userdata = JSON.parse(localStorage.getItem('userlogin')) || [];

    var headers = new Headers();
				headers.append("Accept", 'application/json');
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers });

				let data = {
          id: this.userdata[0].user_id,

        };

    this.http.post(this.provider.BASE_URL + 'psmDB/ownhistory.php', JSON.stringify(data), options).map(res => res.json())
      .subscribe(thedata => {
        this.searchresult = thedata;
        // console.log(this.searchresult);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad XtvthistoryPage');
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MyproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyproviderProvider {

  //ip syaf
  // public BASE_URL = 'http://192.168.43.163/';

  //ip annas
  // public BASE_URL = 'http://192.168.43.129/';
  // public BASE_URL = 'http://localhost/';
 
//ip utemanjirr
// public BASE_URL = 'http://10.131.77.251/';

//ip oppo
public BASE_URL = 'http://192.168.43.129/';

  constructor(public http: HttpClient) {
    console.log('Hello MyproviderProvider Provider');
  }

}

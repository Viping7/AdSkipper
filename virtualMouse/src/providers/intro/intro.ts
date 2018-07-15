import { Injectable } from '@angular/core';

/*
  Generated class for the IntroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IntroProvider {
  ip;
  constructor() {
    console.log('Hello IntroProvider Provider');
  }
  setIp(ip){
    this.ip = "http://" + ip+ ":3000";
  }
}

import { HomePage } from './../home/home';
import { IntroProvider } from './../../providers/intro/intro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  msg: string;
  ip;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ipService: IntroProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }
  setIp(ip){
    if(ip && ip.length > 7){
      this.ipService.setIp(ip);
      this.navCtrl.push(HomePage);
  }
  else{
    this.msg = "Please Enter IP"
  }
}
checkVal(ip){
  this.msg = "";
}
}

import { IntroProvider } from './../intro/intro';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketProvider extends Socket{

  constructor(public ip:IntroProvider) {
    super({url:ip.ip,options:{}})
  }

}

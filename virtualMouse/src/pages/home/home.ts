import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Platform} from 'ionic-angular';
import { IntroProvider } from '../../providers/intro/intro';
import { SocketProvider } from '../../providers/socket/socket';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  valueX : any;
  valueY : any;
  startCoords: any;
  endCoords:any; 
  coords: any;
  constructor(public navCtrl: NavController,private socket: SocketProvider, platform: Platform, ipService:IntroProvider) {
    console.log(ipService.ip)
    this.socket.connect();
    this.valueX = platform.width();
    this.valueY = platform.height();
  }
  touchStarted(e){
    if(this.endCoords)
    this.startCoords = this.getCoords(e);
  }

  touchEnded(e){
    this.endCoords = this.coords;
  }

  touchmoved(e){
    this.coords = this.getCoords(e,this.startCoords);
    this.socket.emit('movemouse', this.coords.x+'&'+this.coords.y+'&'+this.valueX +'&' + this.valueY);
  }

  getCoords(event,startCoords?){
    var distance={x:0,y:0};
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY;
    if(startCoords){
    // Calculates distance from starting coordinates
            distance.x = startCoords.x - x
            distance.y = startCoords.y - y
    // Calculates the coordinates where mouse has to be moved  
            x = this.endCoords.x - distance.x;
            y = this.endCoords.y - distance.y
    }
    return {x:x,y:y};
}
  mouseClicked(event){
    this.socket.emit('click', "s");
  }
}

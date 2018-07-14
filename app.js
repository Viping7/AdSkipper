var robot = require("robotjs");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var size =robot.getScreenSize();
let fs = require('fs')
let Jimp = require('jimp')

let size1 = 1366;
let rimg = robot.screen.capture();
let fpath = 'public/myfile.png'

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

io.on('connection', function(socket){
    socket.on('movemouse', function(msg){
        let valueX = size.width/msg.split('&')[2]
        let valueY = size.height/ msg.split('&')[3]
        var xa = valueX * msg.split('&')[0];
        var yb = valueY * msg.split('&')[1];
        robot.moveMouse(xa, yb);
      });
     socket.on('click',function(msg){
        // let jimg = new Jimp(size.width, size.height);
        // for (var x=0; x<size.width; x++) {
        //     for (var y=0; y<size.height; y++) {
        //         var index = (y * rimg.byteWidth) + (x * rimg.bytesPerPixel);
        //         var r = rimg.image[index];
        //         var g = rimg.image[index+1];
        //         var b = rimg.image[index+2];
        //         var num = (r*256) + (g*256*256) + (b*256*256*256) + 255;
        //         jimg.setPixelColor(num, x, y);
        //     }
        // }
        // jimg.write(fpath)
        robot.mouseClick();
     })

  });



  
http.listen(3000, function(){
  console.log('listening on *:3000');
});

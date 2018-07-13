var robot = require("robotjs");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

io.on('connection', function(socket){
    socket.on('movemouse', function(msg){
        var xa = msg.split('&')[0];
        var yb = msg.split('&')[1];
        robot.moveMouse(xa, yb);
      });
     socket.on('click',function(msg){
        robot.mouseClick();
     }) 
  });


http.listen(3000, function(){
  console.log('listening on *:3000');
});

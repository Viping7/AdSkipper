const robot = require("robotjs");
const express = require('express');
const eapp = express();
const http = require('http').Server(eapp);
const path = require('path');
const io = require('socket.io')(http);
const size =robot.getScreenSize();
var coords;
const electron = require("electron");
var ip = require('ip');
robot.setMouseDelay(0)
const {app,BrowserWindow, Menu, ipcMain} = electron;
let mainWindow, newWindow;

eapp.use(express.static(path.join(__dirname,'/public')));
eapp.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.on('ready',function(){
  mainWindow = new BrowserWindow({webSecurity: false});
  mainWindow.loadFile(`index.html`);
  ipcMain.on('ip', function(e,i){
    mainWindow.webContents.send('ip',ip.address());
  });
  mainWindow.on('closed',function(){
      app.quit()
  });
  mainWindow.on('close', function(){
      newWindow = null;
  })



io.on('connection', function(socket){
      socket.on('movemouse', function(msg){
        coords = formatCoordinates(msg);
        robot.moveMouse(coords.x, coords.y);
      });
      socket.on('scroll', function(msg){
        let scoords = formatCoordinates(msg);
        robot.scrollMouse(scoords.x, scoords.y);
      });
      socket.on('click',function(msg){
        robot.mouseClick();
      })
});

function formatCoordinates(msg){
        let valueX = size.width/msg.split('&')[2]
        let valueY = size.height/ msg.split('&')[3]
        var xa = valueX * msg.split('&')[0];
        var yb = valueY * msg.split('&')[1];
        return {x:xa, y:yb};
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
})


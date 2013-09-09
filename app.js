var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var mysql = require('mysql');

//yeji  
var path = require('path');


//database connection
var mysqlConfig = {
host     : 'lattetime.cafe24.com',
port     : '3306',
user     : 'root',
password : 'latte!123',
database : "card",
insecureAuth: true
}

var conn = mysql.createConnection(mysqlConfig);
conn.connect(); //connect to mysql

var config = require("./config");
var main_ctr = require("./main_control");
var battle_ctr = require("./battle_control");
var adventure_ctr = require("./adventure_control");

io.set('log level',1); //disable debug log

app.listen(config.PORT);

console.log("server started \nhost : "+ config.HOST_URL + "\nport : "+ config.PORT);
console.log("===================================================================");

// battle lobby's information - room list
// type : room_inf
var ROOM_LIST = [];
// type : user_inf
// list of logged in users 
var LOGIN_USER_LIST = [];

// add item to list
exports.addRoomInf = function(room_inf){
  ROOM_LIST.push(room_inf);
}
exports.getRoomLength = function(){
  return ROOM_LIST.length;
}
exports.changeRoomInf = function(room_name,room_inf){
    for(var i = 0 ; i < ROOM_LIST.length ; i++){
      if(ROOM_LIST[i].name == room_name){
        ROOM_LIST[i] = room_inf;
      }
  }
}
function changeRoomInf(room_name,room_inf){
  for(var i = 0 ; i < ROOM_LIST.length ; i++){
      if(ROOM_LIST[i].name == room_name){
        ROOM_LIST[i] = room_inf;
      }
  }
}
exports.getRoomList = function(){
  return ROOM_LIST;
}
exports.getRoomInf = function(room_name){
var res;
  for(var i = 0 ; i < ROOM_LIST.length ; i++){
      if(ROOM_LIST[i].name == room_name){
        res = ROOM_LIST[i];
      }
  }
  return res;
}
function getRoomInfByName (room_name){
  var res;
  for(var i = 0 ; i < ROOM_LIST.length ; i++){
      if(ROOM_LIST[i].name == room_name){
        res = ROOM_LIST[i];
      }
  }
  return res;
}
exports.popRoomInf = function(room_name){
  for(var i = 0 ; i < ROOM_LIST.length ; i++){
      if(ROOM_LIST[i].name == room_name){
        ROOM_LIST.splice(i,1)
      }
  };
  //console.log("pop : " + ROOM_LIST);
}
function popRoomInfByName(room_name){ 
  for(var i = 0 ; i < ROOM_LIST.length ; i++){
    if(ROOM_LIST[i].name == room_name)
      ROOM_LIST.splice(i,1);
  }
}
//exports.getRoomNum = function(){
//  var index = ROOM_LIST.length -1;
//  if(index < 0)
//    return 0;
//  return ROOM_LIST[index].num + 1;
//}
exports.addUserInf = function(user_inf){
  //user_inf.session_id = socket.id;
  LOGIN_USER_LIST.push(user_inf);
}
function popUserBySessionId(input_id){
  for(var i = 0 ; i < LOGIN_USER_LIST.length ; i++){
    if(LOGIN_USER_LIST[i].session_id == input_id){
        LOGIN_USER_LIST.splice(i,1);
    }
  }
}
exports.findUserById = function(input_id){
  for(var i = 0 ; i < LOGIN_USER_LIST.length ; i++){
    if(LOGIN_USER_LIST[i].id == input_id){
        return LOGIN_USER_LIST[i];
    }
  }
  return null;
}

//yeji changed all handler function...

function handler (req, res) {

  var filePath = req.url;

  if (filePath == '/') {
      filePath = './index.html';
  }
  else {
    filePath = "."+filePath;
  } 

  var extname = path.extname(filePath);
  var contentType = 'text/html';

  switch (extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.png':
        contentType = 'image/png';
  }

  path.exists(filePath, function(exists) {

    if (exists) {
        fs.readFile(filePath, function(error, content) {
            if (error) {
                res.writeHead(500);
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
    else {
        console.log(filePath);
        res.writeHead(404);
        res.end();
    }
  });
}

//socket connected
io.sockets.on('connection', function (socket) {
 
 console.log("connected client : " + socket.id);
 
 //when receive data from client
  socket.on('data', function (data) {
    
    //message parse & control
    switch(parseInt( parseInt(data.MessageNum,10)/100 )){
      case 1: //message 100 ~ 199
        // call main_control
        main_ctr.call(io,socket,conn,data);
        break;
      case 2: // message 200 ~ 299
        // call battle control
        battle_ctr.call(io,socket,conn,data);
        break;
      case 3: // message 300 ~ 399
    	// call adventure_control
    	adventure_ctr.call(io,socket,conn,data);
        break;
      case 4:
        break;
      default :
        break;
    }
    
  });
  
  socket.on('disconnect', function(data){
      console.log("disconnected client : " + socket.id);    
      
      //if disconnected user is in a room ? close participated room
       var rooms = io.sockets.manager.roomClients[socket.id];
       
      for(var room in rooms){
          room = room.replace('/',''); //get room name
          console.log(room);
          
          if(room.length > 0){ //if user is in the room 
          
            var update_room_res = config.newResponse();
            update_room_res.MessageNum = config.SERVER_REQUEST_UPDATE_ROOM_INF;
            update_room_res.room_name = room;
          
            //if room's user num is 1 - pop room inf from ROOM_LIST
            if(io.sockets.clients(room).length < 2){
              popRoomInfByName(room);
              update_room_res.room_inf = -1;
            }
            else{
              var room_inf = getRoomInfByName(room);
              
              //else - user is host - refresh room inf(change host_inf)
               if(room_inf.host_inf.session_id == socket.id){
                room_inf.host_inf = room_inf.client_inf;
                room_inf.client_inf = -1;
                room_inf.is_idle = true;
                
                changeRoomInf(room_inf.name,room_inf);
                update_room_res.room_inf = room_inf;
              }
              else{ //else user is client - leave the room and refresh room inf
                room_inf.client_inf = -1;
                room_inf.is_idle = true;
                
                changeRoomInf(room_inf.name,room_inf);
                update_room_res.room_inf = room_inf;
              }
            }
            
            socket.leave(room);
            
            //broadcast changed ROOM_LIST
            io.sockets.emit('data',update_room_res);
          } 
      }
      //pop battle inf 
      battle_ctr.popDisconnectedBattleInf(socket.id);
      //pop user from logged in list
      popUserBySessionId(socket.id);
   
      //conn.end();
  });

});


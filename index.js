import { setTimeout, setInterval, clearInterval } from "timers";

var app = require("express")();
var http = require("http").Server(app);

var mConnectingMembers = {};

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    
  });

  socket.on("disconnect", (event)=>{
    delete mConnectingMembers[socket.id];
    if(Object.keys(mConnectingMembers).length == 0){
      stopHeartBeat();
    }
  });

  mConnectingMembers[socket.id] = new Date().getTime();
  startHeartBeat(broadcastRandomData(socket));

});

function broadcastRandomData(socket){
  var eyeData = {
    x: 100,
    y: 100,
    time: new Date().getTime()
  }
  socket.broadcast.emit();
}

var mHeartBeatInterval = null;
var 
function startHeartBeat(callback){
  if(mHeartBeatInterval){
    clearInterval(mHeartBeatInterval);
  }
  mHeartBeatInterval = setInterval(callback, 1000);
}

function stopHeartBeat(){
  clearInterval(mHeartBeatInterval);
  mHeartBeatInterval = null;
}

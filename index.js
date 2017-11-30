var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);

var mConnectingMembers = {};
var mHeartBeatInterval = null;
var x = 0;
var y = 0;
var vx = 0;
var vy = 0;
var ax = 0;
var ay = 0;
var screenWidth = 1920;
var screenHeight = 1200;

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

  socket.on("disconnect", function(event){
    delete mConnectingMembers[socket.id];
    if(Object.keys(mConnectingMembers).length == 0){
      stopHeartBeat();
    }
  });

  socket.on("start_record", function(event){
    mConnectingMembers[socket.id] = new Date().getTime();
    startHeartBeat(()=>broadcastRandomData(socket));
  });


});

function updateAcceralate(){
  ax = Math.random() * 20 - 10;
  ay = Math.random() * 20 - 10;
}

function updateVelocity(){
  vx = ax;
  vy = ay;
}

function updateMetrics(){
  x = x + vx;
  y = y + vy;
}

function broadcastRandomData(socket){
  updateAcceralate();
  updateVelocity();
  updateMetrics();
  var eyeData = {
    x: x,
    y: y,
    time: new Date().getTime() - mConnectingMembers[socket.id]
  }
  console.log(eyeData);
  // console.log(socket.broadcast.emit())
  socket.emit('gazeData',eyeData);
}

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

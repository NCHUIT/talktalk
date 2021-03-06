var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
    // socket.on('disconnect', function(){
    //     io.emit('chat message', "user disconnect");
    // });
    socket.on('chat message', function(msg){
      console.log(msg);
      io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.emit('some event', { for: 'everyone' });

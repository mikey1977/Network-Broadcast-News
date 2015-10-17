var net = require('net');
var hostAddress = '0.0.0.0';
var portName = 6969;
var sockets = [];
//create server and connection listener

//socket can be saved to collection

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var server = net.createServer(function(socket) {

  //push new sockets into array
  sockets.push(socket);

  //goes to server
  console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
  socket.on('data', function(data) {

    //loop through sockets array
    for (var i = 0; i < sockets.length; i++) {
      if (sockets[i] === socket) continue;
      sockets[i].write(socket.remoteAddress + ':' + socket.remotePort + ': ' + data.toString());

      process.stdout.write('SERVER BCAST FROM ' + socket.remoteAddress + ':' + socket.remotePort + ' : ' + data);
      // console.log('SERVER BCAST FROM ' + socket.remoteAddress + ':' + socket.remotePort + ': ' + data);
      // socket.write(socket.remoteAddress + ':' + socket.remotePort + ': ' + data);
    }
  });

  socket.on('end', function() {
    var i = sockets.indexOf(socket);
    // console.log(socket);
    console.log('CLOSED: ' + socket._peername.address + ':' + socket._peername.port);
    sockets.remove(i);
  });

  // socket.on('CLOSED', function(data) {
  //   console.log('CLOSED: ' + socket.remoteAddress + ':' + socket.remotePort);
  // });
});

//listen on PORT 6969, address 0.0.0.0 --> 0.0.0.0:6969
server.listen({
  host: hostAddress,
  port: portName
});


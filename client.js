var net = require('net');
var hostAddress = '0.0.0.0';
var portName = 6969;
var prompt = require('prompt');



var client = new net.Socket();
client.connect(portName, hostAddress, function() {


  // console.log('server listening on ' + client.remoteAddress + client.remotePort);
  console.log('CONNECTED: ' + client.localAddress + ':' + client.localPort);
  // console.log(client.localAddress + client.localPort);
  //as data comes in on stdin
  // client.write('Mike:poundbutt');

  process.stdin.on('data', function(data) {
    console.log(client.localAddress + ':' + client.localPort + ': ' + data);
    //client writes to server, received by other sockets
    client.write(data);

  });
});

//data event handler - data coming from server
client.on('data', function(data) {

  //figure out how to write to socket
  // process.stdin.on('data', data);

  console.log(data.toString());
});

// close event handler
client.on('close', function() {
  console.log('Connection closed');
  // client.destroy(); // kill client after server's response
});

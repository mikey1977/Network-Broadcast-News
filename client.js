var net = require('net');
var hostAddress = '0.0.0.0';
var portName = 6969;

var client = new net.Socket();
client.connect(portName, hostAddress, function() {
  console.log('CONNECTED: ' + hostAddress + ':' + portName);

  //as data comes in on stdin
  process.stdin.on('data', function(data) {

    //client writes to server
    client.write(data);
  });
});

//data event handler - data coming from server
client.on('data', function(data) {

  //figure out how to write to socket
  // process.stdin.on('data', data);

  console.log('Received: ' + data);
});

// close event handler
client.on('close', function() {
  console.log('Connection closed');
  // client.destroy(); // kill client after server's response
});

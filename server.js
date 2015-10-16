var net = require('net');
var hostAddress = '0.0.0.0';
var portName = 6969;
// var client = net.connect({path: '0.0.0.0'});
//IPv4 address(0.0.0.0) host name is default?

//create server and connection listener
var server = net.createServer(function(c) {
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});

//listen on PORT 6969, address 0.0.0.0 --> 0.0.0.0:6969
server.listen({
  host: hostAddress,
  port: portName
});

// socket.connect(portName, hostAddress) {

// }


// var net = require('net');
// var client = net.connect({port: 6969},
//     function() { //'connect' listener
//   console.log('connected to server!');
//   client.write('world!\r\n');
// });
// client.on('data', function(data) {
//   console.log(data.toString());
//   client.end();
// });
// client.on('end', function() {
//   console.log('disconnected from server');
// });
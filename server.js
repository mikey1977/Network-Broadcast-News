var net = require('net');
var hostAddress = '0.0.0.0';
var portName = 6969;
var sockets = [];
var users = { 'Mike' : 'poundbutt', 'Ren' : 'stimpy' };
var login = {};
// var prompt = require('prompt');

// prompt.start();

// prompt.get(['username'], function(err, result) {
//   console.log(' username: ' + result.username);
// })

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
  console.log('Server listening on ' + socket.localAddress + ':' + socket.localPort);
  console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
  socket.on('data', function(data) {
    var illegalLogin = null;

    //array of user names
    var keys = Object.keys(users);
    for (var i = 0; i < keys.length; i++) {
      illegalLogin = false;

      data = data.toString();

      // ex user:password
      var colonIndex = data.indexOf(':');

      //username in client
      var userName = data.substring(0, colonIndex);

      //password in client
      var passWord = data.substring(colonIndex + 1).trim();

      console.log('keys[i]', keys[i]);
      console.log('userName', userName);

      // console.log('passWord', passWord);
      // console.log('users[userName]', users[userName]);
      // console.log('login[userName]', login[userName]);
      //server key and client name

      if (!login[userName]) {

        if (keys[i] === userName) {

          //server password and client password
          console.log('1', users[userName]);
          console.log('2', passWord);
          console.log(users[userName] === passWord);

          if (users[userName] === passWord) {
            console.log(userName + ' ' + passWord + 'login passed');

            // true means logged in
            login[userName] = true;
          } else {

            // console.log('userName', userName);
            illegalLogin = true;
            console.log('Illegal password');
          }
        } else {
          illegalLogin = true;
          console.log('Illegal user name');
        }
      }
    }

    //loop through sockets array
    for (var j = 0; j < sockets.length; j++) {
      if (sockets[j] === socket) continue;

      console.log(socket._handle.fd);
      if (illegalLogin === false) {

        //writes to clients
        sockets[j].write(socket.remoteAddress + ':' + socket.remotePort + ': ' + data.toString());

        process.stdout.write('SERVER BCAST FROM ' + socket.remoteAddress + ':' + socket.remotePort + ' : ' + data);
        // console.log('SERVER BCAST FROM ' + socket.remoteAddress + ':' + socket.remotePort + ': ' + data);
        // socket.write(socket.remoteAddress + ':' + socket.remotePort + ': ' + data);

      } else {
        sockets[j].write('Illegal Login');
        // sockets[i].destroy();
        // sockets[i] = null;
      }
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

//-----------------------------------------------

// var net = require('net');
// var hostAddress = '0.0.0.0';
// var portName = 6969;
// var sockets = [];
// // var prompt = require('prompt');

// // prompt.start();

// // prompt.get(['username'], function(err, result) {
// //   console.log(' username: ' + result.username);
// // })

// //create server and connection listener

// //socket can be saved to collection

// Array.prototype.remove = function(from, to) {
//   var rest = this.slice((to || from) + 1 || this.length);
//   this.length = from < 0 ? this.length + from : from;
//   return this.push.apply(this, rest);
// };

// var server = net.createServer(function(socket) {


//   //push new sockets into array
//   sockets.push(socket);

//   //goes to server
//   console.log('Server listening on ' + socket.localAddress + ':' + socket.localPort);
//   console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
//   socket.on('data', function(data) {

//     //loop through sockets array
//     for (var i = 0; i < sockets.length; i++) {
//       if (sockets[i] === socket) continue;

//     console.log(socket._handle.fd);

//       //writes to clients
//       sockets[i].write(socket.remoteAddress + ':' + socket.remotePort + ': ' + data.toString());

//       process.stdout.write('SERVER BCAST FROM ' + socket.remoteAddress + ':' + socket.remotePort + ' : ' + data);
//       // console.log('SERVER BCAST FROM ' + socket.remoteAddress + ':' + socket.remotePort + ': ' + data);
//       // socket.write(socket.remoteAddress + ':' + socket.remotePort + ': ' + data);
//     }
//   });

//   socket.on('end', function() {
//     var i = sockets.indexOf(socket);
//     // console.log(socket);
//     console.log('CLOSED: ' + socket._peername.address + ':' + socket._peername.port);
//     sockets.remove(i);
//   });

//   // socket.on('CLOSED', function(data) {
//   //   console.log('CLOSED: ' + socket.remoteAddress + ':' + socket.remotePort);
//   // });
// });

// //listen on PORT 6969, address 0.0.0.0 --> 0.0.0.0:6969
// server.listen({
//   host: hostAddress,
//   port: portName
// });
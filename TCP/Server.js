var net = require('net');
var server = net.createServer(function(socket){
 while (true){
  var r = Math.random()* 100 + 1;
  console.log('valor: %s', Math.floor(r));
  a=Math.floor(r)  
  socket.write(a.toString());  
}});


server.listen(9000, '192.168.18.136');
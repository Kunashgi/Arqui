var net = require ('net');
var s = new net.Socket();
s.connect(9000, '192.168.18.136');

s.on('data', function(data){
  data = data.toString();
  console.log('sensor '+ data);
})
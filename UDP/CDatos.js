var net = require('net');
var dgram = require('dgram')
var s = dgram.createSocket("udp4");

s.on ("message", function(msg,rinfo){
    data = (msg.toString('utf8'));
    console.log('sensor 1: '+ data)
}).bind (2001,'192.168.18.136');

var s = new net.Socket();

s.connect(3000, '192.168.18.136');
    s.on('data',function(data){
        data = data.toString();
        console.log('sensor 2: '+data);
    })

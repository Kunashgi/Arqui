var dgram = require('dgram');
var enchufe_udp=dgram.createSocket("udp4");
var net = require('net');
var xmlrpc = require('xmlrpc');
var http = require('http');
var fs = require ('fs');
var url = require ('url');
var mongoose=require('mongoose');
const { Server } = require('engine.io');

///////////////////////////////////////////////////////

var server = http.createServer(function(req, res){
    var objetourl=url.parse(req.url);
    var camino = 'static'+objetourl.pathname;
    if(camino=='static/')
       camino='static/index4.html';
    fs.exists(camino,function(existe){
        if(existe){
            fs.readFile(camino,function(error,data){
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.end(data,"utf-8");
                
            });
        };
    });
    
}).listen(1000, '192.168.1.123');



/////////////////////////////////////////////////////

mongoose.connect('mongodb://localhost/prueba1', function(err){
    if (!err){
        console.log('conectado a mongo');
    }else {
        throw err;
    }

});

///
Sensor = new mongoose.Schema({
    medida: Number,
},{collection: 'sensor1'});

Sensor1 = new mongoose.Schema({
    medida: Number,
},{collection: 'sensor2'});

Sensor2 = new mongoose.Schema({
    medida: Number,
},{collection: 'sensorX'});

//////
Sensor =mongoose.model('prueba1', Sensor);
////
Sensor =mongoose.model('prueba2', Sensor1);
/////
Sensor =mongoose.model('prueba3', Sensor2);
/////////////////////////////////////
var data_udp;
enchufe_udp.on("message", function(msg, info){
    data_udp =msg.toString('utf-8');
    console.log("sensor 2:" + data_udp);

    io.emit('lectura1', data_udp)
///////////////////////////////
Sensor1.collection.insert({medida:data_udp}, function(err,response){
    if (err) throw err;

});

///////////////////////////
});

enchufe_udp.bind(2000,"192.168.1.123");

///////////////////////////////


var io = require('socket.io')(server);
var enchufe_tcp= new net.Socket();
enchufe_tcp.connect(3000, '192.168.1.123');
enchufe_tcp.on('data', function(data){
    data=data.toString();
    console.log('sensor 2:' + data);


    ////////////////////
 io.emit('lectura', data);

    setTimeout(function() {
        var data1=parseInt(data)
        var client = xmlrpc.createClient({host:'192.168.1.123', port: 9000, path: '/'})
        client.methodCall('add',[data1], function (error, value) {
            console.log('respuesta:'+ value);
        })

    }, 100);

    

    Sensor.collection.insert({medida:data}, function(err,response){
        if (err) throw  err;

    });
    //////////////////////////////

   
 });


    


   





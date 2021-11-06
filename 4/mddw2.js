var mongoose = require("mongoose");
var net = require("net");
var xmlrpc = require('xmlrpc')


mongoose.connect("mongodb://localhost/prueba2", function (err) {
  if (!err) {
    console.log("conectado a mongo");
  } else {
    throw err;
  }
});

Sensor = new mongoose.Schema(
  {
    medida: Number,
  },
  { collection: "sensor1" },
);

Sensor = mongoose.model("prueba2", Sensor);

var enchufe_tcp = new net.Socket();
enchufe_tcp.connect(3000, '192.168.1.123');

enchufe_tcp.on("data", function (data) {
  data = data.toString();

 setTimeout(function(){
    var data1 = parseFloat(data)
    var client = xmlrpc.createClient({host:'192.168.1.123', port:8000, path:'/'})

    client.methodCall('add',[data1],function(error,value){

        console.log('respuesta:' + value);
    })

}, 1000)

  console.log("sensor 2: " + data);
  Sensor.collection.insert({ medida: data }, function (err, response) {
    if (err) throw err;
  });
  Sensor.find(function (err, data) {
    if (err) {
      return console.error(err);
    }
    if (data === null) {
      console.log("no hay datos");
    }
    var paquete = new Array();
    data.forEach(function (element) {
      paquete.push(element.medida);
    });
    console.log("la coleccion de datos es: " + paquete);
    var total = paquete.length;
    console.log("El total de datos de la coleccion es: " + total);
  });
});
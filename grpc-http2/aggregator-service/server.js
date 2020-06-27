'use strict';
// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

var PROTO_PATH = __dirname + '/proto/hello.proto';

var express = require('express');
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Env
const serviceAURL = process.env.serviceAURL || "172.18.0.2:30001";


var client = new hello_proto.Greeter(
  serviceAURL,
  grpc.credentials.createInsecure()
);

// App
const app = express();
app.get('/', async(req, res) => {
  console.log(serviceAURL)
  console.log(`calling ${serviceAURL}`);
  
  client.sayHello({}, function(err, response) {
    console.log(err)
    res.send(response.message);
  });
  
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
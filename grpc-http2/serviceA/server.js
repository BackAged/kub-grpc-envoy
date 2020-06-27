'use strict';

const { lookup } = require('dns').promises;
const { hostname } = require('os');

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';


var PROTO_PATH = __dirname + '/proto/hello.proto';

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

async function sayHello(call, callback) {
  const host = (await lookup(hostname(), {})).address;
  callback(null, {message: `Hello World from: ${host}`});
}


function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
  server.bind(`[::]:${PORT}`, grpc.ServerCredentials.createInsecure());
  console.log(`grpc server running on: ${PORT}`)
  server.start();
}

main();
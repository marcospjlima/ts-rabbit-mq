#!/usr/bin/env node

import * as dotenv from 'dotenv';

dotenv.config();

var amqp = require('amqplib/callback_api');

// var args = process.argv.slice(2);

// if (args.length == 0) {
//   console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
//   process.exit(1);
// }

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = process.env.EXCHANGE;
    var rota = process.env.ROTA_IMPAR;
    var fila = process.env.FILA_IMPAR;

    channel.assertExchange(exchange, 'direct', {
      durable: true
    });

    channel.assertQueue(fila, {
      exclusive: false
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      //args.forEach(function(severity) {
        channel.bindQueue(q.queue, exchange, rota);
      //});

      channel.consume(q.queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {
        noAck: true
      });
    });
  });
});
#!/usr/bin/env node

import * as dotenv from 'dotenv';

dotenv.config();

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error, connection) {
    connection.createChannel(function(error, channel) {
        
        var queue =  process.env.FILA_SIMPLES;

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });
    });
});
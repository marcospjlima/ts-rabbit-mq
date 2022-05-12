#!/usr/bin/env node

import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error, connection) {
    connection.createChannel(function (error, channel) {

        var queue = process.env.FILA_SIMPLES;

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            var secs = msg.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", msg.content.toString());
            const jsonCep = JSON.parse(msg.content.toString());
            var { cep } = jsonCep;
            console.log(" [x] Received cep %s", jsonCep);
            //Pesquinsando pelo cep recebido na mensagem no microserviço viacep
            setTimeout(function () {
                axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(function (response) {
                        // handle success
                        const {
                            data: { cep, logradouro, bairro }
                        } = response;
                        console.log('#cep: %s, logradouro: %s, bairro: %s', cep, logradouro, bairro);
                        //console.log(response);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });
    });
});
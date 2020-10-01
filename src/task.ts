#!/usr/bin/env node

import { Request, Response } from "express";
import * as dotenv from 'dotenv';

dotenv.config();

var amqp = require('amqplib/callback_api');

class Task {

    async publishInQueue(request: Request, response: Response){

            await amqp.connect('amqp://localhost', function(error0, connection) {
                if (error0) {
                    throw error0;
                }
                connection.createChannel(function(error1, channel) {
                    if (error1) {
                        throw error1;
                    }
                    var queue =  process.env.FILA_SIMPLES;
                    
                    //var msg = process.argv.slice(2).join(' ') || "Hello World!";
                    var msg = JSON.stringify(request.body)

                    channel.assertQueue(queue, {
                        durable: true
                    });
                    channel.sendToQueue(queue, Buffer.from(msg), {
                        persistent: true
                    });
                    console.log(" [x] Sent '%s'", msg);
                });
                setTimeout(function() {
                    connection.close();
                    //process.exit(0);
                }, 500);
               
            });
            response.send(request.body);
    }



    async publishInExchange(request: Request, response: Response, rota: String, msg: String) {
        await amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'Numeros';
                //var msg = process.argv.slice(2).join(' ') || 'Hello World!';
                //var msg = JSON.stringify(request.body);
                var msg_local = JSON.stringify(msg);

                channel.assertExchange(exchange, 'direct', {
                    durable: true
                });
                channel.publish(exchange, rota, Buffer.from(msg_local));
                console.log(" [x] Sent %s", msg_local);
            });

             setTimeout(function() {
                 connection.close();
            //     //process.exit(0);
             }, 500);

            //connection.close();
        });
    }

    

    async publishInExchangeNumbers (request: Request, response: Response){

        //Parametro vindo no JSON enviado no POST
        const { numInicio, total } = request.body;        
        
        var dif = Number(total) - Number(numInicio);
        var pode = false;
        if (dif > 150){
            response.send({
                'aviso' : 'A diferença entre os números não pode ser superior a 150 para esse exemplo'
            });

        } else {
            pode = true;
        }

        if (pode){
            for (var i = Number(numInicio); i <= Number(total); i++){
                var rota = 'par';
    
                if (i % 2 != 0 ){
                    rota = 'impar';
                }
                
                var str_num = '{ "numero" : "' + i + '"} ' ;
                var msg = str_num;
    
                //Enviando a mensagem para o EXCHANGE com sua ROTA definida
                //dependendo da rota (PAR ou IMPAR) a mensagem vai para a FILA definida pela ROTA
                await this.publishInExchange(request, response, rota, msg);
            } 
            response.send(request.body);
        }
        
    }
}

export default Task;
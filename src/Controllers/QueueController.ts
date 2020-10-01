import { Request, Response } from "express";
import Task from "../task";


class QueueController {
    
    async publishInQueue(request: Request, response: Response){
        //const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
        //const server = new RabbitmqServer('amqp://guest:guest@localhost:15672');
        //await server.start();
        //await server.publishInQueue('nodeTest', JSON.stringify(request.body));
        //await server.publishInExchange('amq.direct', 'rota', JSON.stringify(request.body));
        var task = new Task();
        var retorno =   await task.publishInQueue(request, response);
        //response.send(request.body);
        response.send(retorno);
    }

    async publishInExchange(request: Request, response: Response){
        //const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
        //const server = new RabbitmqServer('amqp://guest:guest@localhost:15672');
        //await server.start();
        //await server.publishInQueue('nest', JSON.stringify(request.body));
        //await server.publishInExchange('amq.direct', 'rota', JSON.stringify(request.body));
        var task = new Task();
        var retorno =   await task.publishInExchangeNumbers(request, response);
        response.send(retorno);
    }
}

export default QueueController;
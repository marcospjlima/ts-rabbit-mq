import { Router } from 'express';
import QueueController from './Controllers/QueueController';



const routes = Router();

const queueController = new QueueController();

routes.post ("/queue",  queueController.publishInQueue);
routes.post ("/exchange",  queueController.publishInExchange);

export default routes;
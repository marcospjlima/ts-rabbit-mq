import express from 'express';

import * as dotenv from 'dotenv';

import cors from 'cors';
import routes from './routes';

//dotenv.config({ path: __dirname+'/.env' });

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('Server started at http://localhost:3333'));

//console.log(process.env.EXCHANGE);
//console.log(process.env.ROTA_PAR);
//console.log(process.env.FILA_PAR);
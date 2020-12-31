import express, { Request, Response } from "express";

import { Logger } from './modules/logger';
import gameDBRouter from './routes/gameDB'
import steamRouter from './routes/steam';

const cors = require('cors');

let logger = new Logger()
const app = express()

app.use(cors())

app.get('/', (req: Request, res: Response) => res.send('Hello World from app.ts!'))
app.use('/steam', steamRouter)
app.use('/gameDB', gameDBRouter)


export default app;



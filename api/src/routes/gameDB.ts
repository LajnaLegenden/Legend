import express, { Request, Response } from "express";

import { Logger } from "./../modules/logger";
import { getTwitchAccessToken } from './../modules/gameDBHelper'

let logger = new Logger()

let gameDBRouter = express.Router()


//SteamAPICalls

gameDBRouter.get('/', (req: Request, res: Response) => {
    res.send({
        route: '/gameDB'
    })
})


gameDBRouter.get('/gameInfo/:search', async (req: Request, res: Response) => {
    res.send(await getTwitchAccessToken())
})

export default gameDBRouter;

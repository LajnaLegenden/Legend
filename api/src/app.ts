import express, { Request, Response } from "express";
import { SteamApi } from './modules/steamApi'
import { getSteamProfileFromId } from './modules/steamHelper'
import { Logger } from './modules/logger';
const cors = require('cors'); 

let logger = new Logger()
const app = express()

app.use(cors())

app.get('/', (req: Request, res: Response) => res.send('Hello World from app.ts!'))


//SteamAPICalls
app.get('/steam/getFriendsList/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting friend's list for id ${req.params.id}`);
        res.send(await SteamApi.getFriendList(req.params.id.toString()))
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

app.get('/steam/getPlayerProfile/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting player profile for id ${req.params.id}`);
        res.send((await getSteamProfileFromId(req.params.id)).response.players)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

app.get('/steam/getOwnedGames/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting owned games for id ${req.params.id}`);
        res.send((await SteamApi.getOwnedGames(req.params.id)).response)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});


app.get('/steam/getRecentlyPlayedGames/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting recent games for id ${req.params.id}`);
        res.send((await SteamApi.getRecentlyPlayedGames(req.params.id)).response)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

app.get('/steam/getSchemaForGame/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting recent games for id ${req.params.id}`);
        res.send((await SteamApi.getSchemaForGame(req.params.id)).game)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

export default app;

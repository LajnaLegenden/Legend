import express, { Request, Response } from "express";

import { Logger } from "./../modules/logger";
import { SteamApi } from "./../modules/steamApi";
import { getSteamProfileFromId } from "./../modules/steamHelper";

let logger = new Logger()

let steamRouter = express.Router()


//SteamAPICalls

steamRouter.get('/', (req, res) => {
res.send({
    route: '/steam'
})
})
steamRouter.get('/getFriendsList/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting friend's list for id ${req.params.id}`);
        res.send(await SteamApi.getFriendList(req.params.id.toString()))
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

steamRouter.get('/getPlayerProfile/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting player profile for id ${req.params.id}`);
        res.send((await getSteamProfileFromId(req.params.id)).response.players)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

steamRouter.get('/getOwnedGames/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting owned games for id ${req.params.id}`);
        res.send((await SteamApi.getOwnedGames(req.params.id)).response)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});


steamRouter.get('/getRecentlyPlayedGames/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting recent games for id ${req.params.id}`);
        res.send((await SteamApi.getRecentlyPlayedGames(req.params.id)).response)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

steamRouter.get('/getSchemaForGame/:id', async (req: Request, res: Response) => {
    try {
        logger.log("debug", `Getting recent games for id ${req.params.id}`);
        res.send((await SteamApi.getSchemaForGame(req.params.id)).game)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});


export default steamRouter;

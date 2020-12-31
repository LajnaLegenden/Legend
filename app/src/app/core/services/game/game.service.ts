import * as _ from 'lodash'

import { ApiService } from './../api/api.service';
import { ElectronService } from './../electron/electron.service';
import { EpicService } from './../epic/epic.service';
import { FileParserService } from './../fileParser/file-parser.service';
import { Injectable } from '@angular/core';
import { LoggerService } from './../logger/logger.service';
import { SteamApiWrapper } from 'steam-api-wrapper';
import { SteamService } from './../steam/steam.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private steam: SteamService,
    private epic: EpicService,
    private logger: LoggerService
  ) {

  }

  async getAllGames() {
    this.logger.debug("Getting all games")
    let steamGames = this.steam.getSteamGames();
    let epicGames = this.epic.getEpicGames();
    await Promise.all([steamGames, epicGames]);
    return [...await steamGames, ... await epicGames]
  }
}
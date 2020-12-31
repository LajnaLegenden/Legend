import * as _ from 'lodash'

import { ApiService } from './../api/api.service';
import { ElectronService } from './../electron/electron.service';
import { FileParserService } from './../fileParser/file-parser.service';
import { Injectable } from '@angular/core';
import { LoggerService } from './../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class SteamService {

  steamPath: string;

  constructor(
    private electron: ElectronService,
    private fileParser: FileParserService,
    private logger: LoggerService,
    private api: ApiService
  ) { this.resolveSteamPath(); }

  private resolveSteamPath() {
    switch (this.electron.global.clientInformation.platform) {
      case "Win32":
        this.steamPath = this.electron.path.join("C:", "Program Files (x86)", "Steam")
        break;

      default:
        break;
    }
  }

  private async getLibraryFolders() {
    try {
      this.logger.log("Getting steam library folders")
      let fileInfo = this.electron.path.join(this.steamPath, "steamapps", "libraryfolders.vdf");
      let out = [this.electron.path.join(this.steamPath)];
      let file = await this.fileParser.parseVdf(fileInfo);
      for (let prop in file["LibraryFolders"]) {
        if (!parseInt(prop)) continue;
        out.push(file["LibraryFolders"][prop])
      }
      return out;
    } catch (error) {
      this.logger.error(error.message)
    }
  }


  private getGameIdsFromFolder(path: string): Promise<number[]> {
    return new Promise((res, rej) => {
      let ids: number[] = [];
      this.electron.fs.readdir(path, (err, files) => {
        if (err) rej(err);
        for (let file of files) {
          let matches = file.match(new RegExp(/appmanifest_(\d+).acf/gm))
          if (matches) ids.push(parseInt(matches[0].substr(12, matches[0].length - 16)))
        }
        res(ids)
      })
    });
  }

  async getSteamGamesIds() {
    let libraryFolders = await this.getLibraryFolders()
    let ids = new Array<number>();
    for (let path of libraryFolders) {
      let libIds = await this.getGameIdsFromFolder(this.electron.path.join(this.electron.path.resolve(path), "steamapps"));
      for (let id of libIds) ids.push(id)
    }
    return ids
  }

  async getSteamGames() {
    let installedGames = await this.getSteamGamesIds();
    let ownedGames: any = await this.api.getOwnedSteamGames("76561198140528342")
    for (let game of ownedGames.games) {
      let installed = false;
      for (let id of installedGames) {
        if (game.appid == id) {
          installed = true;
        }
      }
      _.set(game, "installed", installed)
      _.set(game, "store", "steam")
    }
    this.logger.debug(`Returning ${ownedGames.games.length} steam games`)
    return ownedGames.games
  }

}

import { SteamApiWrapper } from 'steam-api-wrapper';
import { ApiService } from './../api/api.service';
import { LoggerService } from './../logger/logger.service';
import { FileParserService } from './../fileParser/file-parser.service';
import { ElectronService } from './../electron/electron.service';
import { Injectable } from '@angular/core';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  steamPath: string

  constructor(
    private electron: ElectronService,
    private fileParser: FileParserService,
    private logger: LoggerService,
    private api: ApiService
  ) {
    this.resolveSteamPath();
  }

//Computer\HKEY_CURRENT_USER\SOFTWARE\Valve\Steam

  resolveSteamPath() {
    switch (this.electron.global.clientInformation.platform) {
      case "Win32":
        this.steamPath = this.electron.path.join("C:", "Program Files (x86)", "Steam")
        break;

      default:
        break;
    }
  }

  async getLibraryFolders() {
    try {
      this.logger.log("Getting steam library folders")
      let fileInfo = this.electron.path.join(this.steamPath, "steamapps", "libraryfolders.vdf");
      let out = [this.electron.path.join(this.steamPath)];
      let file = await this.fileParser.parseVdf(fileInfo);
      console.log(file["LibraryFolders"])
      for (let prop in file["LibraryFolders"]) {
        if (!parseInt(prop)) continue;
        out.push(file["LibraryFolders"][prop])
      }
      console.log(out)
      return out;
    } catch (error) {
      console.error(error)
      this.logger.error(error.message)
    }
  }

  getGameIdsFromFolder(path: string): Promise<number[]> {
    this.logger.log("Getting game ids from folder " + path)
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
    console.log(installedGames)
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
    return ownedGames.games
  }

  async getAllGames() {
    this.logger.debug("Getting all games")
    let steamGames = this.getSteamGames();
    await Promise.all([steamGames]);
    return [...await steamGames]
  }

}
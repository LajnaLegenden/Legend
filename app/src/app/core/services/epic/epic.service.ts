import * as _ from 'lodash'

import { PathLike, fstat } from 'fs';

import { ApiService } from './../api/api.service';
import { ElectronService } from './../electron/electron.service';
import { FileParserService } from './../fileParser/file-parser.service';
import { Injectable } from '@angular/core';
import { LoggerService } from './../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class EpicService {

  manifestLocation: PathLike
  libraryDatLocation: PathLike
  entitlementCacheLocation: PathLike

  constructor(
    private electron: ElectronService,
    private fileParser: FileParserService,
    private logger: LoggerService,
    private api: ApiService
  ) {
    this.manifestLocation = this.electron.path.join(this.electron.env["PROGRAMDATA"], "Epic", "EpicGamesLauncher", "Data", "Manifests");
    this.libraryDatLocation = this.electron.path.join(this.electron.env["PROGRAMDATA"], "Epic", "UnrealEngineLauncher", "LauncherInstalled.dat")
    this.entitlementCacheLocation = this.electron.path.join(this.electron.env["PROGRAMDATA"], "Epic", "EpicGamesLauncher", "Data", "Catalog", "catcache.bin")
  }

  async getEpicGames() {
    let installedGames = await this.getInstalledEpicGames();
    let ownedGames = await this.getOwnedGames();
    for(let game of installedGames){
      for(let e of ownedGames){
        if(e.title == game.DisplayName) Object.assign(e,game)
      }
    }
    return [...installedGames,...ownedGames]
  }

  private async getInstalledEpicGames() {
    let epicInstalledGamesManifest = await this.electron.fs.readFileSync(this.libraryDatLocation, { encoding: "utf-8", flag: "r" })
    let InstallationList = JSON.parse(epicInstalledGamesManifest)["InstallationList"]
    let gameManifests = await this.electron.fs.readdirSync(this.manifestLocation)
    let installedGames = new Array();
    console.log(gameManifests);
    for (let manifest of gameManifests) {
      if (this.electron.fs.lstatSync(this.electron.path.join(this.manifestLocation.toString(), manifest)).isFile()) {
        let json = JSON.parse(this.electron.fs.readFileSync(this.electron.path.join(this.manifestLocation.toString(), manifest), { encoding: "utf-8", flag: "r" }))
        for (let game of InstallationList) {
          if (_.get(game, "AppName") == _.get(json, "AppName")) {
            Object.assign(game, json)
            Object.assign(game, {
              store: "epic",
              installed: true
            })
            installedGames.push(game);
          }
        }
      }
    }
    return installedGames
  }

  private async getOwnedGames() {
    let bas64 = this.electron.fs.readFileSync(this.entitlementCacheLocation, { encoding: "utf-8", flag: "r" })
    let buff = Buffer.from(bas64, 'base64')
    let entitlements = JSON.parse(buff.toString('utf-8'));
    let ownedGames = new Array()
    for (let e of entitlements) {
      Object.assign(e,{store:"epic", installed: false})
      if (this.isGameCategory(e)) ownedGames.push(e)
    }
    console.log(ownedGames)
    return ownedGames
  }


  isGameCategory(entitlement) {
    for (let c of entitlement.categories) {
      if (c.path == "games") return true
    } return false
  }
}

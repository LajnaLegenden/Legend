import * as _ from 'lodash'

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss']
})
export class GameListItemComponent implements OnInit {
  @Input() game: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.game.store)
  }

  getPlayTime(minutes: number) {
    return `${Math.round(minutes / 60)} hours`
  }

  launchGame(game) {
    switch (game.store) {
      case "epic":
        window.location.href = `com.epicgames.launcher://apps/${game.AppName}?action=launch&silent=true` 
        break;
      case "steam":
        window.location.href = `steam://rungameid/${game.appid}` 
      default:
        break;
    }
  }

  getGameName(game){
    switch (game.store) {
      case "epic":
        return _.get(game, "DisplayName", _.get(game,"title", game.id))
      case "steam":
        return _.get(game, "appname", _.get(game,"appid", "{ID}"))
      default:
        break;
    }
  }

  installGame(game) {
    switch (game.store) {
      case "epic":
        window.location.href = `com.epicgames.launcher://apps/${game.AppName}?action=install` 
        break;
      case "steam":
        window.location.href = `steam://installgame/${game.appid}` 
      default:
        break;
    }
  }
  getGameIconSrc(game) {
    if (game.store = "steam"){
      try {
        return `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
      } catch (error) {
        console.error(error, game)
      }
    }
  }


}

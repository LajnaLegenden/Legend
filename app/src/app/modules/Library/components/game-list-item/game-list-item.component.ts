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
  }

  getPlayTime(minutes: number) {
    return `${Math.round(minutes / 60)} hours`
  }

  launchGame(game){
    window.location.href = "steam://rungameid/" + game.appid
  }

  installGame(game){
    console.log(game)
  }
  getGameIconSrc(game){
    try {
      return `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
    } catch (error) {
      console.error(error, game)
    }
  }


}

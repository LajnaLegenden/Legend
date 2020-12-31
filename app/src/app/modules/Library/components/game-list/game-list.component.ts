import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GameService, LoggerService } from './../../../../core/services/index'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnChanges {

  @Input() games: any[];

  constructor(
    private gameService: GameService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if(this.games){
      console.log(this.games)
      /* this.games = this.games.sort(function (a, b) {
        if (a.playtime_forever < b.playtime_forever) {
          return 1;
        }
        if (a.playtime_forever > b.playtime_forever) {
          return -1;
        }
        return 0;
      }
    ); */
    }
}

}

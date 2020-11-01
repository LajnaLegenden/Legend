import { Component, OnInit } from '@angular/core';
import { GameService } from './../../../../core/services/index'
@Component({
  selector: 'app-library-core',
  templateUrl: './library-core.component.html',
  styleUrls: ['./library-core.component.scss']
})
export class LibraryCoreComponent implements OnInit {

  private games: any[]
  constructor(private game: GameService) { }

  async ngOnInit() {
    setTimeout(async () => {
      this.games = await this.game.getAllGames()
    }, 100)

  }

}

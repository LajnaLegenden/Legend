import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryCoreComponent } from './components/library-core/library-core.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameListItemComponent } from './components/game-list-item/game-list-item.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';



@NgModule({
  declarations: [LibraryCoreComponent, GameListComponent, GameListItemComponent, GameDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class LibraryModule { }

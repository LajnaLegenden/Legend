import { LibraryModule } from './modules/Library/library.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/components';
import { LibraryCoreComponent } from './modules/Library/components/library-core/library-core.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'library',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'library',
    component: LibraryCoreComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LibraryModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

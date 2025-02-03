import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { LoginComponent } from './login/login.component';
import { TypesComponent } from './types/types.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SiginComponent } from './sigin/sigin.component';
import { AuthGuard } from './guard/auth.guard';
import { DeleteComponent } from './delete/delete/delete.component';

const routes: Routes = [
  {
    path:'artists',
    component: ArtistsComponent
  },
  {
    path:'albums',
    component: AlbumsComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'types',
    component: TypesComponent
  },
  {
    path:'artist/:id',
    component: ArtistDetailsComponent
  },
  {
    path:'album/:id',
    component: AlbumDetailsComponent
  }
  ,
  {
    path:'signin',
    component: SiginComponent
  },{
    path:'delete',
    component:DeleteComponent,
     canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

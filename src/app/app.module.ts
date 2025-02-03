import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { LoginComponent } from './login/login.component';
import { TypesComponent } from './types/types.component';
import { SongDetailsComponent } from './song-details/song-details.component';
import { provideHttpClient } from '@angular/common/http';
import { SiginComponent } from './sigin/sigin.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete/delete.component';
@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    ArtistsComponent,
    ArtistDetailsComponent,
    AlbumDetailsComponent,
    LoginComponent,
    TypesComponent,
    SongDetailsComponent,
    SiginComponent,
    DeleteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }

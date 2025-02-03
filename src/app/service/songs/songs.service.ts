import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Song } from '../../model/song.model'

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private productUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }
   
    getSongByAlbumsId(albums_id: string): Observable<Song[]> {
      return this.http.get<Song[]>(`${this.productUrl}/albums/${albums_id}/songs`);
    }
  
    getSongByArtistId(artist_id: string): Observable<Song[]> {
      return this.http.get<Song[]>(`${this.productUrl}/artist/${artist_id}/songs`);
    }

    addProduct(song: Song): Observable<Song> {
      return this.http.post<Song>(this.productUrl, song);
    }

    updateProduct(album_id: string,song: Song): Observable<Song> {
      return this.http.put<Song>(`${this.productUrl}/albums/${album_id}/songs`, song);
    }
  
    deleteProduct(song_id: string): Observable<void> {
      return this.http.delete<void>(`${this.productUrl}/${song_id}`);
    }
}

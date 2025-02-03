import { Injectable } from '@angular/core';
import {  Observable,BehaviorSubject,tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Album } from '../../model/album.model';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums : Album[] = []
  private productUrl = 'http://localhost:8000/api';

  albums$ = new BehaviorSubject<Album[]>(this.albums);
  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.productUrl}/albums`);
  }


  getAlbumById(album_id: string): Observable<Album> {
    return this.http.get<Album>(`${this.productUrl}/albums/${album_id}`);
  }
  

  addAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(`${this.productUrl}/albums`,album);
  }

  deleteAlbum(albums_id: string): Observable<void> {
    return this.http.delete<void>(`${this.productUrl}/albums/${albums_id}`);
  }
}

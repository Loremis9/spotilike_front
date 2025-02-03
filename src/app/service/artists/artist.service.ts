import { Injectable } from '@angular/core';
import { Artist } from '../../model/artist.model';
import {  BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private productUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  getArtist(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.productUrl}/artists`);
  }

  updateArtist(artist_id: string, artist : Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.productUrl}/artists/${artist_id}`, artist);
  }

  deleteArtist(artist_id: string): Observable<void> {
    return this.http.delete<void>(`${this.productUrl}/artists/${artist_id}`);
  }
}


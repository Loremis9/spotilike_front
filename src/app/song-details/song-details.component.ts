import { Component, Input, OnInit } from '@angular/core';
import { SongsService } from '../service/songs/songs.service';
import { Song } from '../model/song.model';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrl: './song-details.component.css'
})
export class SongDetailsComponent implements OnInit {
  @Input() album_id: string =""
  songs: Song[] = []

  constructor(private songService: SongsService){}

  ngOnInit(): void {
    console.log(this.album_id)
    if (this.album_id) {
      
      this.getSongByAlbumId();
    }
  }

  getSongByAlbumId(){
    this.songService.getSongByAlbumsId(this.album_id).subscribe((songs)=>{
      this.songs= songs;
      console.log("Morceaux récupérés :", this.songs);
    },
    (error) => {
      console.error("Erreur lors de la récupération des morceaux :", error);
    })
  }
}

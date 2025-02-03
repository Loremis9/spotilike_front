import { Component, Input, OnInit } from '@angular/core';
import { ArtistService } from '../service/artists/artist.service';
import { Router } from '@angular/router';
import { Artist } from '../model/artist.model';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent implements OnInit {

  artists!: Artist[];
   @Input() artist_id : string =""
  constructor(private artistService: ArtistService,private router : Router ){}
  ngOnInit(): void {
      this.getArtists();
  }

  getArtists(){
    this.artistService.getArtist().subscribe((data)=>{
      this.artists = data;
    },
    (error)=> {
      console.error('Erreur lors de la requête :', error);
    });
  }
  viewAlbum(id: string) {
    this.router.navigate(['/artist/', id]);
  }
}

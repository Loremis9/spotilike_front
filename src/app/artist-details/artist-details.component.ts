import { Component } from '@angular/core';
import { ArtistService } from '../service/artists/artist.service';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '../model/artist.model';
import { AlbumService } from '../service/albums/album.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrl: './artist-details.component.css'
})
export class ArtistDetailsComponent {

    artist!: Artist;
    artist_id :string = ""
    constructor(private artistService :ArtistService,private route: ActivatedRoute, albumService: AlbumService) {}
    
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.artist_id = params.get('id')!;
        console.log("Nouvel ID récupéré :", this.artist_id);
    
        if (!this.artist_id) {
          console.error("L'ID de l'album est nul ou indéfini !");
          return;
        }
        if (this.artist_id) {
        
        }
      });
    }

    
    viewAlbum(id: string) {
      this.artist_id = id;
    }
}

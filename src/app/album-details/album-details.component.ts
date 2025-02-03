import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../service/albums/album.service';
import { Album } from '../model/album.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.css'
})

export class AlbumDetailsComponent implements OnInit  {
  
  album!: Album;
  album_id :string = ""
  constructor(private albumsService :AlbumService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.album_id = params.get('id')!;
      console.log("Nouvel ID récupéré :", this.album_id);
  
      if (!this.album_id) {
        console.error("L'ID de l'album est nul ou indéfini !");
        return;
      }
      if (this.album_id) {
        this.getAlbumsById();
      }
    });
  }

  getAlbumsById(){
    this.albumsService.getAlbumById(this.album_id).subscribe((albums) => {
      this.album = albums;
    },
    (error)=> {
      console.error('Erreur lors de la requête :', error);
    }
  );
  }
  viewAlbum(id: string) {
    this.album_id = id;
  }
}

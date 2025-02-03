import { Component,OnInit,Input } from '@angular/core';
import { AlbumService } from '../service/albums/album.service';
import { Album } from '../model/album.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {

  albumList!: Album[];
  @Input() album_id : string =""
  constructor(private albumsService :AlbumService,private router: Router) {}
  ngOnInit(): void {
    this.getAlbums();
    
  }

  getAlbums(){
    this.albumsService.getAlbums().subscribe((albums) => {
      this.albumList = albums;
    },
    (error)=> {
      console.error('Erreur lors de la requête :', error);
    }
  );
  }
    viewAlbum(id: string) {
      this.router.navigate(['/album/', id]);
    }
}

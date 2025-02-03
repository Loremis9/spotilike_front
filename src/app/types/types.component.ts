import { Component, OnInit } from '@angular/core';
import { TypesService } from '../service/types/types.service';
import { Router } from '@angular/router';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrl: './types.component.css'
})
export class TypesComponent implements OnInit {
  types!: Type[];
  constructor(private typeService :TypesService, private router : Router){}
  ngOnInit(): void {
      this.getTypes();
  }

  getTypes(){
    this.typeService.getTypes().subscribe((data)=>{
      this.types = data;
    },
    (error)=> {
      console.error('Erreur lors de la requête :', error);
    });
  }

  viewType(id: string) {
    this.router.navigate(['/album/', id]);
  }
}

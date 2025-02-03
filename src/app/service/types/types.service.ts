import { Injectable } from '@angular/core';
import { Type } from '../../model/type.model';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TypesService {

    private productUrl = 'http://localhost:8000/api';
    types : Type[] = []
    constructor(private http: HttpClient) {}
  
    getTypes(): Observable<Type[]> {
      return this.http.get<Type[]>(`${this.productUrl}/genres`);
    }
  
    updateTypes(type_id: string, type : Type): Observable<Type> {
      return this.http.put<Type>(`${this.productUrl}/artists/${type_id}`, type);
    }
}

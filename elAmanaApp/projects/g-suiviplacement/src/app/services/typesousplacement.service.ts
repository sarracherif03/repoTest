import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { typeSplacement } from '../Models/typeSplacement';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesousplacementService {

  constructor(private http:HttpClient) { }

  API_URL=environment.type_sous_placement_url
  fromData:typeSplacement = new typeSplacement();
  listtypeSplacement!: typeSplacement[];
  
  getTypeSplacement(){
    this.http.get(this.API_URL+"/GetTypesousplacement").toPromise().then(
      res => this.listtypeSplacement= res as typeSplacement[]);
  }
}

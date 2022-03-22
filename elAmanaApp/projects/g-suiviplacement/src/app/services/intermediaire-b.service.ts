import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { intermediaireB } from '../Models/intermediaireB';

@Injectable({
  providedIn: 'root'
})
export class IntermediaireBService {

  constructor(private http:HttpClient) { }
  public API_URL= environment.intermB_url;
  fromData:intermediaireB = new intermediaireB();
  listinterB!: intermediaireB[];

  getinterB(){
    this.http.get(this.API_URL+"/GetIntermediareBourse").toPromise().then(
      res => this.listinterB= res as intermediaireB[]);
  }
}


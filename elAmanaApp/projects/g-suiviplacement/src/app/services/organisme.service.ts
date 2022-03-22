import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { organisme } from '../Models/organisme';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganismeService {
  constructor(private http:HttpClient) { }
  API_URL=environment.organisme_url

  fromData:organisme = new organisme();
  listorganisme: organisme[];
  
  getOrganisme(){
    this.http.get(this.API_URL+'/GetOrganisme').toPromise().then(
      res => this.listorganisme= res as organisme[]);
  }

  getOrganismeResolver():Observable<organisme[]>{
      return this.http.get<organisme[]>(this.API_URL+'/GetOrganisme')
  }
}

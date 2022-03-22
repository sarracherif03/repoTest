import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { placement } from '../Models/placement';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {

  constructor(private http:HttpClient) { }
  
  API_URL=environment.placement_url;
  fromData:placement = new placement();
  listplacement: placement[];
  listplacementFiltre:placement[]=[];
  listplacementNomEntreprise:string[];
  prixEntreprise:string
  
  getPlacement(){
    this.http.get(this.API_URL).toPromise().then(
        res => {
          this.listplacement = res as placement []
        });
  }

  getPlacementResolver():Observable<placement[]>{
    return this.http.get<placement[]>(this.API_URL); 
  }

  postPlacement(){    
    return this.http.post(this.API_URL+"/AjouterPlacementCapital", this.fromData);
  }
  
  refreshComponent() {
    window.location.reload();// This function allows to update the component and we call it when we want to update the display list when modifying or adding 
  }

  getNameEntreprise(){
    this.http.get(this.API_URL+"/GetNameEntrepriseBourse").toPromise().then(
      res => {
        this.listplacementNomEntreprise = res as string []
      });
  }

  getActionCotee(){
    
  }
  getPriceAction(nomEntreprise:string):Observable<string[]>{
    return this.http.get<string[]>(this.API_URL+"/GetScrapPrix/"+nomEntreprise); 
  }

}

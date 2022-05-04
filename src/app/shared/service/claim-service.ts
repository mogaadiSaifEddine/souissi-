import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Claim } from '../model/claim';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  readonly API_URL = 'http://localhost:8085/PIDEV/claim';
  
  constructor(private httpClient: HttpClient) { }

  getAllClaims() {
    return this.httpClient.get(`${this.API_URL}/retrieve-visible`)
  }
  addClaim(claim : Claim): Observable<Object> {
    return this.httpClient.post(`${this.API_URL}/add-Claim`, claim)
  }
  editClaim(claim : any){
    return this.httpClient.put(`${this.API_URL}/modify-Claim`, claim)
  }
  deleteClaim(idclaim : Number)  {
    return  this.httpClient.delete(`${this.API_URL}/remove-Claim/${idclaim}`)
  }
  archiveClaim(idclaim : Number) :Observable<Object> {
    return  this.httpClient.put(`${this.API_URL}/archive-Claim`,idclaim)
  }
  desarchiveClaim(idclaim : Number) :Observable<Object> {
    return  this.httpClient.put(`${this.API_URL}/desarchive-Claim`,idclaim)

  }
  treatClaim(idclaim : any,reponse:any): Observable<Object>{
    return this.httpClient.put(`${this.API_URL}  /Treat_claim`, idclaim,reponse)
  }
}
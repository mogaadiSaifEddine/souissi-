import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Bank } from "../model/bank";


@Injectable({
    providedIn: 'root'
  })
export class BankService {
    apiURL: string = environment.baseUrl+"/bank";
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  /////////////////////////ADD/////////////////////

  addBank(b: Bank): Observable<Bank> {

    return this.httpClient.post<Bank>(this.apiURL+'/addBank', b);
  }

  /////////////////////////UPDATE WITH CONTROL/////////////////////

  updateBank(b: Bank, idBank : number): Observable<Bank> {

    return this.httpClient.put<Bank>(this.apiURL+'/updateBank/'+idBank, b);
  }

  /////////////////////////GET/////////////////////

  getAllBanks(): Observable<Bank[]> {
    return this.httpClient.get<Bank[]>(this.apiURL+'/getAllBanks/');
  }


  getBankById(idBank: number): Observable<Bank> {
    return this.httpClient.get<Bank>(this.apiURL+'/getBankById/'+idBank);

  }

  getBankByName(NameBank: string): Observable<Bank> {
    return this.httpClient.get<Bank>(this.apiURL+'/getBankByName/'+NameBank);

  }

  /////////////////////////DELETE/////////////////////

  deleteBankById(idBank: number) {
    return this.httpClient.delete<void>(this.apiURL+'/deleteBank/'+idBank)
  }
}

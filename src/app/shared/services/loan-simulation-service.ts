import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { LoanSimulation } from "../model/loan-simulation";

@Injectable({
    providedIn: 'root'
  })
export class LoanSimulationService {
    apiURL: string = environment.baseUrl+"/simulation";
    observer = new Subject();
    public subscriber$ = this.observer.asObservable();
  
    constructor(private httpClient: HttpClient) {
    }
  
///////////////////////////////Simulate///////////////////////////
  
    Simulate(idOffer : number, nameBank: string, nbrAnnee : number, salaire : number): Observable<LoanSimulation> {
  
      return this.httpClient.post<LoanSimulation>(this.apiURL+'//'+idCustomerAccount );
    }
  
/////////////////////////////////////////VERIFICATION CREDIT////////////////////////////////////////////
  
    verifCredit(idCustomerAccount: number, idCredit : number): Observable<string>  {
  
      return this.httpClient.put<string>(this.apiURL+'/confirm-credit/'+idCustomerAccount+'/'+idCredit,idCustomerAccount);
    }

    /////////////////////UPDATE WITH CONTROL///////////////////////////////////////////

    refreshCredit(c: LoanSimulation, idCredit : number): Observable<LoanSimulation>  {
  
      return this.httpClient.put<LoanSimulation>(this.apiURL+'/update-credit/'+idCredit, c);
    }
//////////////////////////GET ALL CREDITS ////////////////////////
  
    retrieveAllCredits(): Observable<LoanSimulation[]> {
      return this.httpClient.get<LoanSimulation[]>(this.apiURL+'/retrieve-all-credits');
    }

//////////////////////////GET CREDIT BY ID CREDIT/////////////////////////////
    retrieveCredit(idCredit: number): Observable<LoanSimulation> {
      return this.httpClient.get<LoanSimulation>(this.apiURL+'/retrieve-credit/'+idCredit);
  
    }
///////////////////GET ALL CREDITS BY ID CUSTOMER////////////////////////////////////

    retrieveCreditByCustomer(idCustomerAccount: number): Observable<LoanSimulation> {
      return this.httpClient.get<LoanSimulation>(this.apiURL+'/retrieve-credit-customer-id/'+idCustomerAccount);
  
    }
  
///////////////////DELETE WITH CONTROL//////////////////////////////////
  
    suppCredit(idCredit: number) {
      return this.httpClient.delete<LoanSimulation>(this.apiURL+'/supp-credit/'+idCredit)
    }
////////////////////////////CLOSE CREDIT///////////////////////////////////////
    closeCredit(idCredit : number): Observable<string>  {
  
     return this.httpClient.put<string>(this.apiURL+'/close-credit/'+idCredit, idCredit);
    }
}

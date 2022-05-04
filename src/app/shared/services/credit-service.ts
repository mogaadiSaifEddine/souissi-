import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Credit } from "../model/credit";

@Injectable({
  providedIn: "root",
})
export class CreditService {
  apiURL: string = environment.baseUrl + "/credit";
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {}

  //////////////////////////////////////REQUEST CREDIT PER CUSTOMER///////////////////////////////////////////////////////

  requestCreditCustomer(
    c: Credit,
    idCustomerAccount: number
  ): Observable<Credit> {
    return this.httpClient.post<Credit>(
      this.apiURL + "/request-credit-id/" + idCustomerAccount,
      c
    );
  }

  /////////////////////////////////////////VERIFICATION CREDIT////////////////////////////////////////////

  verifCredit(idCredit: number): Observable<string> {
    return this.httpClient.put<string>(
      this.apiURL + "/confirm-credit/" + idCredit,
      ""
    );
  }

  /////////////////////UPDATE WITH CONTROL///////////////////////////////////////////

  refreshCredit(c: Credit, idCredit: number): Observable<Credit> {
    return this.httpClient.put<Credit>(
      this.apiURL + "/update-credit/" + idCredit,
      c
    );
  }
  //////////////////////////GET ALL CREDITS ////////////////////////

  retrieveAllCredits(): Observable<Credit[]> {
    return this.httpClient.get<Credit[]>(this.apiURL + "/retrieve-all-credits");
  }

  //////////////////////////GET CREDIT BY ID CREDIT/////////////////////////////
  retrieveCredit(idCredit: number): Observable<Credit> {
    return this.httpClient.get<Credit>(
      this.apiURL + "/retrieve-credit/" + idCredit
    );
  }
  ///////////////////GET ALL CREDITS BY ID CUSTOMER////////////////////////////////////

  retrieveCreditByCustomer(idCustomerAccount: number): Observable<Credit[]> {
    return this.httpClient.get<Credit[]>(
      this.apiURL + "/retrieve-credit-customer-id/" + idCustomerAccount
    );
  }

  ///////////////////DELETE WITH CONTROL//////////////////////////////////

  suppCredit(idCredit: number) {
    return this.httpClient.delete<Credit>(
      this.apiURL + "/supp-credit/" + idCredit
    );
  }
  ////////////////////////////CLOSE CREDIT///////////////////////////////////////
  closeCredit(idCredit: number): Observable<string> {
    return this.httpClient.put<string>(
      this.apiURL + "/close-credit/" + idCredit,
      idCredit
    );
  }
}

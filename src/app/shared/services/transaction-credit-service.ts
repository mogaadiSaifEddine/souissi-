import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { TransactionCredit } from "../model/transaction-credit";

@Injectable({
  providedIn: "root",
})
export class TransactionCreditService {
  apiURL: string = environment.baseUrl + "/transaction";
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {}

  ////////////////////ADD///////////////////:

  passerUnVirement(
    t: TransactionCredit,
    idCredit: number
  ): Observable<TransactionCredit> {
    return this.httpClient.post<TransactionCredit>(
      this.apiURL + "/add-transaction/" + idCredit,
      t
    );
  }

  /////////////////////UPDATE WITH CONTROL///////////////////////////////////////////

  updateTransaction(
    t: TransactionCredit,
    idTransaction: number
  ): Observable<TransactionCredit> {
    return this.httpClient.put<TransactionCredit>(
      this.apiURL + "/update-transaction/" + idTransaction,
      t
    );
  }

  ////////////////////////GET ALL///////////////////////////

  retrieveAllTransactions(): Observable<TransactionCredit[]> {
    return this.httpClient.get<TransactionCredit[]>(
      this.apiURL + "/retrieve-all-transactions/"
    );
  }
  //////////////GET ALL SORTED////////////////////////////

  retrieveAllTransactionsSorted(): Observable<TransactionCredit[]> {
    return this.httpClient.get<TransactionCredit[]>(
      this.apiURL + "/retrieve-all-transactions-sorted/"
    );
  }
  //////////////////GET BY ID///////////////////////////////////

  retrieveTransactionById(
    idTransaction: number
  ): Observable<TransactionCredit> {
    return this.httpClient.get<TransactionCredit>(
      this.apiURL + "/retrieve-transaction/" + idTransaction
    );
  }

  ///////////////////LIST TRANSACTION PER CUSTOMER///////////////////

  retrieveTransactionsByCustomer(
    idCustomerAccount: number
  ): Observable<TransactionCredit[]> {
    return this.httpClient.get<TransactionCredit[]>(
      this.apiURL + "/listperCustomer/" + idCustomerAccount
    );
  }

  ////////////////LIST TRANSACTION PER YEARRRRRRR/////////////////////////////////////////////////

  listTransactionsPerYear(year: number): Observable<TransactionCredit[]> {
    return this.httpClient.get<TransactionCredit[]>(
      this.apiURL + "/list-transactions-per-year/" + year
    );
  }

  /////////////////DICT (Month : AmountTransaction) //////////////////////
  getStatisticMonthByAmount(year: number): Observable<Map<number, number>> {
    return this.httpClient.get<Map<number, number>>(
      this.apiURL + "/dict/" + year
    );
  }

  /////////////////////////////SUM TRANSACTION/////////////////////////////////////////////////////
  SommeTransactions(): Observable<number> {
    return this.httpClient.get<number>(this.apiURL + "/somme/");
  }
  //////////////////////////DELETE TRANSACTION////////////////////////////////////

  suppTransaction(idTransaction: number) {
    return this.httpClient.delete<TransactionCredit>(
      this.apiURL + "/supp-transaction/" + idTransaction
    );
  }
}

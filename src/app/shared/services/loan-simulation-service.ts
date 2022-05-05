import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { LoanSimulation } from "../model/loan-simulation";

@Injectable({
  providedIn: "root",
})
export class LoanSimulationService {
  apiURL: string = environment.baseUrl + "/simulation";
  apiUL: string = environment.baseUrl;
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {}

  ///////////////////////////////Simulate///////////////////////////
  getOffers(): Observable<any> {
    return this.httpClient.get(this.apiUL + "/offer/retrieve-all-Offers");
  }
  Simulate(
    idOffer: number,
    nameBank: string,
    nbrAnnee: number,
    salaire: number
  ): Observable<LoanSimulation> {
    return this.httpClient.post<LoanSimulation>(
      this.apiURL +
        "/simulate/" +
        idOffer +
        "/" +
        nameBank +
        "/" +
        nbrAnnee +
        "/" +
        salaire,
      LoanSimulation
    );
  }

  ///////////////////////////////Add simulation with sending mails////////////////////////////

  pdf(idLoan: number): Observable<LoanSimulation> {
    return this.httpClient.post<LoanSimulation>(
      this.apiURL + "/pdf/" + idLoan,
      LoanSimulation
    );
  }

  EmailWithPdfpdf(idLoan: number): Observable<LoanSimulation> {
    return this.httpClient.post<LoanSimulation>(
      this.apiURL + "/mail/" + idLoan,
      LoanSimulation
    );
  }

  //Add simulation
  addSimulation(
    idOffer: number,
    idCustomer: number,
    nameBank: string,
    nbrAnnee: number,
    salaire: number
  ): Observable<LoanSimulation> {
    return this.httpClient.post<LoanSimulation>(
      this.apiURL +
        "/addSimulation/" +
        idOffer +
        "/" +
        idCustomer +
        "/" +
        nameBank +
        "/" +
        nbrAnnee +
        "/" +
        salaire,
      LoanSimulation
    );
  }

  ///////////////////////////////////////////CONFIRMATION//////////////////////////////

  confirmSimulation(idLoan: number): Observable<LoanSimulation> {
    return this.httpClient.put<LoanSimulation>(
      this.apiURL + "/confirmSimulation/" + idLoan,
      LoanSimulation
    );
  }

  unconfirmSimulation(idLoan: number): Observable<LoanSimulation> {
    return this.httpClient.put<LoanSimulation>(
      this.apiURL + "/unconfirmSimulation/" + idLoan,
      LoanSimulation
    );
  }

  /////////////////////////////////////Retrieve data from DB///////////////////////////////////////////////////////////

  getAllSimulations(): Observable<LoanSimulation[]> {
    return this.httpClient.get<LoanSimulation[]>(
      this.apiURL + "/getAllSimulations"
    );
  }

  getAllSimulationsByCin(cin: number): Observable<LoanSimulation[]> {
    return this.httpClient.get<LoanSimulation[]>(
      this.apiURL + "/getAllSimulationsByCin/" + cin
    );
  }

  getAllSimulationsByNameBank(nameBank: string): Observable<LoanSimulation[]> {
    return this.httpClient.get<LoanSimulation[]>(
      this.apiURL + "/getAllSimulationsByNameBank/" + nameBank
    );
  }

  ///////////////////DELETE/////////////////////////////////

  deleteSimulationById(id: number) {
    return this.httpClient.delete<LoanSimulation>(
      this.apiURL + "/deleteSimulationById/" + id
    );
  }
  //scheduling
  deleteOrNotifSimulationInScheduling() {
    return this.httpClient.delete<LoanSimulation>(
      this.apiURL + "/deleteOrNotif"
    );
  }
}

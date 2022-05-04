import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Agent } from "../model/agent";

@Injectable({
  providedIn: "root",
})
export class AgentService {
  apiURL: string = environment.baseUrl + "/agent";
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {}

  /////////////////////////ADD/////////////////////

  addAgent(a: Agent, idBank: number): Observable<Agent> {
    console.log(a);

    return this.httpClient.post<Agent>(this.apiURL + "/addAgent/" + idBank, a);
  }

  /////////////////////////UPDATE WITH CONTROL/////////////////////

  updateAgent(a: Agent, idAgent: number): Observable<Agent> {
    return this.httpClient.put<Agent>(
      this.apiURL + "/updateAgent/" + idAgent,
      a
    );
  }

  /////////////////////////GET/////////////////////

  getAllAgents(): Observable<Agent[]> {
    return this.httpClient.get<Agent[]>(this.apiURL + "/getAllAgents/");
  }

  getAgentById(idAgent: number): Observable<Agent> {
    return this.httpClient.get<Agent>(this.apiURL + "/getAgentById/" + idAgent);
  }

  getAgentByLastName(LastNameAgent: string): Observable<Agent> {
    return this.httpClient.get<Agent>(
      this.apiURL + "/getAgentByLastName/" + LastNameAgent
    );
  }

  /////////////////////////DELETE/////////////////////

  deleteAgentById(idAgent: number, idBank: number) {
    return this.httpClient.delete<void>(
      this.apiURL + "/deleteAgent/" + idAgent + "/" + idBank
    );
  }
}

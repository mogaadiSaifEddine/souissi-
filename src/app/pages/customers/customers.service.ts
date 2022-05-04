import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }
  login(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:8087/PIDEV_GARANTIA/authenticate",data,{observe: "response", responseType: 'text' as 'json', headers});
  }
  /*quand on va consommer ws avec token*/
  get(): Observable<any> {
    return this.http.post("url",{headers: new HttpHeaders().append("Authorization",localStorage.getItem("token"))});
  }
  registrationEmployee(data): Observable<any> {
    return this.http.post("http://localhost:8087/PIDEV_GARANTIA/process_register_employee",data);
  }
  registrationCustomer(data): Observable<any> {
    return this.http.post("http://localhost:8087/PIDEV_GARANTIA/process_register_customer",data);
  }

  showLoggedCustomer(mail): Observable<any> {
    return this.http.get("http://localhost:8087/PIDEV_GARANTIA/customerInfo/"+mail);
  }

  showCustomers(): Observable<any> {
    return this.http.get("http://localhost:8087/PIDEV_GARANTIA/customersList",
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))});
  }
  editCustomer(Customer:any){
    return this.http.put("http://localhost:8087/PIDEV_GARANTIA/updateCustomer",Customer,{headers: new HttpHeaders().append("Authorization",localStorage.getItem('token'))})
  }
  showCustomersStat(): Observable<any> {
    return this.http.get("http://localhost:8087/PIDEV_GARANTIA/customerscorestat");
  }

  addEmployee(data): Observable<any> {
    return this.http.post("http://localhost:8087/PIDEV_GARANTIA/process_register_employee",data);
  }

  lockAccount() {

  }
}

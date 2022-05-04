import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../customers/customers.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user
  constructor(private customerService:CustomerService) {
    this.getInfo()  }
  getInfo(){
    this.customerService.showLoggedCustomer(localStorage.getItem("mail")).subscribe(res=> {
          this.user = res[0]
          console.log("user",this.user)
        }
    );
  }
  popupUpdate=false
    update(){
      this.popupUpdate=true
    }
  ngOnInit(){}
}

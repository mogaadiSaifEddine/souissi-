import {Component, OnInit, TemplateRef} from '@angular/core';
import {Customer} from "./customer";
import {CustomerService} from "./customers.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  listCustomers: any;
  form: boolean =false;
  customer!: Customer;
  closeResult!: string;
  statisticsArray = new Array(4);
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  public single: any[]=[]
  constructor(private customerService: CustomerService, private modalService: NgbModal,private router: Router) {
    this.iconClick = this.iconClick.bind(this);

/*
    this.customerService.showCustomersStat().subscribe(res=> {
      this.statisticsArray =res
      console.log( this.statisticsArray,' this.statisticsArray')


      this.statisticsArray.forEach(i =>{
        var object = {};
        object["name"]=i.scoreTypeName;
        const str = i.percent;

        const words = str.split('%');

        object["value"]=parseFloat((words[0]))
        this.single.push(object)
      })
      console.log(' this.single', this.single)
    });
    Object.assign(this.single);
    console.log("111")
*/



    // Object.assign(this.single);

    // Object.assign(this, this.single);

  }
  iconClick(e){
    console.log("aaaaaa",e.row.data)
        e.row.data.active=!e.row.data.active
    console.log("222222222",e.row.data)
    this.wsUpdate(e.row.data)
  }
  public onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getCustomersStats()
    // this.single= [...this.single];
  }

  public getAllCustomers() {
    this.customerService.showCustomers().subscribe(res=> this.listCustomers =res);
    //console.log(this.getCustomersStats())
  }

  public getCustomersStats() {
    this.customerService.showCustomersStat().subscribe(res=> {
      this.statisticsArray =res
      console.log( this.statisticsArray,' this.statisticsArray')
      let x=[]

      this.statisticsArray.forEach(i =>{
        var object = {};
        object["name"]=i.scoreTypeName;
        const str = i.percent;

        const words = str.split('%');

        object["value"]=parseFloat((words[0]))
        x.push(object)
      })
      this.single=x
      console.log(' this.single', this.single)
    });
  }
  onToolbarPreparing(e) {

      e.toolbarOptions.items.unshift(
          {
            location: 'after',
            widget: 'dxButton',
            options: {
              hint: "Add",
              icon: 'plus',
              onClick: this.openAdd.bind(this)
            }
          })

    // e.toolbarOptions.items.unshift(
    //     {
    //       location: 'after',
    //       template: 'totalGroupCount'
    //     },
    //     {
  8  //       location: 'after',
    //       widget: 'dxButton',
    //       options: {
    //         hint: localStorage.getItem('refresh'),
    //         icon: 'refresh',
    //         onClick: this.refresh.bind(this),
    //       }
    //     })
  }
  openAdd(){
    this.router.navigate(['/customers/add']);
  }
  public editCustomer(customer: TemplateRef<any>){
    console.log("customer ",customer)
    this.customerService.editCustomer(customer).subscribe();
  }
  update(e){
    console.log("update ",e)
    let param =e.oldData
    if(e.newData.birthDate) param.birthDate=e.newData.birthDate
    if(e.newData.firstName) param.firstName=e.newData.firstName
    if(e.newData.lastName) param.lastName=e.newData.lastName
    if(e.newData.phoneNumber) param.phoneNumber=e.newData.phoneNumber
    if(e.newData.cin) param.cin=e.newData.cin
    if(e.newData.gender) param.gender=e.newData.gender
    if(e.newData.monthlyIncome) param.monthlyIncome=e.newData.monthlyIncome
    if(e.newData.job) param.job=e.newData.job
    if(e.newData.governorate) param.governorate=e.newData.governorate
    if(e.newData.email) param.email=e.newData.email
   this.wsUpdate(param)


  }
  wsUpdate(data){
    this.customerService.editCustomer(data).subscribe(res=>{
      console.log("ok")
    }),error=>{
      console.log("error")
    }
  }
  add(e){
    console.log("add ",e)
    this.customerService.registrationCustomer(e.data).subscribe(res=>{
      console.log("ok")
    }),error=>{
      console.log("error")
    }
  }
  delete(e){

  }
}
2

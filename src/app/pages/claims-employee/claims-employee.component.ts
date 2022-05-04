import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Claim } from 'src/app/shared/model/claim';
import { ClaimService } from 'src/app/shared/services/claim-service';

@Component({
  selector: 'app-claims-employee',
  templateUrl: './claims-employee.component.html',
  styleUrls: ['./claims-employee.component.scss']
})
export class ClaimsEmployeeComponent implements OnInit {

  id!:any;
  listClaims:any;
  form : boolean = false;
   claim!: Claim;
   lat: number = 45.421530 ;
   lng: number = -75.697193;
   zoom: number = 7;
   closeResult! : string;
   type!:string;
  listclaim=[
    {
        "claim_id": 3,
        "claim_description": "error 5",
        "claim_state": "Treated",
        "claim_type": "Complaint",
        "claim_contrat_type": "Habitation",
        "claim_visibility": true,
        "claim_date": "2022-04-08"}]
  constructor(private claimService : ClaimService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getAllClaims();
    this.type="vie";
    this.claim = {
      claim_id!:null,
    claim_description!:null,
    claim_state!:null,
    claim_type!:null,
    claim_contrat_type!:null,
    claim_visibility!:null,
    claim_date!:null,
    }
  }
  getAllClaims(){
    this.claimService.getAllClaims().subscribe(res => this.listClaims = res)
    /*for(var i= 0; i < this.listClaims.length; i++)
{
  this.listClaims[i].;
}*/
  }
  addclaim(p: Claim){
    this.claimService.addClaim(p).subscribe(() => {
      this.getAllClaims();
     // this.form = false;
    });
  }

  editClaim(claim : Claim){
    this.claimService.editClaim(claim).subscribe();
  }
  deleteClaim(idClaim : Number){
    this.claimService.deleteClaim(idClaim).subscribe(() => this.getAllClaims())
  }
  open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
    return null;
  }
  closeForm(){

  }
  cancel(){
    this.form = false;
  }

}

import { Component, OnInit } from "@angular/core";
import { Bank } from "src/app/shared/model/bank";
import { BankService } from "src/app/shared/services/bank-service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "../../login/login.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";
@Component({
  selector: "app-banks",
  templateUrl: "./banks.component.html",
  styleUrls: ["./banks.component.scss"],
})
export class BanksComponent implements OnInit {
  bank: Bank = new Bank();
  bk: any;
  closeResult = "";
  idrec: number;
  userRole;

  constructor(
    public bankService: BankService,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private loginService: LoginService,

    private table: DatatableComponent
  ) {}

  ngOnInit(): void {
    this.getAllBanks();
    this.userRole = localStorage.getItem("role");
    console.log(this.userRole);
  }
  getAllBanks() {
    this.bankService.getAllBanks().subscribe(
      (data) => {
        this.bk = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveBank() {
    console.log(this.bank);
    this.bankService.addBank(this.bank).subscribe(
      (data) => {
        this.getAllBanks();
        this.toaster.success("Bank added successfully");
      },
      (err) => {
        console.log(err);
        this.toaster.error("Error adding bank");
        console.log(false, "not saved");
      }
    );
    this.closeModal();
  }
  deleteBank(id: number) {
    if (confirm("Are you sure you want to delete this bank?"))
      this.bankService.deleteBankById(id).subscribe(
        (data) => {
          this.toaster.success("Bank deleted successfully");
          this.getAllBanks();
        },
        (err) => {
          this.toaster.error("Error deleting bank");
          console.log(err);
        }
      );
  }
  open(content) {
    this.bank = new Bank();
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  open2(content2, bk) {
    this.bank = bk;
    this.modalService
      .open(content2, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  updateBank() {
    console.log(this.bank);
    this.bankService.updateBank(this.bank, this.bank.idBank).subscribe(
      (data) => {
        this.getAllBanks();
        this.toaster.success("Bank updated successfully");
      },
      (err) => {
        console.log(err);
        this.toaster.error("Error updating bank");
      }
    );
    this.closeModal();
  }
  closeModal() {
    this.modalService.dismissAll();
  }
}

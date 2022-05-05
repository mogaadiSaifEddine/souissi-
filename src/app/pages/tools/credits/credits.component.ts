import { Component, OnInit } from "@angular/core";
import { Credit } from "src/app/shared/model/credit";
import { CreditService } from "src/app/shared/services/credit-service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TraitementCredit } from "src/app/shared/model/traitement-credit";
import { DatePipe } from "@angular/common";
import { LoginService } from "../../login/login.service";
import { ToastrService } from "ngx-toastr";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-credits",
  templateUrl: "./credits.component.html",
  styleUrls: ["./credits.component.scss"],
})
export class CreditsComponent implements OnInit {
  credit: Credit = new Credit();
  cr: any;
  closeResult = "";
  idrec: number | null = null;
  idc: number;
  temp = [];
  userRole;
  public traitementCredit = TraitementCredit;
  constructor(
    public creditService: CreditService,
    private modalService: NgbModal,
    public datepipe: DatePipe,
    private loginService: LoginService,
    private toastr: ToastrService,
    private table: DatatableComponent
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem("role");
    this.idc = JSON.parse(localStorage.getItem("userID"));
    this.getAllCredits();
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  getAllCredits() {
    this.userRole === "Employee"
      ? this.creditService.retrieveAllCredits().subscribe(
          (data) => {
            console.log(data);

            this.cr = data.map((credit) => {
              let lastDueDate = this.datepipe.transform(
                credit.lastDueDate,
                "yyyy-MM-dd"
              );
              let startDate = this.datepipe.transform(
                credit.lastDueDate,
                "yyyy-MM-dd"
              );
              credit.lastDueDate = lastDueDate;
              credit.startDate = startDate;
              return credit;
            });
            this.temp = [...this.cr];
          },
          (err) => {
            console.log(err);
          }
        )
      : this.creditService.retrieveCreditByCustomer(this.idc).subscribe(
          (data) => {
            console.log(data);
            this.cr = data.map((credit) => {
              let lastDueDate = this.datepipe.transform(
                credit.lastDueDate,
                "yyyy-MM-dd"
              );
              let startDate = this.datepipe.transform(
                credit.lastDueDate,
                "yyyy-MM-dd"
              );
              credit.lastDueDate = lastDueDate;
              credit.startDate = startDate;
              return credit;
            });
            this.temp = [...this.cr];
          },
          (err) => {
            console.log(err);
          }
        );
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.amountCredit.toString().indexOf(val) !== -1 || !val;
    });
    this.cr = temp;
    this.table.offset = 0;
  }
  saveCredit() {
    console.log(typeof this.credit.traitementCredit);

    this.creditService.requestCreditCustomer(this.credit, this.idc).subscribe(
      (data) => {
        this.getAllCredits();
        this.toastr.success("Credit request sent successfully");
      },
      (err) => {
        console.log(err);
        this.toastr.error("Error sending credit request");
      }
    );
    this.closeModal();
  }
  deleteCredit(id: number) {
    console.log(id);
    if (confirm("Are you sure you want to delete this credit?"))
      this.creditService.suppCredit(id).subscribe(
        (data) => {
          this.getAllCredits();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  verifCredit(id: number) {
    console.log(id);
    if (confirm("Are you sure you want to verify this credit?"))
      this.creditService.verifCredit(id).subscribe(
        (data) => {
          this.getAllCredits();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  closeCredit(id: number) {
    console.log(id);
    if (confirm("Are you sure you want to close this credit?"))
      this.creditService.closeCredit(id).subscribe(
        (data) => {},
        (err) => {
          if (err.error.text !== "Unpaid Credit") {
            this.toastr.error("Error closing credit");
          } else {
            this.getAllCredits();
            this.toastr.success("Credit closed successfully");
          }
        }
      );
  }
  open(content) {
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
  open2(content2, cr) {
    console.log(cr);

    this.credit = cr;
    console.log(this.credit);

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

  updateCredit() {
    this.userRole === "Employee"
      ? this.creditService
          .refreshCredit(this.credit, this.credit.idCredit)
          .subscribe(
            (data) => {
              this.toastr.success("Credit updated successfully");
              this.getAllCredits();
            },
            (err) => {
              this.toastr.error("Error updating credit");
              console.log(err);
            }
          )
      : this.closeModal();
  }
}

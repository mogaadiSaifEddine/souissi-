import { Component, OnInit } from "@angular/core";
import { TransactionCredit } from "src/app/shared/model/transaction-credit";
import { TransactionCreditService } from "src/app/shared/services/transaction-credit-service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Credit } from "src/app/shared/model/credit";
import { CreditService } from "src/app/shared/services/credit-service";
import { ToastrService } from "ngx-toastr";
import { isThisSecond } from "date-fns";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  transactionCredit: TransactionCredit = new TransactionCredit();
  tc: any;
  credit: Credit = new Credit();
  cr: any;
  closeResult = "";
  idrec: number;
  userRole;
  temp = [];
  products = [];
  x = [1, 2, 3];
  somme = 0;
  public colorScheme = {
    domain: ["#FFFFFF"],
  };
  profit;
  customers;
  constructor(
    public transactionCreditService: TransactionCreditService,
    public creditService: CreditService,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private table: DatatableComponent,
    private datePipe: DatePipe
  ) {}
  // public profit = [
  //   { name: "profit", value: 52470, extra: { format: "currency" } },
  // ];
  public profitBgColor = { domain: ["#0096A6"] };
  public xAxisLabel = "Year";
  public showYAxisLabel = true;
  public yAxisLabel = "Population";
  ngOnInit(): void {
    this.userRole = localStorage.getItem("role");
    // this.getDbData()
    // this.retrieveAllCredits();
    // this.listTransactionsPerYear();
    // this.getSommeTransactions();
    this.getDbData();
  }
  getDbData() {
    this.retrieveAllTransactions();
    this.retrieveAllCredits();
    this.listTransactionsPerYear();
    this.getSommeTransactions();
  }
  public onSelect(event) {
    console.log(event);
  }
  public infoValueFormat(c): string {
    switch (c.data.extra ? c.data.extra.format : "") {
      case "currency":
        return `\$${Math.round(c.value).toLocaleString()}`;
      case "percent":
        return `${Math.round(c.value * 100)}%`;
      default:
        return c.value.toLocaleString();
    }
  }

  listTransactionsPerYear() {
    this.transactionCreditService.listTransactionsPerYear(2022).subscribe(
      (data) => {
        this.products = data.map((item) => {
          let name = item.dateTransaction;
          let value = item.amountTransaction;
          return { name, value };
        });
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  retrieveAllTransactions() {
    // this.transactionCredit.dateTransaction;
    this.transactionCreditService.retrieveAllTransactions().subscribe(
      (data) => {
        this.temp = [...data];

        this.tc = data.map((item) => {
          let dateTransaction = this.datePipe.transform(
            item.dateTransaction,
            "yyyy-MM-dd"
          );
          item.dateTransaction = dateTransaction;
          return item;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  retrieveAllCredits() {
    this.creditService.retrieveAllCredits().subscribe(
      (data) => {
        this.cr = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveTransactionCredit(idCredit: number) {
    this.transactionCreditService
      .passerUnVirement(this.transactionCredit, idCredit)
      .subscribe(
        (data) => {
          this.getDbData();
          this.toaster.success("Transaction effectuée", "succes");
        },
        (err) => {
          console.log(err);
          this.toaster.error("Transaction non effectuée", "Erreur");
        }
      );
    this.closeModal();
  }
  getSommeTransactions() {
    this.transactionCreditService.SommeTransactions().subscribe(
      (data) => {
        console.log(data);
        this.profit = [
          { name: "profit", value: data, extra: { format: "currency" } },
        ];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.amountTransaction.toString().indexOf(val) !== -1 || !val;
    });
    this.tc = temp;
    this.table.offset = 0;
  }
  deleteTransactionCredit(id: number) {
    if (confirm("Are you sure to delete this record?"))
      this.transactionCreditService.suppTransaction(id).subscribe(
        (data) => {
          this.getDbData();
        },
        (err) => {
          this.getDbData();

          if (err.error.text !== "deleted")
            this.toaster.error("Transaction non vérifiée", "Erreur");
          else {
            this.toaster.success("Transaction Deleted", "succes");
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
  open2(content2, tc) {
    this.transactionCredit = tc;
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
  closeModal() {
    this.modalService.dismissAll();
  }
  updateTransactionCredit() {
    this.transactionCreditService
      .updateTransaction(
        this.transactionCredit,
        this.transactionCredit.idTransaction
      )
      .subscribe(
        (data) => {
          this.getDbData();
          this.toaster.success("Transaction Updated", "succes");
        },
        (err) => {
          console.log(err);
          this.toaster.error("Transaction not Updated", "Erreur");
        }
      );
    this.closeModal();
  }
}

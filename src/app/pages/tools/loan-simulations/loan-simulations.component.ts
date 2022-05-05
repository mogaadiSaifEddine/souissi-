import { Component, OnInit } from "@angular/core";
import { LoanSimulation } from "src/app/shared/model/loan-simulation";
import { LoanSimulationService } from "src/app/shared/services/loan-simulation-service";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { Bank } from "src/app/shared/model/bank";
import { BankService } from "src/app/shared/services/bank-service";
import { FormGroup } from "@angular/forms";
import {
  IMultiSelectSettings,
  IMultiSelectTexts,
} from "angular-2-dropdown-multiselect";
import { DatatableComponent } from "@swimlane/ngx-datatable";
@Component({
  selector: "app-loan-simulations",
  templateUrl: "./loan-simulations.component.html",
  styleUrls: ["./loan-simulations.component.scss"],
})
export class LoanSimulationsComponent implements OnInit {
  loanSimulation: LoanSimulation = new LoanSimulation();
  ls: any;
  idrec: number;
  nameBank: string;
  nbrAnnee: number;
  salaire: number;
  ofID: number;
  closeResult = "";
  bank: Bank = new Bank();
  bk: any;
  of;
  idc;
  public searchText: string;
  public p: any;
  public type: string = "grid";
  public modalRef: NgbModalRef;
  public form: FormGroup;
  mode = false;
  temp: any[] = [];
  userRole;
  constructor(
    public loanSimulationService: LoanSimulationService,
    private table: DatatableComponent,
    private modalService: NgbModal,
    public bankservice: BankService
  ) {}

  public menuSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: "fontawesome",
    buttonClasses: "btn btn-secondary btn-block",
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true,
  };
  public menuSelectTexts: IMultiSelectTexts = {
    checkAll: "Select all",
    uncheckAll: "Unselect all",
    checked: "menu item selected",
    checkedPlural: "menu items selected",
    searchPlaceholder: "Find menu item...",
    defaultTitle: "Select menu items for user",
    allSelected: "All selected",
  };

  ngOnInit(): void {
    this.userRole = localStorage.getItem("role");
    this.idc = localStorage.getItem("userID");
    this.getAllBanks();
    this.getAllSimulations();
    this.getAllOffers();
  }
  getAllOffers() {
    this.loanSimulationService.getOffers().subscribe(
      (data) => {
        this.of = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllSimulations() {
    this.loanSimulationService.getAllSimulations().subscribe(
      (data) => {
        console.log(data);

        this.ls = data.filter((el) => el.activ === true);
        this.temp = [...this.ls];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAllBanks() {
    this.bankservice.getAllBanks().subscribe(
      (data) => {
        this.bk = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  saveLoanSimulation(
    nameBank: string,
    nbrAnnee: number,
    salaire: number,
    of: number
  ) {
    console.log(this.mode);

    this.mode
      ? this.loanSimulationService
          .addSimulation(of, this.idc, nameBank, nbrAnnee, salaire)
          .subscribe(
            (data) => {
              this.getAllSimulations();
              console.log(data);
            },
            (err) => {
              console.log(err);
            }
          )
      : this.loanSimulationService
          .Simulate(of, nameBank, nbrAnnee, salaire)
          .subscribe(
            (data) => {
              this.getAllSimulations();
              console.log(data);
            },
            (err) => {
              console.log(err);
            }
          );
    this.closeModal();
  }
  deleteLoanSimulation(id: number) {
    this.loanSimulationService.deleteSimulationById(id).subscribe(
      (data) => {
        this.getAllSimulations();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  confirmSimulation(id: number) {
    this.loanSimulationService.confirmSimulation(id).subscribe(
      (data) => {
        this.getAllSimulations();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.taux.toString().indexOf(val) !== -1 || !val;
    });
    this.ls = temp;
    this.table.offset = 0;
  }
  unconfirmSimulation(id: number) {
    this.loanSimulationService.unconfirmSimulation(id).subscribe(
      (data) => {
        this.getAllSimulations();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  open(content, mode) {
    this.mode = mode;
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
  open2(content2, ls) {
    this.loanSimulation = ls;
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
  public toggle(type) {
    this.type = type;
  }

  public openMenuAssign(event) {
    let parent = event.target.parentNode;
    while (parent) {
      parent = parent.parentNode;
      if (parent.classList.contains("content")) {
        parent.classList.add("flipped");
        parent.parentNode.parentNode.classList.add("z-index-1");
        break;
      }
    }
  }

  public closeMenuAssign(event) {
    let parent = event.target.parentNode;
    while (parent) {
      parent = parent.parentNode;
      if (parent.classList.contains("content")) {
        parent.classList.remove("flipped");
        parent.parentNode.parentNode.classList.remove("z-index-1");
        break;
      }
    }
  }

  public closeModal() {
    this.modalRef.close();
  }
}

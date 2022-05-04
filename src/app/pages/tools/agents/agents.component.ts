import { Component, OnInit } from "@angular/core";
import { Agent } from "src/app/shared/model/agent";
import { AgentService } from "src/app/shared/services/agent-service";
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { Bank } from "src/app/shared/model/bank";
import { BankService } from "src/app/shared/services/bank-service";
import { FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import {
  IMultiSelectSettings,
  IMultiSelectTexts,
} from "angular-2-dropdown-multiselect";

@Component({
  selector: "app-agents",
  templateUrl: "./agents.component.html",
  styleUrls: ["./agents.component.scss"],
})
export class AgentsComponent implements OnInit {
  agent: Agent = new Agent();
  bank: Bank = new Bank();
  bk: any;
  idrec: number;
  ag: any;
  closeResult = "";
  public searchText: string;
  public p: any;
  public type: string = "grid";
  public form: FormGroup;

  constructor(
    public agentservice: AgentService,
    private modalService: NgbModal,
    public bankservice: BankService,
    private activeModalService: NgbActiveModal, // public modalRef: NgbModalRef
    private toaster: ToastrService
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
    this.getAllAgents();
    this.getAllBanks();
  }
  getAllBanks(id?: number) {
    this.bankservice.getAllBanks().subscribe(
      (data) => {
        this.bk = data.filter(
          (bank) => bank.used === false || bank.idBank === id
        );
        console.log(this.bk);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAllAgents() {
    this.agentservice.getAllAgents().subscribe(
      (data) => {
        this.ag = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveAgent(id: number) {
    this.agentservice.addAgent(this.agent, id).subscribe(
      (data) => {
        this.toaster.success("Agent ajouté avec succès");
        this.getAllAgents();
        this.getAllBanks();
        this.closeModal();
      },
      (err) => {
        this.toaster.error("Erreur lors de l'ajout");
        console.log(err);
      }
    );
  }
  deleteAgent(agent) {
    if (confirm("Voulez-vous vraiment supprimer cet agent?"))
      this.agentservice
        .deleteAgentById(agent.idAgent, agent.bankAgent.idBank)
        .subscribe(
          (data) => {
            this.toaster.success("Agent supprimé avec succès");
            this.getAllAgents();
            this.getAllBanks();
          },
          (err) => {
            this.toaster.error("Erreur lors de la suppression");
            console.log(err);
          }
        );
  }
  open(content) {
    this.agent = new Agent();
    this.getAllBanks();
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.getAllAgents();
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  open2(content2, ag) {
    this.agent = ag;
    this.getAllBanks(this.agent.bankAgent.idBank);

    this.modalService

      .open(content2, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.getAllAgents();

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

  updateAgent() {
    this.agentservice.updateAgent(this.agent, this.agent.idAgent).subscribe(
      (data) => {
        this.toaster.success("Agent modifié avec succès");
        this.getAllAgents();
        this.getAllBanks();
        this.closeModal();
      },
      (err) => {
        this.toaster.error("Erreur lors de la modification");
        console.log(err);
      }
    );
    this.closeModal();
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
}

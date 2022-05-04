import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DragulaModule } from "ng2-dragula";
import { ResizableModule } from "angular-resizable-element";
import { DirectivesModule } from "../../theme/directives/directives.module";
import { BanksComponent } from "./banks/banks.component";
import { AgentsComponent } from "./agents/agents.component";
import { LoanSimulationsComponent } from "./loan-simulations/loan-simulations.component";
import { CreditsComponent } from "./credits/credits.component";
import { TransactionsComponent } from "../credits/transactions/transactions.component";
import {
  DatatableComponent,
  NgxDatatableModule,
} from "@swimlane/ngx-datatable";

export const routes = [
  { path: "", redirectTo: "banks", pathMatch: "full" },
  { path: "banks", component: BanksComponent },
  { path: "agents", component: AgentsComponent },
  { path: "credits", component: CreditsComponent },
  { path: "loansimulations", component: LoanSimulationsComponent },
  { path: "transactions", component: TransactionsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    PerfectScrollbarModule,
    DragulaModule.forRoot(),
    ResizableModule,
    DirectivesModule,
    NgxDatatableModule,
  ],
  declarations: [
    BanksComponent,
    AgentsComponent,
    CreditsComponent,
    LoanSimulationsComponent,
    TransactionsComponent,
  ],
  providers: [DatatableComponent],
})
export class ToolsModule {}

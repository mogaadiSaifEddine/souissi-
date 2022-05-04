import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { LoanSimulationsComponent } from './loan-simulations/loan-simulations.component';
import { CreditsComponent } from './credits/credits.component';
import { AgentsComponent } from './agents/agents.component';
import { BanksComponent } from './banks/banks.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



export const routes = [
  { path: '', redirectTo: 'banks', pathMatch: 'full'},
  { path: 'banks', component: BanksComponent },
  { path: 'agents', component: AgentsComponent},
  { path: 'credits', component: CreditsComponent},
  { path: 'loansimulations', component: LoanSimulationsComponent },
  { path: 'transactions', component: TransactionsComponent }
];

@NgModule({
  imports: [
    NgbModule,
     CommonModule,
    DirectivesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BanksComponent,
    AgentsComponent,
    CreditsComponent,
    LoanSimulationsComponent,
    TransactionsComponent,
 
  ]
})
export class CreditsModule {
}

import { Bank } from "./bank";
import { CustomerAccount } from "./customer-account";
import { StatutLoanSimulation } from "./statut-loan-simulation";

export class LoanSimulation {
    
    idLoan!:number;
	
	taux!:number;
	
	mensuel!:number;

	capaciteDeRemboursement!:number;
	
	interet!:number;
	
	interetTotale!:number;
	
	mensualite!:number;
	
	principale!:number;
	
	montantRembourse!:number;
	
	prixImmob!:number;
	
	salaire!:number;
	
	dateStartSimulation!:Date;
	
	statusLoanSimulation!:StatutLoanSimulation;

	bankLoan!:Bank;

	customerAccountLoan!:CustomerAccount;
	
	
}

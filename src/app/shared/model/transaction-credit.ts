import { Credit } from "./credit";
import { StatutTransaction } from "./statut-transaction";

export class TransactionCredit {
    
    idTransaction!:number;
	
	dateTransaction!: Date;

	sourceAccountNumber!:number;
	
	destinedAccountNumber!:number;
	
	amountTransaction!:number;
    
	soldeCompteEmetteur!:number;

	soldeCompteRecepteur!:number;

	description!:number;
	
	statutTransaction!:StatutTransaction;
    
	
	creditTransaction!:Credit;
	
}

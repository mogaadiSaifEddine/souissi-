import { ClaimContratType } from "./claim-contrat-type";
import { ClaimState } from "./claim-state";
import { ClaimType } from "./claim-type";
import { CustomerAccount } from "./customer-account";

export class Claim {
    claim_id!:Number;
    claim_description!:String;
    claim_state!:ClaimState;
    claim_type!:ClaimType;
    claim_contrat_type!:ClaimContratType;
    claim_visibility!:Boolean;
    claim_date!:Date;
   // customerClaim:CustomerAccount[] ;
    }
    
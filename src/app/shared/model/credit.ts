import { CustomerAccount } from "./customer-account";
import { StatutCredit } from "./statut-credit";
import { TraitementCredit } from "./traitement-credit";
import { TransactionCredit } from "./transaction-credit";
import { VerificationCredit } from "./verification-credit";

export class Credit {
  idCredit!: number;

  amountCredit!: number;

  amountRemainingCredit!: number;

  startDate!: Date | string;

  lastDueDate!: Date | string;

  traitementCredit!: TraitementCredit;

  statutCredit!: StatutCredit;

  verificationCredit!: VerificationCredit;

  transactions!: Set<TransactionCredit>;

  customerCredit!: CustomerAccount;
}

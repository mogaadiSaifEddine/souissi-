import { Agent } from "./agent";
import { LoanSimulation } from "./loan-simulation";

export class Bank {
  idBank!: number;

  nameBank!: string;

  descriptionBank!: string;

  adresseBank!: string;

  tauxMoyenDuMarche!: number;

  margeInteretBank!: number;

  agentBank!: Agent;

  LoanSimulatorListBank!: Set<LoanSimulation>;
  used: boolean;
}

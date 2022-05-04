import { Bank } from "./bank";

export class Agent {
  idAgent?: number;

  phoneAgent!: number;

  addressAgent!: string;

  firstName!: string;

  lastName!: string;

  email!: string;

  bankAgent?: Bank;
}

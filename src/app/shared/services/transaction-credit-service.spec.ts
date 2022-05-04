import { TestBed } from '@angular/core/testing';
import { TransactionCreditService } from './transaction-credit-service';

describe('LoanSimulationService', () => {
  let service : TransactionCreditService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

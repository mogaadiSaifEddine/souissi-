import { TestBed } from '@angular/core/testing';
import { LoanSimulationService } from './loan-simulation-service';

describe('LoanSimulationService', () => {
  let service : LoanSimulationService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanSimulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

import { TestBed } from '@angular/core/testing';

import { EscritorioService } from './escritorio.service';

describe('EscritorioService', () => {
  let service: EscritorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscritorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

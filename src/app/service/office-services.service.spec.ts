import { TestBed } from '@angular/core/testing';

import { OfficeServicesService } from './office-services.service';

describe('OfficeServicesService', () => {
  let service: OfficeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

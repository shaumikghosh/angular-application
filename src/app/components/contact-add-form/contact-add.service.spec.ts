import { TestBed } from '@angular/core/testing';

import { ContactAddService } from './contact-add.service';

describe('ContactAddService', () => {
  let service: ContactAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

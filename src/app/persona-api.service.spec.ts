import { TestBed } from '@angular/core/testing';

import { PersonaApiService } from './Persona-api.service';

describe('PersonaApiService', () => {
  let service: PersonaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

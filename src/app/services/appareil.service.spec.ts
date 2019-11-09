import { TestBed } from '@angular/core/testing';

import { AppareilService } from './appareil.service';

describe('AppareilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppareilService = TestBed.get(AppareilService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ModeSwitchServiceTsService } from './mode-switch.service.ts.service';

describe('ModeSwitchServiceTsService', () => {
  let service: ModeSwitchServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeSwitchServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

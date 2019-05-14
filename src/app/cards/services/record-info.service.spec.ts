import { TestBed } from '@angular/core/testing';

import { RecordInfoService } from './record-info.service';

describe('RecordInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordInfoService = TestBed.get(RecordInfoService);
    expect(service).toBeTruthy();
  });
});

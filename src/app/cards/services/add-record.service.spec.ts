import { TestBed } from '@angular/core/testing';

import { AddRecordService } from './add-record.service';

describe('AddRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddRecordService = TestBed.get(AddRecordService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ActualContentService } from './actual-content.service';

describe('CommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActualContentService = TestBed.get(ActualContentService);
    expect(service).toBeTruthy();
  });
});
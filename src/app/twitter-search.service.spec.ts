import { TestBed } from '@angular/core/testing';

import { TwitterSearchService } from './twitter-search.service';

describe('TwitterSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwitterSearchService = TestBed.get(TwitterSearchService);
    expect(service).toBeTruthy();
  });
});

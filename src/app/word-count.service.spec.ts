import { TestBed } from '@angular/core/testing';

import { WordCountService } from './word-count.service';

describe('WordCountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordCountService = TestBed.get(WordCountService);
    expect(service).toBeTruthy();
  });
});

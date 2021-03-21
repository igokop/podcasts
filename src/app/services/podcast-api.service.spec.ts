import { TestBed } from '@angular/core/testing';

import { PodcastApiService } from './podcast-api.service';

describe('PodcastApiService', () => {
  let service: PodcastApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodcastApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

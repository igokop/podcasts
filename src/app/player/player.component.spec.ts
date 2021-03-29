import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PodcastApiService } from '../services/podcast-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [PlayerComponent],
      providers: [PodcastApiService],
      imports: [HttpClientTestingModule]
    });
  })

  it ('should create the component', () =>{
    let fixture = TestBed.createComponent(PlayerComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })

  it('take value from event emitter', () =>{
    let fixture = TestBed.createComponent(PlayerComponent);
    let app = fixture.debugElement.componentInstance; 
    let podcastApiService = fixture.debugElement.injector.get(PodcastApiService);
    // let spy = spyOn(podcastApiService, 'getDataPoland');
    fixture.detectChanges();
    podcastApiService.poland.subscribe(value => expect(app.trendingPoland).toBe(value));
  })
});

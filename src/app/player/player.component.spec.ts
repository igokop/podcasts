import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core/testing";
import { of } from "rxjs";
import { AudioService } from "../services/audio.service";
import { CloudService } from "../services/cloud.service";
import { PodcastApiService } from "../services/podcast-api.service";
import { PlayerComponent } from "./player.component";

describe('PlayerComponent', () => {
  let component: PlayerComponent; 
  let podcastApiService: PodcastApiService;
  let cloudService: CloudService;
  let audioService: AudioService;

  beforeEach(()=>{
    component = new PlayerComponent(audioService, cloudService, podcastApiService);
    podcastApiService = new PodcastApiService(null);
  });

  // it('should get trending Poland data', inject([HttpClient], (httpClient: HttpClient) =>{
  //   podcastApiService.poland.subscribe(res => respond = res);

  //   let data: {podcast:'Paciorek', language: 'pl'};
  //   let respond;
  //   console.log(data);

  //   spyOn(podcastApiService, 'getDataPoland').and.returnValue();
  //   spyOn(httpClient.get).and.returnValue(of([]));

  //   component.getDataPoland();

  //   expect(respond).toBe(data.podcast);
  // });


  // it('getting info that first song is playing', ()=> {

  // });

  




});
import { empty, from, of } from "rxjs";
import { AudioService } from "../services/audio.service";
import { CloudService } from "../services/cloud.service";
import { PodcastApiService } from "../services/podcast-api.service";
import { QueueComponent } from "./queue.component";

describe('QueueComponent', () => {
  let component: QueueComponent; 
  let podcastApiService: PodcastApiService;
  let cloudService: CloudService;
  let audioService: AudioService;

  beforeEach(()=>{
    cloudService = new CloudService(null);
    podcastApiService = new PodcastApiService(null);
    audioService = new AudioService();
    component = new QueueComponent(audioService, cloudService, podcastApiService);
  });

  it('should event emitter works after added file to favorites; funtion: addFile()', ()=>{
    cloudService.filesUpdate.subscribe(data => counter++);

    let counter: number = 0
    let res: any;

    spyOn(cloudService, 'storeFavorites').and.returnValue(res);

    component.searchResult = [1,2,3];
    component.addFile(2);

    expect(counter).not.toBe(0);


  });

  it('should delete file and after emit information; function: deleteIt()', () =>{
    cloudService.filesUpdate.subscribe (data=> counter++);

    let counter: number = 0
    let res: any;

    spyOn(cloudService, 'storeFavorites').and.returnValue(res);

    cloudService.files = [1,2,3];
    component.deleteIt(2);

    expect(cloudService.files).toEqual([1,2]);
    expect(counter).toBe(1);
  })

  it('check if after choose podcast from favorites it will be playing; function: openFile()', ()=>{
    cloudService.currentUpdate.subscribe (data=> counter++);

    
    const file = 'test';
    const index = 1;
    let counter = 0;
    let res: any;

    spyOn(component, 'playStream').and.returnValue(res);

    component.openFile(file, index);

    expect(counter).toBe(1);
  });

  // it('check if play works; playStream()', ()=> {

  //   let res: any;

  //   spyOn(audioService, 'playStream').and.returnValue(res);

  //   component.playStream('test');
  // })


  // it('check if the submit button works; function: submit()', () =>{
  //   podcastApiService.searchUpdate.subscribe (data=> counter++);

  //   let counter: number = 0
  //   let res: any;

  //   component.search.patchValue({searchPodcast: 'test'});
  //   component.selectedLanguage = 'test';

  //   spyOn(podcastApiService, 'getData').and.returnValue(res);

  //   component.onSubmit();

  //   expect(counter).toBe(1);

  // });


  // it('should get trending Poland data', ()=>{
  //   let data: any;
  //   let increment = 0;
  //   // podcastApiService.poland.subscribe(t => increment++)
  //   podcastApiService.poland.subscribe(something => increment++)
  //   // spyOn(podcastApiService, 'getDataPoland').

  //   component.getDataPoland();

  //   expect(component.trendingPoland).toBe(data);
  // });

  




});
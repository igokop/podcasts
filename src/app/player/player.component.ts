import { Component, OnInit } from '@angular/core';
import { StreamState } from '../interfaces/stream-state';
import { AudioService } from '../services/audio.service';
import { CloudService } from '../services/cloud.service';
import { PodcastApiService } from '../services/podcast-api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  isPlaying:boolean = false;
  files: Array<any> = [];
  state: StreamState;
  photo: string = 'https://production.listennotes.com/web/image/776f23644387485291977e49dea90b71.png';
  name: string = 'Go to favourites and choose episode' 
  author: string;
  trendingWorld = [];
  trendingPoland= [];
  currentFile: any = {};
  constructor(public audioService: AudioService, public cloudService: CloudService, private podcastApiService: PodcastApiService) {}

  playStream(url) {
    this.audioService.playStream(url).subscribe();
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.audio);
    this.cloudService.currentFileSet(this.currentFile);
    
  }

  pause() {
    this.audioService.pause();
    this.isPlaying = !this.isPlaying;
  }

  play() {
    this.audioService.play();
    this.isPlaying = !this.isPlaying;
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    // const index = this.currentFile.index + 1;
    // const file = this.files[index];
    // this.openFile(file, index);
    this.audioService.seekPlus();
  }

  previous() {
    // const index = this.currentFile.index - 1;
    // const file = this.files[index];
    // this.openFile(file, index);
    this.audioService.seekMinus();
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }
  ngOnInit(): void {
    this.podcastApiService.getDataWorld();
    this.podcastApiService.world.subscribe(data => {this.trendingWorld=data;})
    this.getDataPoland();
    this.podcastApiService.poland.subscribe(data => {this.trendingPoland=data;})
    this.cloudService.getFavorites();
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
    this.cloudService.getFiles().subscribe(files => {this.files = files;});
    this.cloudService.currentUpdate.subscribe(current => {
      this.currentFile = current;
      this.photo = current.file.image; 
      this.name= current.file.title_original; 
      this.author = current.file.podcast.title_original});
  }

  getDataPoland(){
    this.podcastApiService.getDataPoland();
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AudioService } from '../services/audio.service';
import { CloudService } from '../services/cloud.service';
import { PodcastApiService } from '../services/podcast-api.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  constructor(private audioService: AudioService, private cloudService: CloudService, private podcastApiService: PodcastApiService){
    cloudService.getFiles().subscribe(files => {
      this.episodes = files;
    });
    cloudService.currentUpdate.subscribe(current => this.currentFile = current);
    cloudService.filesUpdate.subscribe(episodes => this.episodes = episodes)
  }
  selectedUser: string;
  selectedLanguage: string = 'English';
  languages: string[] = ['English', 'Polish', 'German', 'Italian'];
  users: string[] = ['User1', 'User2', 'User3', 'User4']
  playing:boolean;
  episodes: Array<any> = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  currentFile: any =[];
  search: FormGroup;
  searchResult = [];

  openFile(file, index) {
    this.currentFile = { index, file };
    this.cloudService.currentFileSet(this.currentFile);
    this.audioService.stop();
    this.playStream(file.audio);
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  ngOnInit() {
    
    this.search = new FormGroup({
      'searchPodcasts': new FormControl});
    this.audioService.stateChange.subscribe(info => this.playing = info.playing);
    if(this.episodes[0]){
      const number = 0;
      const array = this.episodes[0];
      const defaultValue = {number, array}
      this.cloudService.currentFileSet(defaultValue);
    }
    this.podcastApiService.searchUpdate.subscribe(data => {this.searchResult = data})
  }

  onSubmit(){
    this.podcastApiService.getData(this.search.value.searchPodcasts, this.selectedLanguage);
    this.search.reset();
    
  }

  addFile(i){
    this.cloudService.addFile(this.searchResult[i]);
    if(this.episodes[0]){
      const index = 0;
      const file = this.episodes[0];
      const defaultValue = {file, index}
      this.cloudService.currentFileSet(defaultValue);
    }
  }

  deleteIt(i){
    this.cloudService.deleteFile(i);
  }
}

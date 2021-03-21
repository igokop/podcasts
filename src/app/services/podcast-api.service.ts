import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PodcastApiService {
  @Output() searchUpdate: EventEmitter<any> = new EventEmitter();
  @Output() world: EventEmitter<any> = new EventEmitter();
  @Output() poland: EventEmitter<any> = new EventEmitter();
  @Output() podcast: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  getData(search, language){
    const headers = { 'X-ListenAPI-Key': '6e45e6bcbcaa4c3999f2255fa01e335a' }
      this.http.get<any>("https://listen-api.listennotes.com/api/v2/search?q="+ search +"&sort_by_date=1&type=episode&language="+ language +"&safe_mode=0", { headers })
      .subscribe(data =>{this.searchUpdate.emit(data.results)})
  }

  getDataPoland(){
    const headers = { 'X-ListenAPI-Key': '6e45e6bcbcaa4c3999f2255fa01e335a' }
      this.http.get<any>("https://listen-api.listennotes.com/api/v2/best_podcasts?page=1&region=pl&safe_mode=0", { headers })
      .subscribe(data =>{
        this.poland.emit(data.podcasts)})
  }
  getDataWorld(){
    const headers = { 'X-ListenAPI-Key': '6e45e6bcbcaa4c3999f2255fa01e335a' }
      this.http.get<any>("https://listen-api.listennotes.com/api/v2/best_podcasts?page=1&safe_mode=0", { headers })
      .subscribe(data =>{this.world.emit(data.podcasts)})
  }
  // getPodcast(name){
  //   const headers = { 'X-ListenAPI-Key': '6e45e6bcbcaa4c3999f2255fa01e335a' }
  //     this.http.get<any>("https://listen-api.listennotes.com/api/v2/search?q="+ name +"&sort_by_date=1&type=podcast&offset=0&only_in=title%2Cdescription&safe_mode=0", { headers })
  //     .subscribe(data =>{
  //       this.podcast.emit(data.results);
  //       console.log(data.results[0].podcast)})
  // }
}
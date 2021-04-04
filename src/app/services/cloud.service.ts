// src/app/services/cloud.service.ts
import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CloudService {
  constructor(private http: HttpClient){}
  @Output() currentUpdate: EventEmitter<any> = new EventEmitter();
  @Output() filesUpdate: EventEmitter<any> = new EventEmitter();
  currentFile: any;
  currentFileSet(currentFile){
    this.currentFile = currentFile;
    this.currentUpdate.emit(this.currentFile);
  }
  files: any = [];

  getFiles() {
    return of(this.files);
  }
  addFile(file){
    this.files.push(file);
    this.storeFavorites(this.files);
    this.filesUpdate.emit(this.files);
  }

  getFavorites(){
    this.http.get('https://socketpodcast-default-rtdb.firebaseio.com/favorites.json').subscribe(favorites=>{
    if(favorites){
        this.files = favorites;
        this.filesUpdate.emit(favorites);
    }
    });
  }

  storeFavorites(favorites){
    this.http.put('https://socketpodcast-default-rtdb.firebaseio.com/favorites.json', favorites).subscribe(response=>{console.log(response)});
  }

  deleteFile(i){
    this.files.splice(i,1);
    this.storeFavorites(this.files);
    this.filesUpdate.emit(this.files);

  }
}
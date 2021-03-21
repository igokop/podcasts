import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { QueueComponent } from './queue/queue.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { PodcastApiService } from './services/podcast-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AlertInfoComponent } from './alert-info/alert-info.component'
import { MatRadioModule } from '@angular/material/radio/'

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    QueueComponent,
    AlertInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    HttpClientModule,
    MatToolbarModule,
    MatRadioModule
    
    
  ],
  providers: [PodcastApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordCountComponent } from './word-count/word-count.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TwitterSearchService } from './twitter-search.service';
import { MatInputModule, MatButtonModule, MatGridListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    WordCountComponent,
    SentimentComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule
  ],
  providers: [
    TwitterSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

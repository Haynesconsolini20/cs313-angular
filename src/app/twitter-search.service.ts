import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TwitterSearchService {

  search: string;
  sentiment: any;
  wordCount: any;


  getWords(): void {
    console.log('get words called');
    this.httpClient.get('/api/count?search=' + this.search).subscribe(
      values => {
        console.log('got word count response');
        this.wordCount.next(values);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  getScores(): void {
    console.log('get scores called');
    this.httpClient.get('/api/sentiment?search=' + this.search).subscribe(
      value => {
        this.sentiment.next(value);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  query(search: string): void {
    this.search = search;
    console.log('query called');
    this.getWords();
    this.getScores();
  }

  constructor(private httpClient: HttpClient) {
      this.sentiment = new BehaviorSubject(1);
      this.wordCount = new BehaviorSubject(1);
      this.query('test');
   }
}

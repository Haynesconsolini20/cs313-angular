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
  queries: any;
  topics: any;
  tweets: any;


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

  getTopics(): void {
    console.log('get topics called');
    this.httpClient.get('/api/related?search=' + this.search).subscribe(
      values => {
        console.log('got related topics response');
        this.topics.next(values);
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

  getTweets(): void {
    console.log('get scores called');
    this.httpClient.get('/api/tweets?search=' + this.search).subscribe(
      value => {
        this.tweets.next(value);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  getQueries(): void {
    console.log('get queries called');
    this.httpClient.get('/db/get').subscribe(
      value => {
        this.queries.next(value);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  postQueries(): void {
    console.log('post queries called');
    this.httpClient.post('/db/post?search=' + this.search, '').subscribe(
      value => {
        console.log(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  query(search: string): void {
    this.search = search;
    console.log('query called');
    this.getWords();
    this.getScores();
    this.postQueries();
    this.getQueries();
    this.getTopics();
    this.getTweets();

  }

  constructor(private httpClient: HttpClient) {
      this.sentiment = new BehaviorSubject(1);
      this.wordCount = new BehaviorSubject(1);
      this.queries = new BehaviorSubject(1);
      this.topics = new BehaviorSubject(1);
      this.tweets = new BehaviorSubject(1);
      this.query('test');
   }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  getScores(): Observable<any> {
    return this.httpClient.get('/api/sentiment?search=test');
  }
  constructor(private httpClient: HttpClient) { }
}

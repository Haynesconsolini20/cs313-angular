import { Injectable } from '@angular/core';
import { mockWords } from './mock-words';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordCountService {

  getWords(search: string): Observable<any> {
    return this.httpClient.get('/api/count?search=' + search);
  }

  getTest(): Observable<any> {
    return this.httpClient.get('/api/test');
  }

  constructor(private httpClient: HttpClient) { }
}

import { Component, OnInit } from '@angular/core';
import { TwitterSearchService } from '../twitter-search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchQuery: string;
  results: string;

  search(): void {
    this.twitterSearchService.query(this.searchQuery);
    this.results = 'function called';
    console.log('search called');
  }
  constructor(private twitterSearchService: TwitterSearchService) { }

  ngOnInit() {
  }

}

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
  options: string[];

  search(): void {
    this.twitterSearchService.query(this.searchQuery);
    this.results = 'function called';
    console.log('search called');
  }

  updateOptions(results): void {
    console.log('updating options');
    this.options = [];
    for (const row of results) {
      this.options.push(row.query_text);
    }
    console.log('updated options: ');
    console.log(this.options);
  }
  constructor(private twitterSearchService: TwitterSearchService) { }

  ngOnInit() {
    this.twitterSearchService.queries.subscribe(
      value => {
        this.updateOptions(value);
      }
    )
  }

}

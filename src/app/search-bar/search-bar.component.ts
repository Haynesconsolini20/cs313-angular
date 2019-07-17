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
  }

  updateOptions(results): void {
    this.options = [];
    results.forEach(element => {
      this.options.push(element.query_text);
    });
    this.options = this.options.slice(0,5);
  }
  constructor(private twitterSearchService: TwitterSearchService) { }

  ngOnInit() {
    this.twitterSearchService.queries.subscribe(
      value => {
        if (value !== 1) { this.updateOptions(value.results); }
      },
      error => {
        console.log(error.message);
      }
    )
  }

}

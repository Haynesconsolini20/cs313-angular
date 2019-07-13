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
    this.options = [];
    console.log('updating options');
    console.log(results);
    results.forEach(element => {
      this.options.push(element.query_text);
    });
    console.log('updated options: ');
    console.log(this.options);
  }
  constructor(private twitterSearchService: TwitterSearchService) { }

  ngOnInit() {
    this.twitterSearchService.queries.subscribe(
      value => {
        console.log("*****************RESULTS*****************");
        console.log(value);
        console.log('*****************************************');
        if (value !== 1) { this.updateOptions(value.results); }
      },
      error => {
        console.log(error.message);
      }
    )
  }

}

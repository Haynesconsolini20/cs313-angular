import { Component, OnInit } from '@angular/core';
import { TwitterSearchService } from '../twitter-search.service';

@Component({
  selector: 'app-related-topics',
  templateUrl: './related-topics.component.html',
  styleUrls: ['./related-topics.component.css']
})
export class RelatedTopicsComponent implements OnInit {

  topics: string[];

  updateList(json): void {
    this.topics = [];
    json.forEach(element => {
      this.topics.push(element[0]);
    });
  }

  constructor(private twitterSearchService: TwitterSearchService) { }


  ngOnInit() {
    this.twitterSearchService.topics.subscribe(
      value => {
        if (value !== 1) {
          this.updateList(value);
        }
      },
      error => {
        console.log(error.message);
      }
    );
  }

}

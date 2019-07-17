import { Component, OnInit } from '@angular/core';
import { TwitterSearchService } from '../twitter-search.service';

@Component({
  selector: 'app-sample-tweets',
  templateUrl: './sample-tweets.component.html',
  styleUrls: ['./sample-tweets.component.css']
})
export class SampleTweetsComponent implements OnInit {

  tweets: string[];
  constructor(private twitterSearchService: TwitterSearchService) { }

  updateTweets(response) {
    this.tweets = [];
    response.forEach(element => {
      this.tweets.push(element.text);
    });
  }
  ngOnInit() {
    this.twitterSearchService.tweets.subscribe(
      value => {
        if (value !== 1) {
          this.updateTweets(value);
        }
      },
      error => {
        console.log(error.message);
      }
    );
  }

}

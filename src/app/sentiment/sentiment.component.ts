import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';

import { TwitterSearchService } from '../twitter-search.service';
import * as jStat from '../jstat.min';


@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  scores: [];
  avgScore: number;
  dataPoints: any;
  values: number[];
  chart: CanvasJS.Chart;

  getScores(): void {
    this.twitterSearchService.query('test');
  }

  updateChart(): void {
    let jstat = jStat(this.scores);
    const quartiles = jstat.quartiles();
    const min = jstat.min();
    const max = jstat.max();
    this.values = [min, quartiles[0],quartiles[2],max,quartiles[1]];
    this.chart.options.data[0].dataPoints = [{label: 'Tweets', y: this.values}];
    this.chart.render();
  }
  constructor(private twitterSearchService: TwitterSearchService) { }

  //DATAPOINTS REPRESENTS QUARTILES
  ngOnInit() {
    this.chart = new CanvasJS.Chart('chartContainerSentiment', {
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
        text: 'Sentiment Scores'
      },
      title: {
        text: 'Sentiment Analysis'
      },
      data: [
      {
        type: 'boxAndWhisker',
        color: "black",
		    dataPoints: this.dataPoints
      }
      ]
	  });
    this.chart.render();
    this.twitterSearchService.sentiment.subscribe(
      value => {
        console.log('sentiment updated');
        this.scores = value.scores;
        this.avgScore = value.average;
        this.updateChart();
      },
      error => {
        throw error.message;
      }
    );

    }

}

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

  updatePieChart(): void {
    let dataPoints = [ {y: 0, label: 'Positive'},
                       {y: 0, label: 'Neutral'},
                       {y: 0, label: 'Negative'}];
    let positive = 0;
    let neutral = 0;
    let negative = 0;
    this.scores.forEach(element => {
      if (element > 0) {
        positive += 1;
      }
      else if (element === 0) {
        neutral += 1;
      }
      else {
        negative += 1;
      }
    });
    const total = positive+neutral+negative;
    positive = positive/total;
    neutral = neutral / total;
    negative = negative / total;
    dataPoints[0].y = Number(positive.toFixed(2));
    dataPoints[1].y = Number(neutral.toFixed(2));
    dataPoints[2].y = Number(negative.toFixed(2));
    this.chart.options.data[0].dataPoints = dataPoints;
    console.log(dataPoints);
    this.chart.render();

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
      exportEnabled: false,
      axisY: {
        text: 'Sentiment Scores'
      },
      title: {
        text: 'Sentiment Analysis'
      },
      data: [
      {
        type: 'pie',
        showInLegend: true,
        legendText: '{label} {y}',
        dataPoints: this.dataPoints
      }
      ]

	  });
    this.chart.render();
    this.twitterSearchService.sentiment.subscribe(
      value => {
        if (value != 1) {
          console.log('sentiment updated');
          this.scores = value.scores;
          this.avgScore = value.average;
          this.updatePieChart();
        }
      },
      error => {
        throw error.message;
      }
    );

    }

}

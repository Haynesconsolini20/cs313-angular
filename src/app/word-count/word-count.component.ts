import { Component, OnInit } from '@angular/core';
import { TwitterSearchService } from '../twitter-search.service';
import * as CanvasJS from '../canvasjs.min';

@Component({
  selector: 'app-word-count',
  templateUrl: './word-count.component.html',
  styleUrls: ['./word-count.component.css']
})
export class WordCountComponent implements OnInit {

  words: [string, number][];
  wordData = [];
  requestData: any;
  searchQuery: string;
  chart: CanvasJS.Chart;

  // Recreate chart based on new words data
  updateChart(): void {
// tslint:disable-next-line: forin
    this.wordData = [];
    for(let item of this.words) {
      this.wordData.push({y:item[1], label: item[0]});
    }
    this.chart.options.data[0].dataPoints = this.wordData;
    this.chart.render();
  }


  constructor(private twitterSearchService: TwitterSearchService) { }

  // Get an initial word count and initialize the chart
  ngOnInit() {
    this.chart = new CanvasJS.Chart("chartContainerWord", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Words with highest recurrance"
      },
      data: [{
        type: "column",
        dataPoints: this.wordData
      }]
    });
    this.chart.render();
    this.twitterSearchService.wordCount.subscribe(
      values => {
        console.log('word count updated');
        if(values !== 1) {
          this.words = values;
          this.updateChart();
        }
        console.log(this.words);
      },
      error => {
        console.log(error.message);
      }
    );

  }

}

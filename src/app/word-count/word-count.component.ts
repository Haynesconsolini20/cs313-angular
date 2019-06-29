import { Component, OnInit } from '@angular/core';
import { WordCountService } from '../word-count.service';
import * as CanvasJS from './canvasjs.min';

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


  getWords(): void {
    this.wordCountService.getWords(this.searchQuery).subscribe(
      value => {
        this.words = value;
        this.updateChart();
      },
      error => {
        this.requestData = error.message;
      }
    );
  }
  // Recreate chart based on new words data
  updateChart(): void {
// tslint:disable-next-line: forin
    this.wordData = [];
    for(let item of this.words) {
      this.wordData.push({y:item[1], label: item[0]});
    }
    let chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Frequency of Most Common words'
      },
      data: [{
        type: 'column',
        dataPoints: this.wordData
      }]
    });
    chart.render();
  }


  constructor(private wordCountService: WordCountService) { }

  // Get an initial word count and initialize the chart
  ngOnInit() {

  }

}

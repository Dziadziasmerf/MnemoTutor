import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Result, ResultsService} from '../../services/results/results.service';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatisticsComponent implements OnInit {

  results: Result[];
  multi = [];
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Score';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  disciplines = ['Speed cards', '5 minutes numbers'];
  autoScale = true;

  constructor(private resultsService: ResultsService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.resultsService.getResults(this.authService.getUserLogin()).subscribe(data => {
      this.results = data as Result[];
      this.multi = this.parse(this.results);
    });
  }

  onSelect(event) {
    console.log(event);
  }

  parse(rawResults: Result[]): any[] {
    const results = [];
    for (const discipline of this.disciplines) {
      const disciplineResults = rawResults.filter(result => result.discipline === discipline).map(result => {
        return {
          name: new Date(result.date),
          value: result.score
        };
      });
      results.push({
        name: discipline,
        series: disciplineResults
      });
    }
    return results;
  }
}

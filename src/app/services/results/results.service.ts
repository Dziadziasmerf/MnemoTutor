import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ResultsService {

  private baseUrl = 'http://localhost:8080/results';

  constructor(private http: HttpClient) { }

  public sendResult(result: Result) {
    return this.http.post(this.baseUrl, result);
  }

  public getResults(username: string) {
    return this.http.get(this.baseUrl + '?username=' + username);
  }
}

export class Result {
  username: string;
  score: number;
  time: number;
  date: Date;
  discipline: string;
}

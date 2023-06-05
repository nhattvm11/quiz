import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IQuestion from '../model/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  url = '/assets/questions.json';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.url);
  }
}

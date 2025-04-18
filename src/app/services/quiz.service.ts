import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface QuizCategory {
  id: number;
  name: string;
}

export interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers?: string[]; // Added in QuizComponent
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'https://opentdb.com/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<QuizCategory[]> {
    return this.http
      .get<{ trivia_categories: QuizCategory[] }>(`${this.baseUrl}api_category.php`)
      .pipe(map(response => response.trivia_categories));
  }

  getQuestions(category: number, difficulty: string): Observable<QuizQuestion[]> {
    return this.http
      .get<{ results: QuizQuestion[] }>(
        `${this.baseUrl}api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      )
      .pipe(map(response => response.results));
  }
}
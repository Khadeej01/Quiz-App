
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface QuizCategory {
  id: number;
  name: string;
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
}
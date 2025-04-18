
import { Component, inject, OnInit } from '@angular/core';
import { QuizService, QuizCategory } from '../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf ] // For ngModel in the form
})
export class HomeComponent implements OnInit {
  categories: QuizCategory[] = [];
  selectedCategory: number | null = null;
  selectedDifficulty: string = 'easy';


  // constructor(private quizService: QuizService, private router: Router) {}
  constructor(private router: Router) {}

  quizService = inject(QuizService)

  ngOnInit(): void {
    this.quizService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  startQuiz(): void {
    if (this.selectedCategory) {
      this.router.navigate(['/quiz'], {
        queryParams: {
          category: this.selectedCategory,
          difficulty: this.selectedDifficulty
        }
      });
    } else {
      alert('Please select a category!');
    }
  }
}
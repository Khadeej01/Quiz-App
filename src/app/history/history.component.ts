import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface QuizScore {
  username: string;
  score: number;
  total: number;
  date: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HistoryComponent {
  scores: QuizScore[] = [];

  constructor(private router: Router) {
    this.loadScores();
  }

  loadScores(): void {
    try {
      const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
      this.scores = Array.isArray(scores) ? scores : [];
    } catch (error) {
      console.error('Erreur lors du chargement des scores:', error);
      this.scores = [];
    }
  }

  clearHistory(): void {
    if (confirm('Voulez-vous vraiment supprimer l’historique des scores ?')) {
      localStorage.removeItem('quizScores');
      this.scores = [];
    }
  }

  replay(): void {
    this.router.navigate(['/']);
  }
}
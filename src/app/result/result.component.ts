import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ResultComponent implements OnInit {
  score: number = 0;
  total: number = 0;
  username: string = '';
  saved: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.score = params['score'] ? +params['score'] : 0;
      this.total = params['total'] ? +params['total'] : 0;
    });
  }

  saveScore(): void {
    if (!this.username.trim()) {
      alert('Veuillez entrer un nom d’utilisateur !');
      return;
    }
    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    scores.push({
      username: this.username,
      score: this.score,
      total: this.total,
      date: new Date().toISOString()
    });
    localStorage.setItem('quizScores', JSON.stringify(scores));
    this.saved = true;
  }

  replay(): void {
    this.router.navigate(['/']);
  }

  viewHistory(): void {
    this.router.navigate(['/history']);
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService, QuizQuestion } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class QuizComponent implements OnInit {
  questions: QuizQuestion[] = [];
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer: string | null = null;
  feedback: string | null = null;
  category: number | null = null;
  difficulty: string | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] ? +params['category'] : null;
      this.difficulty = params['difficulty'] || 'easy';
      if (this.category && this.difficulty) {
        this.loadQuestions();
      } else {
        this.navigateToHome();
      }
    });
  }

  loadQuestions(): void {
    this.isLoading = true;
    this.quizService.getQuestions(this.category!, this.difficulty!).subscribe({
      next: (questions) => {
        this.questions = questions.map((q, index) => ({
          ...q,
          id: index + 1,
          all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
        }));
        this.isLoading = false;
        if (this.questions.length === 0) {
          alert('Aucune question disponible. Retour à l’accueil.');
          this.navigateToHome();
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des questions:', err);
        this.isLoading = false;
        alert('Erreur lors du chargement des questions. Retour à l’accueil.');
        this.navigateToHome();
      }
    });
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (!currentQuestion || !currentQuestion.correct_answer) {
      this.feedback = 'Erreur : Question invalide.';
      return;
    }
    if (answer === currentQuestion.correct_answer) {
      this.score++;
      this.feedback = 'Correct !';
    } else {
      this.feedback = `Incorrect ! La bonne réponse était ${currentQuestion.correct_answer}.`;
    }
  }

  nextQuestion(): void {
    this.selectedAnswer = null;
    this.feedback = null;
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.router.navigate(['/result'], {
        queryParams: { score: this.score, total: this.questions.length }
      });
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
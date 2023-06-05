import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import IQuestion from '../model/question.model';
import IOption from '../model/option.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  questions: IQuestion[] = [];
  currentQuestion: number = 0;
  showMsg = false;
  submitted = false;
  correctAnswerCount = 0;
  isLastQuestion = false;
  time = 0;
  timeSubscription: any;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllQuestion();
    this.startQuiz();

  }

  startQuiz() {
    const timer = interval(1000);
    this.timeSubscription = timer.subscribe(res => {
      this.time++;
      console.log(this.time)
    })
  }

  getAllQuestion() {
    return this.questionService.getAll().subscribe((res) => {
      this.questions = res.questions;
      this.questions.forEach((question) => {
        question.options.forEach((option) => {
          option.status = '';
        });
      });
    });
  }

  submitAnswer() {
    if (this.submitted) {
      this.nextQuestion();
      this.submitted = false;
      this.showMsg = false;

      if (this.isLastQuestion) {
        this.saveResult();
        this.timeSubscription.unsubscribe()
        this.router.navigateByUrl('/finish');
        console.log('navigate');
      }
      return;
    }

    const currentOptions = this.questions[this.currentQuestion].options;
    const selectedOption = currentOptions.filter((option) => {
      return option.isSelected;
    });

    if (selectedOption.length === 0) {
      this.showMsg = true;
    } else {
      this.submitted = true;
      this.showResult();
    }
  }

  showResult() {
    const currentOptions = this.questions[this.currentQuestion].options;
    currentOptions.forEach((option) => {
      if (option.isSelected) {
        if (option.correct) {
          option.status = 'green';
          this.correctAnswerCount++;
        } else {
          option.status = 'red';
        }
      } else {
        if (option.correct) {
          option.status = 'green';
        } else {
          option.status = '';
        }
      }
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    if (this.currentQuestion === this.questions.length) {
      this.isLastQuestion = true;
    }
  }

  saveResult() {
    localStorage.setItem('correctAnswerNo', this.correctAnswerCount.toString());
    localStorage.setItem('questionNo', this.questions.length.toString());
    localStorage.setItem('time', this.time.toString())
  }

  select(option: IOption) {
    this.submitted = false;
    this.questions[this.currentQuestion].options.forEach((option) => {
      option.isSelected = false;
    });
    option.isSelected = true;
  }
}

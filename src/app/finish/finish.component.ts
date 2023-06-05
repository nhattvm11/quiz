import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css'],
})
export class FinishComponent implements OnInit {
  correctAnswerNo = Number(localStorage.getItem('correctAnswerNo'));
  questionNo = Number(localStorage.getItem('questionNo'));
  isGood = false;
  time = localStorage.getItem('time');

  ngOnInit(): void {
    this.checkUserResult();
  }

  checkUserResult() {
    if (this.correctAnswerNo > Math.ceil(this.questionNo / 2)) {
      this.isGood = true;
    }
  }
}

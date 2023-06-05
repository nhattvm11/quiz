import { Component, Input } from '@angular/core';
import IOption from '../model/option.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent {
  @Input() option?: IOption;
  @Input() selected = false;
  @Input() submitted = false;
  @Input() border = ''
}

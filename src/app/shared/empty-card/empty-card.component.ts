import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-card',
  templateUrl: './empty-card.component.html',
  styleUrls: ['./empty-card.component.css'],
})
export class EmptyCardComponent {
  @Input()
  message: string = 'Search for an username to see their details here.';
}

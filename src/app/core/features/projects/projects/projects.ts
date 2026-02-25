import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
   @Input() isModal: boolean = false;
}

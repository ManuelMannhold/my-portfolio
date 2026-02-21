import { Component, inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-tech-stack',
  imports: [MatIcon, MatIconModule],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss',
})
export class TechStack {
  private appComponent = inject(AppComponent);

  get expandedTile() {
    return this.appComponent.expandedTile;
  }
}

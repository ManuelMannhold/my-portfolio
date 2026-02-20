import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  imports: [],
  templateUrl: './custom-cursor.html',
  styleUrl: './custom-cursor.scss',
})
export class CustomCursor {
  isActive = false;
  cursorText = '';

  // Diese Funktion wird von außen aufgerufen
  setHoverState(active: boolean, text: string = '') {
    this.isActive = active;
    this.cursorText = text;
  }
}

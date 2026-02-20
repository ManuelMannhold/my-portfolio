import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cursor-wrapper" [class.hovering]="isHovering" [style.left.px]="x" [style.top.px]="y">
      <div class="cursor-dot"></div>
      <div class="cursor-text" *ngIf="isHovering">{{ hoverText }}</div>
    </div>
  `,
  styleUrls: ['./custom-cursor.scss']
})
export class CustomCursorComponent {
  x = 0;
  y = 0;
  hoverText = '';
  isHovering = false;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.x = event.clientX;
    this.y = event.clientY;
  }

  setHoverState(active: boolean, text: string = '') {
    this.isHovering = active;
    this.hoverText = text;
  }
}
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cursor-wrapper" [class.hovering]="isHovering" [style.left.px]="x" [style.top.px]="y">
      <div class="cursor-dot"></div>
      @if (isHovering) {
        <div class="cursor-text">{{ hoverText }}</div>
      }
    </div>
  `,
  styleUrls: ['./custom-cursor.scss']
})
export class CustomCursor {
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

  @HostListener('window:mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('.project-card') || target.closest('.tile') || target.closest('.stack-tile')) {
      this.setHoverState(true, 'DETAILS');
    }    
    else if (target.closest('button') || target.closest('a')) {
      this.setHoverState(true, 'KLICK');
    } else {
      this.setHoverState(false);
    }
  }
}
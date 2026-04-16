import { Component, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-mode-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mode-switcher.html',
  styleUrl: './mode-switcher.scss'
})
export class ModeSwitcher implements AfterViewInit {
  private modeService = inject(ModeService);
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  isAdminMode$ = this.modeService.mode$;
  isAnimating = false;
  switchingToAdmin = false;

  ngAfterViewInit(): void {
    this.drawInitialState();
  }

  switchMode(): void {
    if (this.isAnimating) return;

    const targetMode = this.modeService.isCoderMode() ? 'admin' : 'coder';
    this.switchingToAdmin = targetMode === 'admin';
    this.isAnimating = true;

    this.animatePlugConnection(() => {
      this.modeService.toggleMode();
      this.isAnimating = false;
      setTimeout(() => this.drawInitialState(), 300);
    });
  }

  private drawInitialState(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.modeService.isAdminMode()) {
      this.drawAdminState(ctx);
    } else {
      this.drawCoderState(ctx);
    }
  }

  private drawCoderState(ctx: CanvasRenderingContext2D): void {
    const { width, height } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw unplugged connector
    ctx.fillStyle = '#64b5f6';
    ctx.beginPath();
    ctx.arc(centerX - 20, centerY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw server/device
    ctx.strokeStyle = '#64b5f6';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX + 10, centerY - 15, 25, 30);

    // Draw cable (fully disconnected - floating away)
    ctx.strokeStyle = '#64b5f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 12, centerY);
    ctx.quadraticCurveTo(centerX + 5, centerY - 25, centerX - 5, centerY - 30);
    ctx.stroke();

    // Label
    ctx.fillStyle = '#64b5f6';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DISCONNECTED', centerX + 22, centerY + 25);
  }

  private drawAdminState(ctx: CanvasRenderingContext2D): void {
    const { width, height } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw plugged connector
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.arc(centerX - 20, centerY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw server with power
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX + 10, centerY - 15, 25, 30);

    // Power indicator
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(centerX + 14, centerY - 10, 4, 4);
    ctx.fillRect(centerX + 20, centerY - 10, 4, 4);
    ctx.fillRect(centerX + 26, centerY - 10, 4, 4);

    // Draw cable (firmly connected to server)
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 12, centerY);
    ctx.quadraticCurveTo(centerX - 5, centerY - 8, centerX + 10, centerY - 5);
    ctx.stroke();

    // Label
    ctx.fillStyle = '#4caf50';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('CONNECTED', centerX + 22, centerY + 25);
  }

  private animatePlugConnection(callback: () => void): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const { width, height } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const startX = centerX - 20;
    const startY = centerY;
    const endX = centerX + 10;
    const endY = this.switchingToAdmin ? centerY - 5 : centerY;

    const steps = 20;
    let currentStep = 0;

    const animateFrame = () => {
      currentStep++;
      const progress = currentStep / steps;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static elements
      if (this.switchingToAdmin) {
        // Transition to admin
        ctx.strokeStyle = `rgba(76, 175, 80, ${progress})`;
        ctx.fillStyle = `rgba(76, 175, 80, ${progress})`;
      } else {
        // Transition to coder
        ctx.strokeStyle = `rgba(100, 181, 246, ${1 - progress})`;
        ctx.fillStyle = `rgba(100, 181, 246, ${1 - progress})`;
      }

      // Draw plug
      ctx.fillStyle = this.switchingToAdmin ? `rgba(76, 175, 80, 1)` : `rgba(100, 181, 246, 1)`;
      ctx.beginPath();
      ctx.arc(startX, startY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw moving cable
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      const curveX = startX + (endX - startX) * progress;
      const curveY = startY + (endY - startY) * progress;
      ctx.quadraticCurveTo(
        startX + (endX - startX) / 2,
        startY - 15 + (endY - startY + 15) * progress,
        curveX,
        curveY
      );
      ctx.stroke();

      // Draw server
      ctx.lineWidth = 2;
      ctx.strokeRect(endX, centerY - 15, 25, 30);

      if (currentStep < steps) {
        requestAnimationFrame(animateFrame);
      } else {
        callback();
      }
    };

    animateFrame();
  }
}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, Output, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ModeService } from '../../../services/mode.service';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @Input() isDetailView: boolean = false;
  @Output() backToGrid = new EventEmitter<void>();
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  isDarkMode: boolean = true;
  currentLanguage: string = 'de';
  private translateService = inject(TranslateService);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  english: boolean = true;
  protected modeService = inject(ModeService);
  mode$ = this.modeService.mode$;
  isAnimating = false;

  constructor(private router: Router) {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.english = savedLanguage === 'en';
      this.translateService.use(this.currentLanguage);
    }
  }

  closeModal() {
    this.backToGrid.emit();
  }

  toTop(): void {
    this.router.navigateByUrl('/').then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme(this.isDarkMode);

    this.currentLanguage = this.translateService.currentLang || 'de';
  }

  ngAfterViewInit(): void {
    // Delay to ensure DOM is fully rendered
    setTimeout(() => {
      this.drawInitialState();
    }, 100);
  }

  toggleMode(): void {
    if (this.isAnimating) return;

    const targetMode = this.modeService.isCoderMode() ? 'admin' : 'coder';
    this.isAnimating = true;

    this.animatePlugConnection(targetMode === 'admin', () => {
      this.modeService.toggleMode();
      this.isAnimating = false;
      setTimeout(() => this.drawInitialState(), 300);
    });
  }

  private drawInitialState(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      console.warn('Canvas element not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Could not get 2D context');
      return;
    }

    // Set explicit dimensions
    canvas.width = 44;
    canvas.height = 44;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Don't scale if dimensions are very small
    if (canvas.width > 30 && canvas.height > 30) {
      ctx.save();
      ctx.scale(2, 2);
    }

    if (this.modeService.isAdminMode()) {
      this.drawAdminState(ctx);
    } else {
      this.drawCoderState(ctx);
    }

    if (canvas.width > 30 && canvas.height > 30) {
      ctx.restore();
    }
  }

  private drawCoderState(ctx: CanvasRenderingContext2D): void {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw unplugged connector (left side)
    ctx.fillStyle = '#64b5f6';
    ctx.beginPath();
    ctx.arc(8, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw server/device (right side)
    ctx.strokeStyle = '#64b5f6';
    ctx.lineWidth = 1;
    ctx.strokeRect(26, centerY - 6, 10, 12);

    // Draw cable (disconnected - floating)
    ctx.strokeStyle = '#64b5f6';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(11, centerY);
    ctx.quadraticCurveTo(18, centerY - 10, 20, centerY - 12);
    ctx.stroke();
  }

  private drawAdminState(ctx: CanvasRenderingContext2D): void {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw plugged connector (left side)
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.arc(8, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw server with power (right side)
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 1;
    ctx.strokeRect(26, centerY - 6, 10, 12);

    // Power indicator
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(29, centerY - 4, 1.5, 1.5);
    ctx.fillRect(32, centerY - 4, 1.5, 1.5);

    // Draw cable (connected)
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(11, centerY);
    ctx.quadraticCurveTo(16, centerY - 3, 26, centerY - 3);
    ctx.stroke();
  }

  private animatePlugConnection(switchingToAdmin: boolean, callback: () => void): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.scale(2, 2);

    const width = ctx.canvas.width / 2;
    const height = ctx.canvas.height / 2;
    const centerX = width / 2;
    const centerY = height / 2;
    const startX = centerX - 8;
    const startY = centerY;
    const endX = centerX + 4;
    const endY = switchingToAdmin ? centerY - 2 : centerY;

    const steps = 15;
    let currentStep = 0;

    const animateFrame = () => {
      currentStep++;
      const progress = currentStep / steps;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw plug
      ctx.fillStyle = switchingToAdmin ? `rgba(76, 175, 80, 1)` : `rgba(100, 181, 246, 1)`;
      ctx.beginPath();
      ctx.arc(startX, startY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw moving cable
      ctx.lineWidth = 1;
      ctx.strokeStyle = switchingToAdmin ? `rgba(76, 175, 80, 1)` : `rgba(100, 181, 246, 1)`;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      const curveX = startX + (endX - startX) * progress;
      const curveY = startY + (endY - startY) * progress;
      ctx.quadraticCurveTo(
        startX + (endX - startX) / 2,
        startY - 6 + (endY - startY + 6) * progress,
        curveX,
        curveY
      );
      ctx.stroke();

      // Draw server
      ctx.lineWidth = 1;
      ctx.strokeStyle = switchingToAdmin ? 
        `rgba(76, 175, 80, ${progress})` : 
        `rgba(100, 181, 246, ${1 - progress})`;
      ctx.strokeRect(endX, centerY - 6, 10, 12);

      if (currentStep < steps) {
        requestAnimationFrame(animateFrame);
      } else {
        callback();
      }
    };

    animateFrame();
  }

  isMenuOpen = false;

  openResponsiveMenu() {
    const menu = document.getElementById('responsive-menu');
    menu?.classList.add('open');
  }

  closeResponsiveMenu() {
    const menu = document.getElementById('responsive-menu');
    menu?.classList.remove('open');
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.startWipeAnimation();
  }

  private startWipeAnimation() {
    const wipeDiv = this.renderer.createElement('div');
    this.renderer.addClass(wipeDiv, 'theme-wipe-overlay');
    this.renderer.appendChild(document.body, wipeDiv);

    setTimeout(() => {
      this.renderer.addClass(wipeDiv, 'active');
    }, 10);
    setTimeout(() => {
      this.applyTheme(this.isDarkMode);
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }, 350);
    setTimeout(() => {
      this.renderer.removeChild(document.body, wipeDiv);
    }, 800);
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      this.renderer.removeClass(document.body, 'light-mode');
    } else {
      this.renderer.addClass(document.body, 'light-mode');
    }
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
  }

  setActiveColorForLanguage() {
    if (this.currentLanguage === 'de') {
      document.getElementById('german')?.classList.add('active');
      document.getElementById('english')?.classList.remove('active');
    } else {
      document.getElementById('english')?.classList.add('active');
      document.getElementById('german')?.classList.remove('active');
    }
  }
}


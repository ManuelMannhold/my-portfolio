import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkMode: boolean = true;
  currentLanguage: string = 'de';
  private translateService = inject(TranslateService);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  english: boolean = true;

  constructor(private router: Router) {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.english = savedLanguage === 'en';
      this.translateService.use(this.currentLanguage);
    }
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

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light'); // Speichern
    this.startWipeAnimation();
  }

  private startWipeAnimation() {
    // 1. Erstelle das Overlay-Element
    const wipeDiv = this.renderer.createElement('div');
    this.renderer.addClass(wipeDiv, 'theme-wipe-overlay');
    this.renderer.appendChild(document.body, wipeDiv);

    // 2. Trigger die Animation nach einem winzigen Moment
    setTimeout(() => {
      this.renderer.addClass(wipeDiv, 'active');
    }, 10);

    // 3. In der Mitte der Animation (nach ca. 350ms) wechseln wir das Theme
    setTimeout(() => {
      this.applyTheme(this.isDarkMode);
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }, 350);

    // 4. Wenn die Animation fertig ist, entfernen wir das Element
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
    this.translateService.use(lang); // Deine ngx-translate Logik
  }

  /**
   * Sets the active CSS class for the currently selected language.
   * Adds the 'active' class to the selected language button and removes it from the other.
   */
  setActiveColorForLanguage() {
    if (this.currentLanguage === 'de') {
      document.getElementById('german')?.classList.add('active');
      document.getElementById('english')?.classList.remove('active');
    } else {
      document.getElementById('english')?.classList.add('active');
      document.getElementById('german')?.classList.remove('active');
    }
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


}

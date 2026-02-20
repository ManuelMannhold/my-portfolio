import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentLanguage: string = 'de';
  private translateService = inject(TranslateService);
  english: boolean = true;
  showGoBack = false;

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

  /**
   * Lifecycle hook that is called after Angular has initialized the component.
   * Scrolls the window to the top of the page (coordinates 0, 0).
   */
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.setActiveColorForLanguage();
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

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
   currentLanguage: string = 'en';
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

  @HostListener('window:scroll', [])
onScroll(): void {
  this.showGoBack = window.scrollY > 200;
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


  /**
   * Sets the application language to the specified language code.
   * Updates the translation service and stores the language preference in localStorage.
   *
   * @param {string} languageCode - The language code to set (e.g., 'de' for German, 'en' for English).
   */
  changeLanguage(languageCode: string) {
    this.currentLanguage = languageCode;
    this.translateService.use(this.currentLanguage);
    localStorage.setItem('language', this.currentLanguage);
    this.setActiveColorForLanguage();
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

  /**
   * Sets the application language to English.
   * Updates the translation service to use English ('en') and stores the preference in localStorage.
   */
  openResponsiveMenu() {
    let openMenu: HTMLElement | null =
      document.getElementById('responsive-menu');
    if (openMenu) openMenu.style.transform = 'translate(0)';
  }

  /**
   * Closes the responsive menu by modifying its transform style.
   * Finds the element with the ID 'responsive-menu' and sets its transform property to move it out of view.
   */
  closeResponsiveMenu() {
    let responsMenu = document.getElementById('responsive-menu');
    if (responsMenu) responsMenu.style.transform = 'translate(10000px)';
  }


}

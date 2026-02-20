import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About } from './core/features/about/about/about';
import { Contact } from './core/features/contact/contact/contact';
import { TechStack } from './core/features/tech-stack/tech-stack/tech-stack';
import { Projects } from './core/features/projects/projects/projects';
import { CustomCursorComponent } from './core/components/custom-cursor/custom-cursor/custom-cursor';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LandingPageComponent } from "./core/features/landing-page/landing-page/landing-page.component";
import { HeaderComponent } from './core/shared/header/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    About,
    Contact,
    TechStack,
    Projects,
    CustomCursorComponent,
    TranslateModule,
    LandingPageComponent,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-portfolio';
  private translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
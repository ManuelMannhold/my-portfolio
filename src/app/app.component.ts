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
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatIcon } from '@angular/material/icon';

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
    HeaderComponent,
    MatIcon
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
  trigger('expandAnimation', [
    state('collapsed', style({
      transform: 'scale(1)',
      zIndex: 1
    })),
    state('expanded', style({
      position: 'fixed', // Wir setzen es, aber animieren es nicht
      top: '0',
      left: '0',
      width: '100%',
      height: '100vh',
      margin: '0',
      zIndex: 9999,
      transform: 'scale(1)',
      borderRadius: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    })),
    transition('collapsed => expanded', [
      style({ zIndex: 9999 }), // Sofort nach oben holen
      animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
    ]),
    transition('expanded => collapsed', [
      animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
    ])
  ])
]
})

export class AppComponent {
  title = 'my-portfolio';
  private translate = inject(TranslateService);
  expandedTile: string | null = null;

  constructor() {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }


  toggleTile(tileId: string) {
    this.expandedTile = this.expandedTile === tileId ? null : tileId;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
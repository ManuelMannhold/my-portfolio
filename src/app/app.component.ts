import { Component, inject } from '@angular/core';
import { About } from './core/features/about/about/about';
import { Contact } from './core/features/contact/contact/contact';
import { TechStack } from './core/features/tech-stack/tech-stack/tech-stack';
import { Projects } from './core/features/projects/projects/projects';
import { CustomCursorComponent } from './core/components/custom-cursor/custom-cursor/custom-cursor';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LandingPageComponent } from "./core/features/landing-page/landing-page/landing-page.component";
import { HeaderComponent } from './core/shared/header/header/header.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LegalComponent } from './core/features/legal/legal.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    About,
    Contact,
    TechStack,
    Projects,
    CustomCursorComponent,
    TranslateModule,
    LandingPageComponent,
    HeaderComponent,
    LegalComponent,
    MatIcon,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'my-portfolio';
  private translate = inject(TranslateService);
  private dialog = inject(MatDialog);
  expandedTile: string | null = null;
  TechStack = TechStack;
  About = About;
  Contact = Contact;
  Projects = Projects;
  Legal = LegalComponent;

  constructor() {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  openDetail(component: any) {
    this.dialog.open(component, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      panelClass: 'full-screen-modal',
      data: { activated: true }
    });
  }

  toggleTile(tileId: string) {
    this.expandedTile = this.expandedTile === tileId ? null : tileId;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
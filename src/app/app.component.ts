import { Component, inject, ViewChild } from '@angular/core'; // 1. ViewChild importieren
import { About } from './core/features/about/about/about';
import { Contact } from './core/features/contact/contact/contact';
import { TechStack } from './core/features/tech-stack/tech-stack/tech-stack';
import { CustomCursor } from './core/components/custom-cursor/custom-cursor/custom-cursor'; // 2. CustomCursor importieren
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LandingPageComponent } from "./core/features/landing-page/landing-page/landing-page.component";
import { HeaderComponent } from './core/shared/header/header/header.component';
import { LegalComponent } from './core/features/legal/legal.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Projects } from './core/features/projects/projects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    About,
    Contact,
    TechStack,
    Projects,
    CustomCursor,
    TranslateModule,
    LandingPageComponent,
    HeaderComponent,
    LegalComponent,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private translate = inject(TranslateService);
  private dialog = inject(MatDialog);

  @ViewChild('appCursor') cursorComponent!: CustomCursor;

  isDetailView = false;
  expandedTile: string | null = null;
  activeDialogRef: MatDialogRef<any> | null = null;
  TechStack = TechStack;
  About = About;
  Contact = Contact;
  Projects = Projects;
  Legal = LegalComponent;

  constructor() {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  updateCursorHover(isHovering: boolean, text: string = '') {
    if (this.cursorComponent) {
      this.cursorComponent.setHoverState(isHovering, text);
    }
  }

  openDetail(component: any) {
    this.activeDialogRef = this.dialog.open(component, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      panelClass: ['full-screen-modal', 'dark-theme'],
      data: { isExpanded: true }
    });
    this.isDetailView = true;
    this.activeDialogRef.afterClosed().subscribe(() => {
      this.isDetailView = false;
      const triggerButton = document.querySelector('.stack-tile') as HTMLElement;
      triggerButton?.focus();
    });
  }

  closeModalFromHeader() {  
    if (this.activeDialogRef) {
      this.activeDialogRef.close();
      this.isDetailView = false;
      this.activeDialogRef = null;
    }
  }

  toggleTile(tileId: string) {
    this.expandedTile = this.expandedTile === tileId ? null : tileId;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
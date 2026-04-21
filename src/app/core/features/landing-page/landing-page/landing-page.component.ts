import { Component, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ModeService } from '../../../services/mode.service';
import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [TranslateModule, CommonModule, AsyncPipe],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  protected modeService = inject(ModeService);
  isAdminMode$ = this.modeService.mode$;
  private translate = inject(TranslateService);

  scrollToContact() {
  const contactElement = document.getElementById('contact-anchor');
  if (contactElement) {
    contactElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}

}

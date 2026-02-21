import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-legal',
  imports: [MatIcon, TranslateModule],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss'
})
export class LegalComponent {
  private translateService = inject(TranslateService);
}

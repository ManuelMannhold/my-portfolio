import { Component, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private translateService = inject(TranslateService);

}

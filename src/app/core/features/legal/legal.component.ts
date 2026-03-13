import { Component, Inject, inject, Input, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  @Input() isModal: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isModal = !!data;
  }
}

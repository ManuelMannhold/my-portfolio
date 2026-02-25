import { Component, EventEmitter, Inject, inject, Input, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [TranslateModule, MatIconModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private translateService = inject(TranslateService);
  @Input() isModal: boolean = false;

    @Output() openAsModal = new EventEmitter<void>();

  constructor(
    @Optional() private dialogRef: MatDialogRef<About>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isModal = !!data;
  }

  openModal() {
    if (!this.isModal) {
      this.openAsModal.emit();
    }
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

}

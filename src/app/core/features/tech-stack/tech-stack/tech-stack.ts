import { Component, EventEmitter, inject, Inject, Input, Optional, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [MatIconModule, TranslateModule],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss',
})
export class TechStack {

  @Output() openAsModal = new EventEmitter<void>();
  @Input() isModal: boolean = false;

  constructor(
    @Optional() private dialogRef: MatDialogRef<TechStack> | null,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.isModal = !!data;
  }
}
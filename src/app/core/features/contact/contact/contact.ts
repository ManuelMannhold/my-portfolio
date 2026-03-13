import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, inject, Input, Optional, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslateModule, RouterLink, MatIcon],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  @Input() isModal: boolean = false;
  @ViewChild('nameInput') nameInputField!: ElementRef<HTMLInputElement>;

  private http = inject(HttpClient);
  
  contactData = {
    name: "",
    email: "",
    message: "",
  };

  showCheckbox: boolean = false;
  mailSent: boolean = false;
  mailTest = false;

  private readonly endPoint = 'https://manuel-mannhold.de/sendMail.php';

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isModal = !!data;
  }

  /**
   * Sets the focus to the name input field using the template reference.
   * @returns {void}
   */
  focusNameInput(): void {
    this.nameInputField?.nativeElement.focus();
  }

  /**
   * Toggles the privacy policy checkbox state.
   * @returns {void}
   */
  toggleImage(): void {
    this.showCheckbox = !this.showCheckbox;
  }

  /**
   * Validates the email format using a regular expression.
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if the email format is valid.
   */
  isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  /**
   * Handles the form submission. Sends the contact data to the server if the form is valid
   * and the privacy policy has been accepted.
   * @param {NgForm} ngForm - The Angular template-driven form instance.
   * @returns {void}
   */
  onSubmit(ngForm: NgForm): void {
    if (ngForm.valid && this.showCheckbox && !this.mailTest) {
      this.sendPostRequest(ngForm);
    } else if (ngForm.valid && this.mailTest) {
      this.handleSuccess(ngForm);
    }
  }

  /**
   * Sends the actual POST request to the mail API.
   * @param {NgForm} ngForm - The form instance to reset after success.
   * @private
   */
  private sendPostRequest(ngForm: NgForm): void {
    const body = JSON.stringify(this.contactData);
    const options = { headers: { 'Content-Type': 'text/plain' } };

    this.http.post(this.endPoint, body, options).subscribe({
      next: () => this.handleSuccess(ngForm),
      error: (err) => console.error('Submission error:', err)
    });
  }

  /**
   * Resets the form and displays a temporary success overlay.
   * @param {NgForm} ngForm - The form instance to reset.
   * @private
   */
  private handleSuccess(ngForm: NgForm): void {
    this.showOverlayMessageSend();
    ngForm.resetForm();
    this.showCheckbox = false;
  }

  /**
   * Triggers the success message overlay and hides it after a delay.
   * @returns {void}
   */
  showOverlayMessageSend(): void {
    this.mailSent = true;
    setTimeout(() => {
      this.mailSent = false;
    }, 2000);
  }
}
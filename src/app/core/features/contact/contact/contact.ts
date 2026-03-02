import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, inject, Input, Optional, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TechStack } from '../../tech-stack/tech-stack/tech-stack';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslateModule, RouterLink, MatIcon],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {

   @Output() openAsModal = new EventEmitter<void>();
  @Input() isModal: boolean = false;

  constructor(
    @Optional() private dialogRef: MatDialogRef<TechStack> | null,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.isModal = !!data;
    this.contactMe();
  }

  private translateService = inject(TranslateService);
  http = inject(HttpClient);
  inputName!: HTMLInputElement;

  contactData = {
    name: "",
    email: "",
    message: "",
  }

  mailTest = false;

  post = {
    endPoint: 'https://manuel-mannhold.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  /**
 * Handles the form submission for the contact form.
 * Validates the form and submits the data to the server if all conditions are met.
 * If the form is valid and the email test flag is not set, it sends a POST request with the form data.
 * If the email test flag is set, it simply resets the form.
 * 
 * @param ngForm - The NgForm object representing the form.
 */
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {

      ngForm.resetForm();
    }
  }

  showCheckbox: boolean = false;
  sendMail: boolean = false;

  /**
 * Adds a click event listener to the 'contact-me-focus' element.
 * When clicked, it focuses on the 'input-name' field to improve the user experience 
 * for submitting contact information.
 */
  contactMe() {
    document.getElementById('contact-me-focus')?.addEventListener('click', () => {
      document.getElementById('input-name')?.focus();
    })
  }

  /**
 * Angular lifecycle hook that is called after the component has been initialized.
 * Calls the `addInputEventListeners` method to set up necessary event listeners 
 * for input elements when the component is ready.
 */
  ngOnInit() {
    this.addInputEventListeners();
  }

  /**
 * Toggles the visibility of a checkbox and updates the state of the contact form.
 * 
 * The method checks if all required input elements (name, email, message) are filled out
 * and updates the "send" button's state by adding or removing a class based on the input validity.
 * Additionally, it shows or hides an error message depending on the form state.
 */
  toggleImage() {
    this.showCheckbox = !this.showCheckbox;

    const sendButton = document.getElementById('contact-message-send-button') as HTMLElement | null;
    const inputName = document.getElementById('input-name') as HTMLInputElement;
    const inputMail = document.getElementById('input-mail') as HTMLInputElement;
    const inputMessage = document.getElementById('input-message') as HTMLTextAreaElement;
    const errorMessage = document.getElementById('input-span') as HTMLDivElement;

    if (sendButton && inputName && inputMail && inputMessage) {
      const error = this.ifElseSendButtonAddOrRemoveClass(inputName, inputMail, inputMessage, errorMessage);
      this.checkInput(sendButton, error);
    }
  }

  /**
 * Adds event listeners to the input fields of the contact form.
 * Listens for input changes on the name, email, and message fields and 
 * updates the state of the send button and error message accordingly.
 * 
 * If any of the input fields are invalid, an error message is displayed, 
 * and the send button's state is updated to reflect the form's validity.
 */
  addInputEventListeners() {
    const inputName = document.getElementById('input-name') as HTMLInputElement;
    const inputMail = document.getElementById('input-mail') as HTMLInputElement;
    const inputMessage = document.getElementById('input-message') as HTMLTextAreaElement;
    const sendButton = document.getElementById('contact-message-send-button') as HTMLElement;
    const errorMessage = document.getElementById('input-span') as HTMLDivElement;
    this.showCheckbox = !this.showCheckbox;
    if (inputName && inputMail && inputMessage && sendButton) {
      const handleInputChange = () => {
        const error = this.ifElseSendButtonAddOrRemoveClass(inputName, inputMail, inputMessage, errorMessage);
        if (error) {
          errorMessage?.classList.remove('d-none');
        } else {
          errorMessage?.classList.add('d-none');
        }
        this.checkInput(sendButton, error);
      };
      inputName.addEventListener('input', handleInputChange);
      inputMail.addEventListener('input', handleInputChange);
      inputMessage.addEventListener('input', handleInputChange);
    }
  }

  /**
 * Checks the validity of the form inputs and returns a boolean indicating whether the form is invalid.
 * 
 * The method validates the name, email, and message input fields. It checks if the name or message fields are empty,
 * if the email is valid, and if there is any error message already present.
 * 
 * @param inputName - The input element for the name field.
 * @param inputMail - The input element for the email field.
 * @param inputMessage - The text area element for the message field.
 * @param errorMessage - The div element that displays error messages.
 * 
 * @returns {boolean} - Returns `true` if any input is invalid or if there's an existing error message, otherwise `false`.
 */
  ifElseSendButtonAddOrRemoveClass(
    inputName: HTMLInputElement,
    inputMail: HTMLInputElement,
    inputMessage: HTMLTextAreaElement,
    errorMessage: HTMLDivElement
  ): boolean {
    return (
      inputName.value.trim() === '' ||
      !this.isValidEmail(inputMail.value.trim()) ||
      inputMessage.value.trim() === '' ||
      (errorMessage && errorMessage.innerText.trim() !== '')
    );
  }

  /**
 * Validates if the provided email string matches a standard email format.
 * 
 * This method uses a regular expression to check if the input email string is in the correct format 
 * (e.g., example@domain.com).
 * 
 * @param email - The email string to validate.
 * 
 * @returns {boolean} - Returns `true` if the email matches the valid format, otherwise `false`.
 */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
 * Updates the state of the send button based on the form validity and checkbox status.
 * 
 * This method checks whether the checkbox is unchecked and if there are any form errors. 
 * If both conditions are satisfied, it enables the send button by removing the 'button-disabled' class 
 * and sets the `sendMail` flag to `true`. Otherwise, it disables the button and sets `sendMail` to `false`.
 * 
 * @param sendButton - The HTML element representing the send button.
 * @param error - A boolean indicating whether there is an error in the form inputs.
 */
  checkInput(sendButton: HTMLElement, error: boolean) {
    if (!this.showCheckbox && !error) {
      sendButton.classList.remove('button-disabled');
      this.sendMail = true;
    } else {
      sendButton.classList.add('button-disabled');
      this.sendMail = false;
    }
  }

  /**
 * Displays an overlay message after successfully sending the form.
 * 
 * This method shows a temporary email alert by manipulating the DOM. 
 * If the `sendMail` flag is `true`, it displays the email alert, prevents scrolling, and hides the alert after 2 seconds.
 * It also disables the send button and toggles the checkbox visibility.
 */
  showOverlayMessageSend() {
    const emailAlert = document.getElementById('email-alert');

    this.sendMail == true;
    if (this.sendMail == true) {
      emailAlert?.classList.remove('d-none');
      emailAlert?.classList.add('no-scroll');
      setTimeout(() => {
        emailAlert?.classList.add('d-none');
        emailAlert?.classList.remove('no-scroll');
      }, 2000);
      this.sendMail = false;
      document.getElementById('contact-message-send-button')?.classList.add('button-disabled');
      this.showCheckbox = !this.showCheckbox;
    }
  }
}

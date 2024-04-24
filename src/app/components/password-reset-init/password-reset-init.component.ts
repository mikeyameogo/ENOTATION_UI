import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-reset-init',
  templateUrl: './password-reset-init.component.html',
  styleUrls: ['./password-reset-init.component.css']
})
export class PasswordResetInitComponent implements OnInit {

  isSuccessful = false;
  isSendUpFailed = false;
  dialogErrorMessage!: string;
  message!: Message;
  form: any = {
    emailAddress: null,
  };
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    const emailAddress = this.form.emailAddress;
    // console.log(emailAddress)
    this.authService.resetInit(emailAddress).subscribe(
      data => {
        this.isSendUpFailed = false;
        this.isSuccessful = true;
  },
  err => this.handleError(err));
}
  
handleError(err: HttpErrorResponse) {
  console.error(`Processing Error: ${JSON.stringify(err)}`);
  this.dialogErrorMessage = err.error.message;
}

}

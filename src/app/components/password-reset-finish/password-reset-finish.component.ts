import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['./password-reset-finish.component.css']
})
export class PasswordResetFinishComponent implements OnInit {
  isSuccessful = false;
  isSendUpFailed = false;
  dialogErrorMessage!: string;
  message!: Message;
  form: FormGroup = new FormGroup({});
  password!: string;
  token: any;
  errorMessage = '';
  constructor(private authService: AuthService, private route: ActivatedRoute, private fb: FormBuilder) {
    route.queryParams
      .subscribe((params) => {
        this.token = params['token'];
        // console.log(this.token);
      });
    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit(): void {
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(): void {
   this.password = this.form.value['password'];
  // const keyAndPasswordVM ={
  //    "key":"",
  //    "newPassword":""
  //  }
    this.authService.resetFinish(this.password, this.token).subscribe(
      data => {
        // console.log(data);
        this.isSendUpFailed = false;
        this.isSuccessful = false;
      },
    //   err => this.handleError(err));
      err => {
        this.errorMessage = err.error.message;
        this.isSendUpFailed = true;
      }
    );
  }

  // Errors

handleError(err: HttpErrorResponse) {
  console.error(`Processing Error: ${JSON.stringify(err)}`);
  this.dialogErrorMessage = err.error.message;
}
}
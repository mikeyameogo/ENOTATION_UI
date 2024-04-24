import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { ChangePasswordVo, Fonctionnaire } from 'src/app/models/fonctionnaire';
import { FonctionnaireService } from 'src/app/services/fonctionnaire.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;

  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  isLoggedIn = false;
  message: any;
  dialogErrorMessage: any;
  fonctionnaires : Fonctionnaire[]=[];
  changePasswordVo: ChangePasswordVo = {};
  pwdConfirmation:String='';

  fonctionnaire: Fonctionnaire = {};

  constructor(private tokenStorageService:TokenStorageService,
    private router : Router ,
    private fonctionnaireService: FonctionnaireService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
    // window.location.reload();
  }
 
  onEditCompte() {
    this.clearDialogMessages();
    this.showDialog = true;
  }
  editCompteFonctionnaire() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.fonctionnaireService.changerPassword(this.changePasswordVo).subscribe(response => {
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Compte modifie avec succes' });
      this.tokenStorageService.signOut();
      this.router.navigate(['/login']);
    }, error => this.handleError(error));
  }
 

  // Errors

  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.message;
  }
  // Messages

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }
}

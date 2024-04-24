import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Message, MessageService } from 'primeng/api';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ILoginVM, LoginVM } from 'src/app/shared/model/login-vm';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	rememberMe: boolean = false;
	@ViewChild('dtf') form!: NgForm; 

	isLoggedIn = false;
	isLoginFailed = false;
	errorMessage = '';
	profil:string = "";
	message: any;
	timeoutHandle: any;
	saveSuccess: boolean = false;
	account: ILoginVM = new LoginVM();

	constructor(
		private layoutService: LayoutService,
		private authService: AuthService,
		private tokenStorage: TokenStorageService,

		private router: Router,
		private messageService: MessageService

		) {}

		
	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}
	
	ngOnInit(): void {
	}
  
	ngOnDestroy() {
	  clearTimeout(this.timeoutHandle);
	}

	showMessage(message: Message) {
		this.message = message;
		this.timeoutHandle = setTimeout(() => {
		  this.message = null;
		}, 5000);
	  }
	seConnecter(): void {
		 this.authService
		   .login(this.account)
		   .subscribe( 
			(data) => {
				if(data.body){
					let user = data.body!;
					this.tokenStorage.saveToken(user.idToken);
				    this.tokenStorage.saveUser(user);
				    this.isLoginFailed = false;
				    this.isLoggedIn = true;
			        this.setRoute(user.profil);
					this.saveSuccess = true;
					// this.message = 'Échec de la connexion, nom d\'utilisateur ou mot de passe incorrect';
					
				}

			},
			err => {
				this.errorMessage= 'Matricule ou mot de passe incorrect!!'
				// this.errorMessage = err.error.message;
				this.isLoginFailed = true;
			  }

		   );
	  }
///////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
	  setRoute(profil: string) {
		switch (profil) {
		  case 'ROLE_ADMIN':
			this.router.navigate(['/admin']);
			break;
		  case 'ROLE_AG':
			this.router.navigate(['agent']);
			break;
		  case 'ROLE_DRH':
			this.router.navigate(['drh']);
			break;
		  default:
			this.router.navigate(['superieur']);
			break;
		}
	  }
	

	  /////////////////////////////////////////////////////////////////////////////////////
	  
  
  ///////////////////////////////////////////////////////////////////////////////

}

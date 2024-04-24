import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  profil?:string;
  form: any = {
    username: null,
    password: null,
    rememberMe: null
  };
  constructor(private router: Router, 
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorage.getUser();
      console.error("profil", user);
      this.setRoute(user.profil);
    }
  }

  onSubmit(): void {
    const { username, password, rememberMe } = this.form;
    // console.log("Username",username);
    this.authService.login(username, password,rememberMe).subscribe(
      data => {
        this.tokenStorage.saveToken(data.idToken);
        this.tokenStorage.saveUser(data);
        console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
       this.setRoute(data.profil);
      },
      err => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Échec de la connexion, nom d\'utilisateur ou mot de passe incorrect', life: 4000});
        // this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  setRoute(profil: string) {
    switch (profil) {
      case 'ROLE_ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'ROLE_AG':
        this.router.navigate(['/agent']);
        break;
      case 'ROLE_DRH':
        this.router.navigate(['/drh']);
        break;
      default:
        this.router.navigate(['/superieur']);
        break;
    }
  }

}
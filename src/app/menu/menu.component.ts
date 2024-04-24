import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { RouterPathService } from '../services/router-path.service';
import { TokenStorageService } from '../services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[]=[];
  isLoggedIn = false;
  matricule?: string;
  monespace?: string;

  constructor(private routePathService:RouterPathService,
    private router: Router,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.matricule = user.matricule;
      this.monespace  = 'Mon espace';
    }
  this.items = [
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: ['/'],
      routerLinkActiveOptions: {
        exact: true
      }
    },
    {
      label: 'Fiches de Poste',
      icon: 'pi pi-file',
      routerLink: ['/fiches-poste'],
    }
    ,
    {
      label: 'Activation de Compte',
      icon: 'pi pi-user-plus',
      routerLink: ['/activation-compte'],
    },
    {
      label: 'Manuel utilisateur',
      icon: 'pi pi-book',
      command: () => this.download(),
    }
    // ,
    // {
    //   label: 'Contrats d\'objectif',
    //   icon: 'pi pi-file',
    //   routerLink: ['/activite'],
    // }
    ,
    {
      label: 'A propos',
      icon: 'pi pi-user-plus',
      routerLink: ['/apropos'],
    }
    // ,
    // {
    //   label: 'Connexion',
    //   icon: 'pi pi-sign-in',
    //   routerLink: ['/login'],
    // }
    // ,
    // {
    //   label: 'Connexion',
    //   icon: 'pi pi-sign-in',
    //   routerLink: ['/login'],
    // }
      
  ];
  }

  download(){
    window.open(environment.domaine+'/assets/download/Guide utilisateur eNotation.pdf','_blank');
  }
  moveToAPath(path:String):void{
    this.routePathService.updatePath(path);
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
    // window.location.reload();
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

  espace(){
    this.setRoute(this.tokenStorageService.getUser().profil);
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, MenuItem, Message, MessageService } from 'primeng/api';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { Ministere } from 'src/app/shared/model/ministere';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
@Component({
  selector: 'app-superieur-hierarchique-menu',
  templateUrl: './superieur-hierarchique-menu.component.html',
  styleUrls: ['./superieur-hierarchique-menu.component.scss']
})
export class SuperieurHierarchiqueMenuComponent {

  @ViewChild('dtf') form!: NgForm;
  items: MenuItem[]=[];
  sousItems: MenuItem[]=[];
  private profil?: string;
  isLoggedIn = false;
  showAdminBoard = false;
  display: boolean = false;
  showModeratorBoard = false;
  user:any;
  ministereDetail:any;
  userProfil:any;
  username?: string;
  matricule?: string;
  message: any;
  ministeres: Ministere[]=[];
  ministere:Ministere={};
  // profils:Profil[]=[];

  timeoutHandle: any;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  selection: any;
  dialogErrorMessage: any;
  fonctionnaires : Fonctionnaire[]=[];
  // changePasswordVo: ChangePasswordVo = {};
  fonctionnaire: Fonctionnaire = {};
  showDialogPerso: boolean=false;
  pwdConfirmation:String='';
  
  constructor(private tokenStorageService: TokenStorageService, private router: Router,
    private fonctionnaireService: FonctionnaireService,
    private messageService: MessageService,
    private ministerService: MinistereService,
    // private profilService: ProfilService
    ) { }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
    // window.location.reload();
  }

  ngOnInit(): void {
    // this.loadProfils();
    // this.loadMinisteres();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
       this.user = this.tokenStorageService.getUser();
      this.profil = this.user.profil;

      this.username = this.user.username;


      this.fonctionnaireService.afficherCodeAffiliation().subscribe(
        data => {
          this.fonctionnaire = data;
          this.matricule = this.fonctionnaire.matricule;
          this.userProfil= this.fonctionnaire.profil;
          this.ministereDetail = this.fonctionnaire.ministereInstitution;

          console.log("Me :", this.fonctionnaire)
        },
        err => {
          this.message = err.message;
        }
      );

    }
    
  this.sousItems = [
    {label: 'Mes informations', icon: 'pi pi-user-plus', command: () => this.onEdit()},
    {separator: true},
    {label: 'Changer mot de passe', icon: 'pi-user-edit', command: () => this.onEditCompte()},
    {label: 'Se deconnecter', icon:"pi pi-sign-out", command: () => this.logout()}
];

    this.items = [
      {
          label:'Accueil',
          icon: 'pi pi-home',
          routerLink: ['/superieur']
        //  icon:'pi pi-fw pi-power-off'
      },
      { 
        label: 'Espace taches',
        items: [
          {
            label: 'Mes activités',
            routerLink: ['/superieur/mes-activites'],
          },
          {
            separator: true
          },
          {
            label: 'Mes notes',
            routerLink: ['/superieur/mes-notes'],
          },
          
        ]
      },
    {
      label:'Mes agents',
    //  icon: 'pi pi-users',
      routerLink: ['/superieur/mes-agents']
    //  icon:'pi pi-fw pi-power-off'
  },
  { 
    label: 'Codes',
    routerLink: ['/superieur/mon-code']
    // items: [
    //   {
    //     label: 'Mon code',
    //     routerLink: ['/superieur/mon-code'],
    //   },
    //   {
    //     separator: true
    //   },
    //   {
    //     label: 'Generer code',
    //     routerLink: ['/superieur/code-genere'],
    //   },
      
    // ]
  },
    {
      label:'Changer superieur',
     // icon: 'pi pi-folder-open',
      routerLink: ['/superieur/change-affiliation']
    //  icon:'pi pi-fw pi-power-off'
  },
 
   
  ];
  }
 

  onEditCompte() {
    this.clearDialogMessages();
    this.showDialog = true;
  }
  // editCompteFonctionnaire() {
  //   this.clearDialogMessages();
  //   this.isDialogOpInProgress = true;
  //   this.fonctionnaireService.changerPassword(this.changePasswordVo).subscribe(response => {
  //     this.isDialogOpInProgress = false;
  //     this.showDialog = false;
  //     this.showMessage({ severity: 'success', summary: 'Compte modifie avec succes' });
  //     this.tokenStorageService.signOut();
  //     this.router.navigate(['/login']);
  //   }, error => this.handleError(error));
  // }
 
  // loadMinisteres(event?: LazyLoadEvent) {
  //   this.ministerService.getAll(event).subscribe(response => {
     
  //     this.ministeres = response.ministereInstitutions;
  //   }, error => {
  //    this.message = { severity: 'error', summary: error.error };
  //     console.error(JSON.stringify(error));
  //   });
  // }

  // loadProfils(event?: LazyLoadEvent) {
  //   this.profilService.getAll(event).subscribe(response => {
     
  //     this.profils = response.profils;
  //   }, error => {
  //    this.message = { severity: 'error', summary: error.error };
  //     console.error(JSON.stringify(error));
  //   });
  // }

  onEdit() {
    this.clearDialogMessages();
    this.showDialogPerso = true;
  }

  // edit() {
  //   this.clearDialogMessages();
  //   this.isDialogOpInProgress = true;
  //   this.fonctionnaireService.update(this.fonctionnaire).subscribe(response => {
  //     let index = this.fonctionnaires.findIndex(fonctionnaire => fonctionnaire.id === response.id);
  //     this.fonctionnaires[index] = response;
  //     this.isDialogOpInProgress = false;
  //     this.showDialogPerso = false;
  //     this.messageService.add({ severity: 'success', summary:'Succès', detail: 'Fonctionnaire modifié avec succès' });
  //   }, error => this.handleError(error));
  // }

  isEditing() {
    return !!this.fonctionnaire.id;
  }

  // Errors

  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.title;
    console.error("error",this.dialogErrorMessage)
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

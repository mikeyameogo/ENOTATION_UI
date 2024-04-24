import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, MenuItem, Message, MessageService } from 'primeng/api';
import { ChangePasswordVo, Fonctionnaire } from 'src/app/models/fonctionnaire';
import { MinistereInstitution } from 'src/app/models/ministere-institution';
import { MinistereInstitutionService } from 'src/app/services/ministere-institution.service';
import { Profil } from 'src/app/models/profil';
import { FonctionnaireService } from 'src/app/services/fonctionnaire.service';
import { ProfilService } from 'src/app/services/profil.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-agent-note-menu',
  templateUrl: './agent-note-menu.component.html',
  styleUrls: ['./agent-note-menu.component.css']
})
export class AgentNoteMenuComponent implements OnInit {
 
  items: MenuItem[]=[];
  sousItems: MenuItem[]=[];
  private profil?: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  matricule?: string;
  message: any;
  ministeres: MinistereInstitution[]=[];
  ministere:MinistereInstitution={};
  profils:Profil[]=[];
  pwdConfirmation:String='';
  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  selection: any;
  dialogErrorMessage: any;
  fonctionnaires : Fonctionnaire[]=[];
  changePasswordVo: ChangePasswordVo = {};
  fonctionnaire: Fonctionnaire = {};
  showDialogPerso: boolean=false;


  constructor(private tokenStorageService: TokenStorageService, private router: Router,
    private fonctionnaireService: FonctionnaireService,
    private messageService: MessageService,
    private ministerService: MinistereInstitutionService,
    private profilService: ProfilService ) { }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
    // window.location.reload();
  }

  ngOnInit(): void {
    this.loadMinisteres();
    this.loadProfils();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.profil = user.profil;

      this.username = user.username;

      this.fonctionnaireService.afficherCodeAffiliation().subscribe(
        data => {
          this.fonctionnaire = data;
          this.matricule = this.fonctionnaire.matricule;
        },
        err => {
          this.message = err.message;
        }
      );
    }
  //  this.sousItems = [
  //   { 
  //     label:  this.username,
  //     icon : "pi pi-user",
  //     items: [
  //       {
  //         label: 'Entreprise',
  //         routerLink: ['/entreprise/mon-profil'],
  //         routerLinkActiveOptions: {
  //           exact: true
  //         }
  //       },
  //       {
  //         separator: true
  //       },
  //       {
  //         label: 'Profil',
  //         routerLink: ['/entreprise/mon-profil'],
  //         routerLinkActiveOptions: {
  //           exact: true
  //         } 
  //       },
        
  //     ]
  //   },
  //  ]
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
          routerLink: ['/']
        //  icon:'pi pi-fw pi-power-off'
      },
      {
        label:'Mes activités',
        icon: 'pi pi-list',
        routerLink: ['/agent/activite']
      //  icon:'pi pi-fw pi-power-off'
    },
      {
        label:'Mes notes',
        icon: 'pi pi-pencil',
        routerLink: ['/agent/mes-notes']
      //  icon:'pi pi-fw pi-power-off'
    },
    {
      label:'Changer supeieur',
      icon: 'pi pi-folder-open',
      routerLink: ['/agent/change-affiliation']
    //  icon:'pi pi-fw pi-power-off'
  },
   
  ];
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
 
  loadMinisteres(event?: LazyLoadEvent) {
    this.ministerService.getAll(event).subscribe(response => {
     
      this.ministeres = response.ministereInstitutions;
    }, error => {
     this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadProfils(event?: LazyLoadEvent) {
    this.profilService.getAll(event).subscribe(response => {
     
      this.profils = response.profils;
    }, error => {
     this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  onEdit() {
    this.clearDialogMessages();
    this.showDialogPerso = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.fonctionnaireService.update(this.fonctionnaire).subscribe(response => {
      let index = this.fonctionnaires.findIndex(fonctionnaire => fonctionnaire.id === response.id);
      this.fonctionnaires[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialogPerso = false;
      this.messageService.add({ severity: 'success', summary:'Succès', detail: 'Fonctionnaire modifié avec succès' });
    }, error => this.handleError(error));
  }

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

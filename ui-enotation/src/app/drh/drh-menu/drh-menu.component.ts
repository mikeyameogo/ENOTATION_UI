import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, MenuItem, Message, MessageService } from 'primeng/api';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { Ministere } from 'src/app/shared/model/ministere';
import { ProfilAgent } from 'src/app/shared/model/profil-agent';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-drh-menu',
  templateUrl: './drh-menu.component.html',
  styleUrls: ['./drh-menu.component.scss']
})
export class DrhMenuComponent {

  items: MenuItem[]=[];
  sousItems: MenuItem[]=[];
  private profil?: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  matricule?: string;
  message: any;
  ministeres: Ministere[]=[];
  ministere:Ministere={};
  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  selection: any;
  dialogErrorMessage: any;
  fonctionnaires : Fonctionnaire[]=[];
  // changePasswordVo: ChangePasswordVo = {};
  changePasswordVo = {};
  fonctionnaire: Fonctionnaire = {};
  showDialogPerso: boolean=false;
  profils: ProfilAgent[] =[];
  profilF: ProfilAgent={};
  filteredProfils: ProfilAgent[]=[];
  pwdConfirmation:String='';

  constructor(private tokenStorageService: TokenStorageService, private router: Router,
    private fonctionnaireService: FonctionnaireService,
    private messageService: MessageService,
    private profilService: ProfilAgentService,
    private ministereService: MinistereService) { }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
    // window.location.reload();
  }

  ngOnInit(): void {
    this.loadProfils();
    this.loadMinisteres();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.profil = user.profil;

      this.username = user.username;     
      
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
          routerLink: ['/drh']
        //  icon:'pi pi-fw pi-power-off'
      },
      { 
        label: 'Espace taches',
        items: [
          {
            label: 'Mes activités',
            routerLink: ['/drh/mes-activites'],
          },
          {
            separator: true
          },
          {
            label: 'Mes notes',
            routerLink: ['/drh/mes-notes'],
          },
          
        ]
      },
    
    {
      label:'Mes agents',
     // icon: 'pi pi-users',
      routerLink: ['/drh/mes-agents']
    //  icon:'pi pi-fw pi-power-off'
  },
    {
      label:'Note d\'office',
    //  icon: 'pi pi-folder-open',
      routerLink: ['/drh/note-office']
    //  icon:'pi pi-fw pi-power-off'
  }, 
  { 
    label: 'Codes',
    routerLink: ['/drh/codes'],
    // items: [
    //   {
    //     label: 'Mon code',
    //     routerLink: ['/drh/mon-code'],
    //   },
    //   {
    //     separator: true
    //   },
    //   {
    //     label: 'Generer code',
    //     routerLink: ['/drh/code-genere'],
    //   },
    //   {
    //     separator: true
    //   },
      
    // ]
  },
  {
    label:'Changer supérieur',
    routerLink: ['/drh/change-affiliation']
  //  icon:'pi pi-fw pi-power-off'
  },

{
  label:'Fiches de postes',
 // icon: 'pi pi-list',
  routerLink: ['/drh/fiches-poste']
//  icon:'pi pi-fw pi-power-off'
},
{
  label:'Statistiques',
 // icon: 'pi pi-list',
  routerLink: ['/drh']
//  icon:'pi pi-fw pi-power-off'
},
  ];
  }


  onEditCompte() {
    this.clearDialogMessages();
    this.showDialog = true;
  }
  editCompteFonctionnaire() {
    // this.clearDialogMessages();
    // this.isDialogOpInProgress = true;
    // this.fonctionnaireService.changerPassword(this.changePasswordVo).subscribe(response => {
    //   this.isDialogOpInProgress = false;
    //   this.showDialog = false;
    //   this.showMessage({ severity: 'success', summary: 'Compte modifie avec succes' });
    //   this.tokenStorageService.signOut();
    //   this.router.navigate(['/login']);
    // }, error => this.handleError(error));
  }


  filteredProfil(event:any) {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : ProfilAgent[] = [];
    let query: string = event.query ?? '';
  
    for(let i = 0; i < this.profils.length; i++) {
        const profil: ProfilAgent = this.profils[i];
        // console.log(ministereInstitution.libelle)
        if (profil.libelle?.toLowerCase().indexOf(query.toLowerCase())===0) {
            filtered.push(profil);
        }
    }
    
    this.filteredProfils = filtered;
  }

  loadProfils(){
    let query = "Admin";
    let query1 = "admin";
    this.profilService.findAll().subscribe(response => {
      for (let index = 0; index < response.body!.length; index++) {
        let element = response.body![index];
      if (element.libelle!.toLowerCase().indexOf(query.toLowerCase()) < 0   ||
      element.libelle!.toLowerCase().indexOf(query1.toLowerCase()) < 0 ) {
        this.profils.push(element);
      }
      }
      this.profils  = this.profils;
    });
  }

  loadMinisteres(event?: LazyLoadEvent) {
    this.ministereService.findAll(event).subscribe(response => {
     
      this.ministeres = response.body!;
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
    // this.clearDialogMessages();
    // this.isDialogOpInProgress = true;
    // this.fonctionnaireService.update(this.fonctionnaire).subscribe(response => {
    //   let index = this.fonctionnaires.findIndex(fonctionnaire => fonctionnaire.id === response.id);
    //   this.fonctionnaires[index] = response;
    //   this.isDialogOpInProgress = false;
    //   this.showDialogPerso = false;
    //   this.messageService.add({ severity: 'success', summary:'Succès', detail: 'Fonctionnaire modifié avec succès' });
    // }, error => this.handleError(error));
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

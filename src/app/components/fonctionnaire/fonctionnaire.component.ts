import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Fonctionnaire } from 'src/app/models/fonctionnaire';
import { MinistereInstitution } from 'src/app/models/ministere-institution';
import { ProfilAgent } from 'src/app/models/profil-agent';
import { FonctionnaireService } from 'src/app/services/fonctionnaire.service';
import { MinistereInstitutionService } from 'src/app/services/ministere-institution.service';
import { ProfilAgentService } from 'src/app/services/profil-agent.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fonctionnaire',
  templateUrl: './fonctionnaire.component.html',
  styleUrls: ['./fonctionnaire.component.css']
})
export class FonctionnaireComponent implements OnInit {
  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  fonctionnaires:Fonctionnaire[]=[];
  fonctionnaire: Fonctionnaire = {};
  ministeres: MinistereInstitution[]=[];
  ministere:MinistereInstitution={};
  profils: ProfilAgent[]=[];
  profil:ProfilAgent={};
  selection: any;
  message: any ;
  dialogErrorMessage: any;
  isLoading: boolean = false;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  recordsPerPage = environment.recordsPerPage;
  showDialog = false;
  enableCreate = false;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  constructor(private fonctionnaireService: FonctionnaireService,
    private messageService: MessageService,
    private ministerService: MinistereInstitutionService,
    private profilService:ProfilAgentService) { }

  ngOnInit(): void {
    this.load();
   
    this.loadMinisteres();
    this.loadProfil();
  }



  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.fonctionnaireService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.fonctionnaires = response.fonctionnaires;
      
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });

   
  }


  loadMinisteres(event?: LazyLoadEvent) {
    this.ministerService.getAll(event).subscribe(response => {
      this.ministeres = response.ministereInstitutions;
    }, error => {
     this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadProfil(event?: LazyLoadEvent) {
    this.profilService.getAll(event).subscribe(response => {
     
      this.profils = response.profilAgents;
    }, error => {
     this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
 //Détail
 onInfo(selection:any){
  console.log(selection);
}

onCreate(){

}
  // Edit

  onEdit(fonctionnaire?: Fonctionnaire) {
    if (fonctionnaire) this.selection = fonctionnaire;
    this.clearDialogMessages();
    this.fonctionnaire = Object.assign({}, this.selection);
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.fonctionnaireService.update(this.fonctionnaire).subscribe(response => {
      let index = this.fonctionnaires.findIndex(fonctionnaire => fonctionnaire.id === response.id);
      this.fonctionnaires[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
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
    this.dialogErrorMessage = error.error.message;
  }

  // Messages

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

}

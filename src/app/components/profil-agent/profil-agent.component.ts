import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { ProfilAgent } from 'src/app/models/profil-agent';
import { ProfilAgentService } from 'src/app/services/profil-agent.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil-agent',
  templateUrl: './profil-agent.component.html',
  styleUrls: ['./profil-agent.component.css']
})
export class ProfilAgentComponent implements OnInit {

  @ViewChild('dtf')
  form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  profilAgents: ProfilAgent[] =[];
  selection: any;
  profilAgent: ProfilAgent = {};
  recordsPerPage = environment.recordsPerPage;
  enableCreate = true;
  isLoading: boolean = false;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  showDialog = false;
  
  enableBtnInfo = false;
  enableBtnEdit = true;
  enableBtnDelete = true;

  message: any ;
  dialogErrorMessage: any;

  contextMenuItems: MenuItem[] = [];
  cols: any[] = [];
  filterFields: any[] = [];
  constructor(
    private confirmationService: ConfirmationService,
    private profilAgentService: ProfilAgentService) 
    {
     }

  ngOnInit(): void {

    this.contextMenuItems = [
      { label: 'Editer', icon: 'pi pi-fw pi-pencil', command: () => this.onEdit() },
      { label: 'Supprimer', icon: 'pi pi-fw pi-trash', command: () => this.onDelete() }
    ];
    this.load();
    this.cols = [
      { field: 'libelle', header: 'Libellé' },
      { field: 'province', header: 'Province' },
    ];

    this.filterFields = [
      { name: 'Libellé', code: 'libelle' },
      { name: 'Province', code: 'province' },
    ];
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutHandle);
  }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.profilAgentService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.profilAgents = response.profilAgents;
      // this.totalRecords = response.totalCount;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  save() {
    if (this.profilAgent.id) {
      this.edit();
    } else {
      this.create();
    }
  } 

  // //Creation
  onInfo(selection:any){
    console.log(selection);
  }

  onCreate() {
    this.profilAgent = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;  
    this.profilAgentService.create(this.profilAgent).subscribe(response => {
      if (this.profilAgents.length !== this.recordsPerPage) {
        this.profilAgents.push(response);
        this.profilAgents = this.profilAgents.slice();
        // console.log(response);
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type agent créée avec succès' });
    }, error => this.handleError(error));
  }

  // Edit

  onEdit(profilAgent?: ProfilAgent) {
    if (profilAgent) this.selection = profilAgent;
    this.clearDialogMessages();
    this.profilAgent = Object.assign({}, this.selection);
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.profilAgentService.update(this.profilAgent).subscribe(response => {
      let index = this.profilAgents.findIndex(profilAgent => profilAgent.id === response.id);
      this.profilAgents[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Profil agent modifie avec succes' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.profilAgent.id;
  }

  // Deletion

  onDelete(profilAgent?: ProfilAgent) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer cet profil agent ?',
      acceptLabel:"Oui",
      rejectLabel:"Non",
      accept: () => {
        this.delete(profilAgent);
      }
    });
  }

  delete(profilAgent?: ProfilAgent) {
    if (profilAgent) this.selection = profilAgent;
    this.isOpInProgress = true;
    this.profilAgentService.delete(this.selection.id).subscribe(() => {
      this.profilAgents = this.profilAgents.filter(profilAgent => profilAgent.id !== this.selection.id);
      this.selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Profil agent supprime avec succes' });
    }, error => {
      console.error(JSON.stringify(error));
      this.isOpInProgress = false;
      this.showMessage({ severity: 'error', summary: error.error.message });
    });
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

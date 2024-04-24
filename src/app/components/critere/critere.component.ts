import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message, MessageService } from 'primeng/api';
import { Critere } from 'src/app/models/critere';
import { ProfilAgent } from 'src/app/models/profil-agent';
import { CritereService } from 'src/app/services/critere.service';
import { ProfilAgentService } from 'src/app/services/profil-agent.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-critere',
  templateUrl: './critere.component.html',
  styleUrls: ['./critere.component.css']
})
export class CritereComponent implements OnInit {

  @ViewChild('dtf')
  form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  criteres: Critere[] =[];
  selection: any;
  critere: Critere = {};
  recordsPerPage = environment.recordsPerPage;
  isLoading: boolean = false;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  showDialog = false;

  message: any ;
  dialogErrorMessage: any;

  contextMenuItems: MenuItem[] = [];
  cols: any[] = [];
  filterFields: any[] = [];
  typeAgents: ProfilAgent[]= [];
  typeAgent: ProfilAgent= {};
  enableCreate = true;
  enableBtnInfo = false;
  enableBtnEdit = true;
  enableBtnDelete = true;

  constructor(
    private confirmationService: ConfirmationService,
    private critereService: CritereService,
    private messageService: MessageService,
    private typeAgentService: ProfilAgentService
    ) 
    {
     }

  ngOnInit(): void {

    this.contextMenuItems = [
      { label: 'Editer', icon: 'pi pi-fw pi-pencil', command: () => this.onEdit() },
      { label: 'Supprimer', icon: 'pi pi-fw pi-trash', command: () => this.onDelete() }
    ];
    this.load();
    this.loadTypeAgent();
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
    this.critereService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.criteres = response.criteres;
      //console.log(response)
      // this.totalRecords = response.totalCount;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadTypeAgent(event?: LazyLoadEvent){
    this.isLoading = true;
    this.typeAgentService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.typeAgents = response.profilAgents;
      //console.log(response)
      // this.totalRecords = response.totalCount;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  save() {
    if (this.critere.id) {
      this.edit();
    } else {
      this.create();
    }
  } 
 //Détail
 onInfo(selection:any){
  console.log(selection);
}
  // //Creation

  onCreate() {
    this.critere = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;  
    this.critereService.create(this.critere).subscribe(response => {
      if (this.criteres.length !== this.recordsPerPage) {
        this.criteres.push(response);
        this.criteres = this.criteres.slice();
        // console.log(response);
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.messageService.add({ severity: 'success', summary:'Succès', detail: 'Critère créée avec succès', life: 5000 });
    }, error => this.handleError(error));
  }

  // Edit

  onEdit(critere?: Critere) {
    if (critere) this.selection = critere;
    this.clearDialogMessages();
    this.critere = Object.assign({}, this.selection);
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.critereService.update(this.critere).subscribe(response => {
      let index = this.criteres.findIndex(critere => critere.id === response.id);
      this.criteres[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.messageService.add({ severity: 'success', summary:'Succès', detail: 'Critère modifié avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.critere.id;
  }

  // Deletion

  onDelete(critere?: Critere) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer ce critere ?',
      accept: () => {
        this.delete(critere);
      }
    });
  }

  delete(critere?: Critere) {
    if (critere) this.selection = critere;
    this.isOpInProgress = true;
    this.critereService.delete(this.selection.id).subscribe(() => {
      this.criteres = this.criteres.filter(critere => critere.id !== this.selection.id);
      this.selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.messageService.add({ severity: 'success', summary:'Succès', detail: 'Critère supprimé avec succès', life: 5000 });
    }, error => {
      console.error(JSON.stringify(error));
      this.isOpInProgress = false;
      this.messageService.add({ severity: 'error', summary: error.error.message });
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

}

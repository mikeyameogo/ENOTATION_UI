import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message, MessageService } from 'primeng/api';
import { MinistereInstitution } from 'src/app/models/ministere-institution';
import { MinistereInstitutionService } from 'src/app/services/ministere-institution.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ministere-institution',
  templateUrl: './ministere-institution.component.html',
  styleUrls: ['./ministere-institution.component.css']
})
export class MinistereInstitutionComponent implements OnInit {

  @ViewChild('dtf')
  form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  ministereInstitutions: MinistereInstitution[] =[];
  selection: any;
  ministereInstitution: MinistereInstitution = {};
  recordsPerPage = environment.recordsPerPage;
  
  isLoading: boolean = false;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  showDialog = false;

  enableCreate = true;
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
    private ministereInstitutionService: MinistereInstitutionService,
    private messageService: MessageService
    ) { }

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
    this.ministereInstitutionService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.ministereInstitutions = response.ministereInstitutions;
      console.log(response)
      // this.totalRecords = response.totalCount;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  save() {
    if (this.ministereInstitution.id) {
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
    this.ministereInstitution = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;  
    this.ministereInstitutionService.create(this.ministereInstitution).subscribe(response => {
      if (this.ministereInstitutions.length !== this.recordsPerPage) {
        this.ministereInstitutions.push(response);
        this.ministereInstitutions = this.ministereInstitutions.slice();
        // console.log(response);
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Succès' , detail: 'Ministere ou institution créée avec succès', life: 5000 });
    }, error => this.handleError(error));
  }

  // Edit

  onEdit(ministereInstitution?: MinistereInstitution) {
    if (ministereInstitution) this.selection = ministereInstitution;
    this.clearDialogMessages();
    this.ministereInstitution = Object.assign({}, this.selection);
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.ministereInstitutionService.update(this.ministereInstitution).subscribe(response => {
      let index = this.ministereInstitutions.findIndex(ministereInstitution => ministereInstitution.id === response.id);
      this.ministereInstitutions[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Succès' , detail: 'Ministere ou institution modifié avec succès', life: 5000 });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.ministereInstitution.id;
  }

  // Deletion

  onDelete(ministereInstitution?: MinistereInstitution) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer ce Ministere ou institution ?',
      accept: () => {
        this.delete(ministereInstitution);
      }
    });
  }

  delete(ministereInstitution?: MinistereInstitution) {
    if (ministereInstitution) this.selection = ministereInstitution;
    this.isOpInProgress = true;
    this.ministereInstitutionService.delete(this.selection.id).subscribe(() => {
      this.ministereInstitutions = this.ministereInstitutions.filter(ministereInstitution => ministereInstitution.id !== this.selection.id);
      this.selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.messageService.add({ severity: 'success', summary: 'Succès' , detail: 'Ministere ou institution supprimé avec succès' });
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

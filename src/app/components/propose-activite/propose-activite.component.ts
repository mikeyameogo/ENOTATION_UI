import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { Activite } from 'src/app/models/activite';
import { ActiviteService } from 'src/app/services/activite.service';
import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table/table';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-propose-activite',
  templateUrl: './propose-activite.component.html',
  styleUrls: ['./propose-activite.component.css']
})
export class ProposeActiviteComponent implements OnInit {

  @ViewChild('dtf')
  form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  activites: Activite[] =[];
  selection: any;
  activite: Activite = {};
  recordsPerPage = environment.recordsPerPage;
  enableCreate = true;
  isLoading: boolean = false;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  showDialog = false;
  showDialogUpdate = false;
  message: any ;
  dialogErrorMessage: any;

  enableBtnInfo = false;
  enableBtnEdit = true;
  enableBtnDelete = true;

  contextMenuItems: MenuItem[] = [];
  cols: any[] = [];
  filterFields: any[] = [];
  activityValues: number[] = [0, 100];
  loading: boolean = true;
  val: number = 500;
  isLoggedIn = false;
  matricule!: string;
  matriculeAgent!: string;
  anneeActu! : Date;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router : ActivatedRoute,
    private activiteService: ActiviteService,
    private tokenStorageService: TokenStorageService) 
    {
     }

  ngOnInit(): void {
    this.anneeActu = new Date();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.matriculeAgent = this.router.snapshot.params.matricule;
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    this.matricule = user.matricule;
     
    }

    console.error("matricule", this.matriculeAgent)

    this.contextMenuItems = [
      { label: 'Editer', icon: 'pi pi-fw pi-pencil', command: () => this.onEdit() },
      { label: 'Supprimer', icon: 'pi pi-fw pi-trash', command: () => this.onDelete() }
    ];
    this.load();
    this.cols = [
      { field: 'libelle', header: 'Libellé' },
      { field: 'Taux de realisation', header: 'Taux de realisation' },
    ];

    this.filterFields = [
      { name: 'Libellé', code: 'libelle' },
      { name: 'Taux de realisation', code: 'Taux de realisation' },
    ];
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutHandle);
  }

  load(event?: LazyLoadEvent) {
   
    this.isLoading = true;
    this.activiteService.getAll(this.matriculeAgent,this.anneeActu.getFullYear(),event).subscribe(response => {
      this.isLoading = false;
      this.activites = response.activites;
       console.log(response)
      // this.totalRecords = response.totalCount;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  save() {
    if (this.activite.id) {
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
    this.activite = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;  
    this.activiteService.createPropose(this.activite, this.matriculeAgent).subscribe(response => {
      if (this.activites.length !== this.recordsPerPage) {
        this.activites.push(response);
        this.activites = this.activites.slice();
        // console.log(response);
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Activité créée avec succès', life: 5000 });
    }, error => this.handleError(error));
  }

  // Edit

  onEdit(activite?: Activite) {
    if (activite) this.selection = activite;
    this.clearDialogMessages();
    this.activite = Object.assign({}, this.selection);
    this.showDialogUpdate = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.activiteService.updatePropose(this.activite,this.matriculeAgent).subscribe(response => {
      let index = this.activites.findIndex(activite => activite.id === response.id);
      this.activites[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialogUpdate = false;
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Activité modifiée avec succès', life: 5000 });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.activite.id;
  }

  // Deletion

  onDelete(activite?: Activite) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer cette activité ?',
      accept: () => {
        this.delete(activite);
      }
    });
  }

  delete(activite?: Activite) {
    if (activite) this.selection = activite;
    this.isOpInProgress = true;
    this.activiteService.delete(this.selection.id).subscribe(() => {
      this.activites = this.activites.filter(activite => activite.id !== this.selection.id);
      this.selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Activité supprimée avec succès', life: 5000 });
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

    
    clear(table: Table) {
        table.clear();
    }


}

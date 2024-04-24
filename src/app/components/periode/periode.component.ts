import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message, MessageService } from 'primeng/api';
import { MinistereInstitution } from 'src/app/models/ministere-institution';
import { Periode } from 'src/app/models/periode';
import { MinistereInstitutionService } from 'src/app/services/ministere-institution.service';
import { PeriodeService } from 'src/app/services/periode.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-periode',
  templateUrl: './periode.component.html',
  styleUrls: ['./periode.component.css']
})
export class PeriodeComponent implements OnInit {


  @ViewChild('dtf')
  form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  periodes: Periode[] =[];
  selection: any;
  periode: Periode = {};
  recordsPerPage = environment.recordsPerPage;
  enableCreate = true;
  isLoading: boolean = false;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  showDialog = false;

  message: any ;
  dialogErrorMessage: any;

  contextMenuItems: MenuItem[] = [];
  cols: any[] = [];
  filterFields: any[] = [];
  ministeres: MinistereInstitution[]=[];
  ministere:MinistereInstitution={};

  constructor(private confirmationService: ConfirmationService,
    private periodeService: PeriodeService,
    private ministerService: MinistereInstitutionService,
    private messageService: MessageService,) {}

  ngOnInit(): void {
    this.loadMinisteres();
    this.contextMenuItems = [
      { label: 'Editer', icon: 'pi pi-fw pi-pencil', command: () => this.onEdit() },
      { label: 'Supprimer', icon: 'pi pi-fw pi-trash', command: () => this.onDelete() }
    ];
    // this.load();
    this.cols = [
      { field: 'dateDebut', header: 'Date Debut' },
      { field: 'dateFin', header: 'Date Fin' },
      { field: 'periodType', header: 'Type Periode' },
      { field: 'ministereInstitution', header: 'Ministere' },


    ];

    this.filterFields = [
      { name: 'Type Periode', code: 'periodType' },
    ];

  }

  ngOnDestroy() {
    clearTimeout(this.timeoutHandle);
  }



  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.periodeService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.periodes = response.periodes;
      console.log(response)
      // this.totalRecords = response.totalCount;
    }, error => {
      this.handleError(error);
      this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.message, life: 4000});
      console.error(JSON.stringify(error));
    });
  }

  
  save() {
    console.log("Periode Data :", this.periode);

    if (this.periode.id) {
      this.edit();
    } else {
      this.create();

    }
  } 


  onCreate() {
    this.periode = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
    
  }



  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;  
    this.periodeService.create(this.periode).subscribe(response => {
      if (this.periodes.length !== this.recordsPerPage) {
        this.periodes.push(response);
        this.periodes = this.periodes.slice();
        // console.log(response);
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      // this.showMessage({ severity: 'success', summary: 'Periode créée avec succès' });
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Periode créée avec succès !', life: 3000});
    }, error => {
      this.handleError(error);
      this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.message, life: 4000});
    } );
  }



  onEdit(periode?: Periode) {
    if (periode) this.selection = periode;
    this.clearDialogMessages();
    this.periode = Object.assign({}, this.selection);
    this.showDialog = true;
  }

  loadMinisteres(event?: LazyLoadEvent) {
    this.ministerService.getAll(event).subscribe(response => {
     
      this.ministeres = response.ministereInstitutions;
    }, error => {
     this.message = { severity: 'error', summary: error.error.message };
      console.error(JSON.stringify(error));
    });
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.periodeService.update(this.periode).subscribe(response => {
      let index = this.periodes.findIndex(periode => periode.id === response.id);
      this.periodes[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      // this.showMessage({ severity: 'success', summary: 'Periode modifie avec succes' });
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Periode modifie avec succes !', life: 3000});
    }, error => {
      this.handleError(error);
      this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.message, life: 4000});
    } );
  }



  isEditing() {
    return !!this.periode.id;
  }

  onDelete(periode?: Periode) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer cet profil ?',
      accept: () => {
        this.delete(periode);
      }
    });
  }

  delete(periode?: Periode) {
    if (periode) this.selection = periode;
    this.isOpInProgress = true;
    this.periodeService.delete(this.selection.id).subscribe(() => {
      this.periodes = this.periodes.filter(periode => periode.id !== this.selection.id);
      this.selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      // this.showMessage({ severity: 'success', summary: 'Periode supprime avec succes' });
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Periode supprime avec succes !', life: 3000});
    }, error => {
      console.error(JSON.stringify(error));
      this.isOpInProgress = false;
      // this.showMessage({ severity: 'error', summary: error.error.message });
      this.messageService.add({severity:'success', summary: 'Succès', detail: error.error.message, life: 3000});
    });
  }


  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.message;
  }
  
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

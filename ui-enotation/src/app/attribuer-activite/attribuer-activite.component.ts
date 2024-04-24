import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Activite, IActivite } from 'src/app/shared/model/activite';
import { ActiviteService } from 'src/app/shared/service/activite.service';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../shared/service/token-storage.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-attribuer-activite',
  templateUrl: './attribuer-activite.component.html',
  styleUrls: ['./attribuer-activite.component.scss']
})
export class AttribuerActiviteComponent {
  
  @ViewChild('dtf')
  form!: NgForm;
  routeData: Subscription | undefined;
  activiteListSubscription: Subscription | undefined;
  activites: IActivite[] = [];
  activite: IActivite = new Activite();
  timeoutHandle: any;
  totalRecords: number = 0;
  recordsPerPage = environment.recordsPerPage;
  enableBtnInfo = false;
  enableBtnEdit = true;
  enableBtnDelete=true;
  enableCreate = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  regionDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  predicate!: string;
  ascending!: boolean;
  reverse: any;
  filtreLibelle: string | undefined;
  matricule!: string;
  anneeActu! : Date;
  isLoggedIn = false;
  matriculeAgent!: string;
  showDialogUpdate = false;
  messageService: any;
  selection: any;

  constructor(
    private activiteService: ActiviteService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private router: Router,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    //private messageService: MessageService,
  ){}


  ngOnInit(): void { 
    this.anneeActu =new Date();
    this.matriculeAgent = this.activatedRoute.snapshot.params['matricule'];
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.matricule = user.matricule;
    }

    this.loadAll();

    this.contextMenuItems = [
      { label: 'Editer', icon: 'pi pi-fw pi-pencil', command: () => this.onEdit() },
      { label: 'Supprimer', icon: 'pi pi-fw pi-trash', command: () => this.onDelete() }
    ];
    
    this.cols = [
      { field: 'libelle', header: 'Libellé' },
      { field: 'Taux de realisation', header: 'Taux de realisation' },
    ];

    this.filterFields = [
      { name: 'Libellé', code: 'libelle' },
      { name: 'Taux de realisation', code: 'Taux de realisation' },
    ];
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutHandle);
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

  filtrer(): void {
    this.loadAll();
  }

  resetFilter(): void {
    this.filtreLibelle = undefined;
    this.filtrer();
  }

  loadPage(event:any): void {
    if(event){
      this.page = event.first/event.rows + 1; 
      this.recordsPerPage = event.rows;
    }
    this.transition();
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      },
    });
    this.loadAll();
  }

  loadAll(event?: LazyLoadEvent) {
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
  
    
  sortMethod(): string[] {
    this.predicate = 'id';
    this.reverse = true;
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    return result;
  }

  buildReq(): any {
    let req = {
      page: this.page -1,
      size: this.recordsPerPage,
      sort: this.sortMethod(),
    };
    let obj : any;
    if (this.filtreLibelle) {
      obj = {};
      obj['libelle.contains'] = this.filtreLibelle;
      req = Object.assign({}, req, obj);
    }
    return req;
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
  
  // Suppression
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
    this.dialogErrorMessage = error.error.title;
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

  contextMenuItems: MenuItem[] = [];
  cols: any[] = [];
  filterFields: any[] = [];
  activityValues: number[] = [0, 100];
  loading: boolean = true;
  val: number = 500;

  clear(): void {
    this.dialogRef.close();
    this.dialogRef.destroy();
  }

}

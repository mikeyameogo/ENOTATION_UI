import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message, MessageService } from 'primeng/api';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

 
  @ViewChild('dtf')
  form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  categories: Categorie[] =[];
  selection: any;
  categorie: Categorie = {};
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
    private categorieService: CategorieService,
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
    this.categorieService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.categories = response.categories;
      // this.totalRecords = response.totalCount;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  save() {
    if (this.categorie.id) {
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
    this.categorie = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;  
    this.categorieService.create(this.categorie).subscribe(response => {
      if (this.categories.length !== this.recordsPerPage) {
        this.categories.push(response);
        this.categories = this.categories.slice();
        // console.log(response);
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie créée avec succès' });
    }, error => this.handleError(error));
  }

  // Edit

  onEdit(categorie?: Categorie) {
    if (categorie) this.selection = categorie;
    this.clearDialogMessages();
    this.categorie = Object.assign({}, this.selection);
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.categorieService.update(this.categorie).subscribe(response => {
      let index = this.categories.findIndex(critere => critere.id === response.id);
      this.categories[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie modifiée avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.categorie.id;
  }

  // Deletion

  onDelete(categorie?: Categorie) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer cette catégorie ?',
      accept: () => {
        this.delete(categorie);
      }
    });
  }

  delete(categorie?: Categorie) {
    if (categorie) this.selection = categorie;
    this.isOpInProgress = true;
    this.categorieService.delete(this.selection.id).subscribe(() => {
      this.categories = this.categories.filter(categorie => categorie.id !== this.selection.id);
      this.selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie supprimée avec succès' });
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

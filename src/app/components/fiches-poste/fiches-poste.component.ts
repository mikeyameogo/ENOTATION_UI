import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FichesPosteService } from 'src/app/services/fiches-poste.service';
import { FichesPoste } from 'src/app/models/fiches-poste';
import { NgForm } from '@angular/forms';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver'; 
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-fiches-poste',
  templateUrl: './fiches-poste.component.html',
  styleUrls: ['./fiches-poste.component.css'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  providers: [MessageService, ConfirmationService]
})
export class FichesPosteComponent implements OnInit {

  @ViewChild('dtf')
  form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  fichesPostes: FichesPoste[] = [];
  categories: Categorie[] = [];
  selection: any;
  fichesPoste: FichesPoste = {};
  recordsPerPage = environment.recordsPerPage;
  enableCreate = true;
  isLoading: boolean = false;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  showDialog = false;
  file: Blob | string = '';

  isSaving = false;
  fichesPosteDialog!: boolean;
  submitted!: boolean;

  message: any;
  dialogErrorMessage: any;

  contextMenuItems: MenuItem[] = [];
  cols: any[] = [];
  // filterFields: any[] = [];

  private profil?: string;
  isLoggedIn = false;
  isDrh!: boolean;

  filteredCategorieI: Categorie[]=[];

  constructor(
    private categorieService: CategorieService,
    private fichesPosteService: FichesPosteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.profil = user.profil;
      if(this.profil === 'ROLE_DRH'){this.isDrh = true}
    }

    this.loadCategorie();

    // this.fichesPosteService.getFichesPostes().then(data => this.fichesPostes = data);

    this.load();

    this.contextMenuItems = [
      { label: 'Editer', icon: 'pi pi-fw pi-pencil', command: () => this.onEdit() },
      { label: 'Supprimer', icon: 'pi pi-fw pi-trash', command: () => this.onDelete() }
    ];

    // this.filterFields = [
    //   { name: 'Libellé', code: 'libelle' },
    //   { name: 'Province', code: 'province' },
    // ];

  }

  ngOnDestroy() {
    clearTimeout(this.timeoutHandle);
  }


  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.fichesPosteService.getFichesPostes(event).subscribe(response => {
      this.isLoading = false;
      this.fichesPostes = response.fichesPostes;
      console.log("URL",this.fichesPostes)
      // this.totalRecords = response.totalCount;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  save() {
    if (this.fichesPoste.id) {
      this.edit();
    } else {
      this.create();
    }
  }

 loadCategorie() {
  this.categorieService.getAll().subscribe(response => {
    this.categories = response.categories;
  });
 }

  onCreate() {
    this.fichesPoste = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    const formData: FormData = new FormData();
    const fichesPosteAsJson: Blob = new Blob([JSON.stringify(this.fichesPoste)], { type: 'application/json' });
    formData.append('fichePoste', fichesPosteAsJson);
    formData.append('multipartFile', this.file);
    this.fichesPosteService.create(formData).subscribe(response => {
      if (this.fichesPostes.length !== this.recordsPerPage) {
        this.fichesPostes.push(response);
        this.fichesPostes = this.fichesPostes.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Fiche de poste créée avec succès' });
    }, error => this.handleError(error));

  }



  onEdit(fichesPoste?: FichesPoste) {
    if (fichesPoste) this.selection = fichesPoste;
    this.clearDialogMessages();
    this.fichesPoste = Object.assign({}, this.selection);
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.fichesPosteService.update(this.fichesPoste).subscribe(response => {
      if (this.fichesPostes.length !== this.recordsPerPage) {
        this.fichesPostes.push(response);
        this.fichesPostes = this.fichesPostes.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Fiche de poste modifiée avec succès' });
    }, error => this.handleError(error));
  }

    onDownload(fichesPoste?: FichesPoste){
      if (fichesPoste) this.selection = fichesPoste;
      this.fichesPoste = Object.assign({}, this.selection);
      // this.showDialog = true;
      this.downloadFiche(this.fichesPoste);
    }

    downloadFiche(fichesPoste?: FichesPoste){
      this.fichesPosteService.downloadFile(fichesPoste?.url!).subscribe(
        blob => saveAs(blob, fichesPoste?.libelle)
      );
    }



  onDelete(fichesPoste?: FichesPoste) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer cette fiche de poste ?',
      accept: () => {
        this.delete(fichesPoste);
      }
    });
  }

  delete(fichesPoste?: FichesPoste) {
    if (fichesPoste) this.selection = fichesPoste;
    this.isOpInProgress = true;
    this.fichesPosteService.delete(this.selection.id).subscribe(() => {
      this.fichesPostes = this.fichesPostes.filter(fichesPoste => fichesPoste.id !== this.selection.id);
      this.selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Fiche de poste supprimée avec succès' });
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


  openNew() {
    this.fichesPoste = {};
    this.submitted = false;
    this.showDialog = true;
  }

  hideFicheDialog() {
    this.fichesPosteDialog = false;
    this.submitted = false;
  }

  onSelectFile(event: any): void {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  isEditing(){

    return !!this.fichesPoste.id;
  }

  filteredCategorie(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : Categorie[] = [];
    let query: string = event.query ?? '';

    for(let i = 0; i < this.categories.length; i++) {
        const categorie: Categorie = this.categories[i];
        // console.log(categorie.libelle)
        if (categorie.libelle?.toLowerCase().indexOf(query.toLowerCase())===0) {
            filtered.push(categorie);
        }
    }
 
    this.filteredCategorieI = filtered;
  }


  saveFichePoste() {
    this.submitted = true;
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;

    if(this.categories.length == 0 || this.categories.length == null){
      this.messageService.add(
        {
          severity: 'error',
          summary: 'Echec',
          detail: 'Aucune catégorie n\'a été créée. Vous devez d\'abord créér au moins une catégorie.',
          life: 5000 
        }
        );
    } else {
      if(this.fichesPoste.categorie?.libelle == null){
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Echec',
            detail: 'Veuillez sélectionner une catégorie !',
            life: 5000 
          }
          );
      } else {
        if (this.fichesPoste.id) {
           this.fichesPosteService.update(this.fichesPoste).subscribe(response => {
            if (this.fichesPostes.length !== this.recordsPerPage) {
              this.fichesPostes.push(response);
              this.fichesPostes = this.fichesPostes.slice();
            }
            this.fichesPostes[this.findIndexById(this.fichesPoste.id)] = this.fichesPoste;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Fiche de poste modifiée avec succès', life: 3000});
          }, error => this.handleError(error));
        }               
        else {
          const formData: FormData = new FormData();
          const fichesPosteAsJson: Blob = new Blob([JSON.stringify(this.fichesPoste)], { type: 'application/json' });
          formData.append('fichePoste', fichesPosteAsJson);
          formData.append('multipartFile', this.file);
          this.fichesPosteService.create(formData).subscribe(response => {
            if (this.fichesPostes.length !== this.recordsPerPage) {
              this.fichesPostes.push(response);
              this.fichesPostes = this.fichesPostes.slice();
            }
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Fiche de poste créée avec succès', life: 3000});
            }, error => this.handleError(error));
          }
        this.fichesPostes = [...this.fichesPostes];
        this.showDialog = false;
        this.fichesPoste = {};
  }
    }
     
}

findIndexById(id: any): number {
  let index = -1;
  for (let i = 0; i < this.fichesPostes.length; i++) {
      if (this.fichesPostes[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

createId(): number {
  let id: any;
  for ( var i = 0; i < 5; i++ ) {
      id = Math.floor(Math.random());
  }
  return id;
}

}

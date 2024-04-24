import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Critere, ICritere } from '../shared/model/critere';
import { FoncNote, Fonctionnaire, IFoncNote, IFonctionnaire } from '../shared/model/fonctionnaire';
import { Note, NoteSuperieur } from '../shared/model/note';
import { CritereService } from '../shared/service/critere.service';
import { FonctionnaireService } from '../shared/service/fonctionnaire.service';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from '../shared/constants/pagination.constants';
import { DetailAgentComponent } from './detail-agent/detail-agent.component';
import { DialogService } from 'primeng/dynamicdialog';
import { NoteService } from '../shared/service/note.service';

@Component({
  selector: 'app-mes-agents',
  templateUrl: './mes-agents.component.html',
  styleUrls: ['./mes-agents.component.scss']
})
export class MesAgentsComponent {

  @ViewChild('dtf')
  form!: NgForm;
  fonctionnaires: Fonctionnaire[] = [];
  listcriteres: ICritere[] = [];
  fonctionnaire: Fonctionnaire = {};
  notes: NoteSuperieur[] = [];
  enableCreate:boolean=false;
  enableBtnNoter:boolean=true;
  enableBtnAttribuer:boolean=true;
  enableBtnRejeter:boolean=true;
  recordsPerPage = environment.recordsPerPage;
  totalRecords!: number;
  selection: any;
  critere: Critere = {};
  template: any = [];
  showDialog = false;
  dynamicForm!: FormGroup;
  myFormGroup: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  timeoutHandle: any;
  message: any;
  dialogErrorMessage: any;
  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  //itemsPerPage = ITEMS_PER_PAGE2;
  predicate!: string;
  ascending!: boolean;
  reverse: any;
  filtreLibelle: string | undefined;
  showDialogAgent: boolean = false;
  noteRejetee: boolean = false;
  anneeCourante: Date = new Date();
  noteC : any = {};
  // noteT = Array<{f:Fonctionnaire, n: Note}> ;
  // noteT: any[] = [Array<{f:Fonctionnaire, n: Note}>] ;
  // foncNote: IFoncNote = new FoncNote();
  foncNotes: IFoncNote[] = [];
  noteAvecCriteres: Note = {};
  noteActivite!: number;
  
  constructor(
    private fonctionnaireService: FonctionnaireService,
    private critereService: CritereService, 
    private noteService: NoteService, 
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.dynamicForm = this.fb.group({
      observation: [''],
      pointDivergeance: [''],
      contraintesRealisation: [''],
      annee: [new Date().getFullYear()],
      okSuperieur: [true],
      okAgent: [false],
      idFonctionnaire: [''],
      criteres: new FormArray([]),
    });

    this.load();
    // this.loadCritere(this.fonctionnaire.matricule!);
  }

  filtrer(): void {
    this.load();
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

  viewActivite(matricule:string) {
   this.router.navigate(['/superieur/proposer/'+matricule])
   console.log("================= : ",matricule);
  }


  // load() {
  //   this.fonctionnaireService.getAllAgent().subscribe(response => {
  //     // this.fonctionnaireService.query().subscribe(response => {
  //     this.fonctionnaires = response.body!;
  //     console.log("========",response);
  //   }, error => {
  //     console.error(JSON.stringify(error));
  //   });
  // }


  load(): void {
    const req = this.buildReq();
    this.fonctionnaireService.getAllAgent(req).subscribe(result => {
      if (result && result.body) {
        this.totalRecords = Number(result.headers.get('X-Total-Count'));
        this.fonctionnaires = result.body || [];
        console.log("==================== fonctionnaires ", this.fonctionnaires);

        // this.fonctionnaires.forEach(fonctionnaire => {
        //   this.noteService.getNoteCourante(fonctionnaire.id!).subscribe(response => {
        //     this.noteC = response;
        //     console.log("====================Responseeeee ", response);
        //     if(this.noteC == undefined) {
        //       this.noteC = null;
        //       console.log("====================note c null ", this.noteC);
        //     }
        //     let foncNote: IFoncNote = new FoncNote();
        //     foncNote.fonctionnaire = fonctionnaire;
        //     foncNote.note = this.noteC;
        //     console.log("====================note c", this.noteC);
        //     this.foncNotes.push(foncNote);
        //     console.log("====================1", this.foncNotes);
        //   }, error => {
        //       this.message = {severity: 'error', summary: error.error};
        //       console.error(JSON.stringify(error));
        //   });
        // });
      }
    });
  }

  // // Edit
  onEdit(fonctionnaire?: Fonctionnaire) {
    if (fonctionnaire) {
      this.selection = fonctionnaire;
      console.log("Hereeeeeeeeeeee", fonctionnaire.profil?.id);
      this.loadCritere(fonctionnaire.profil?.id!);
    }

    this.dynamicForm.patchValue({
      idFonctionnaire: this.selection.id,
    });
    console.log("dynamicForm value", this.dynamicForm.value);

    this.clearDialogMessages();
    this.fonctionnaire = Object.assign({}, this.selection);
    this.showDialog = true;
  }

  loadCritere(idFonc: number, event?: LazyLoadEvent) {
    // this.isLoading = true;
    this.t.clear();
    this.critereService.queryForNote(idFonc, event).subscribe(response => {
      // this.isLoading = false;
      this.listcriteres = response.body!;
      if(this.listcriteres.length>0){
        for(let i=0;i<this.listcriteres.length;i++){
          this.t.push(this.fb.group({
            id: this.listcriteres[i].id,
            note: ['', [Validators.required]]
          }))
        }
      }
      console.log("I have :",this.listcriteres);
    }, error => {
      console.error(JSON.stringify(error));
    });

  }

  save() {
    console.log("Mon Formulaire :", this.dynamicForm.value);
    if (this.idFonctionnaire) {
      this.create();
    } else {
      console.log("Veuillez selectionner un agent a noté !! ");
    }
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      },
    });
    this.load();
  }

  onSubmit() {
    let noteData: any[] = [];
    console.log(this.myFormGroup.value);
    for (let i in this.dynamicForm.value.criteres) {
      noteData.push(this.dynamicForm.value.criteres[i].noteData)


    }
    console.log("Bonjour: ", noteData)
  }

  onAttribuer(selection:any){
    console.log(selection);
  }

  onCreate() {
    this.fonctionnaire = {};
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;

    this.noteService.createNoteSuperieur(this.dynamicForm.value).subscribe(response => {
      if (this.notes.length !== this.recordsPerPage) {
        this.notes.push(response);
        this.notes = this.notes.slice();
        console.log("Hello Word: ", response);
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'La note a été attribuée avec succès !', life: 3000});
      // this.showMessage({ severity: 'success', summary: 'Note créée avec succès' });
    }, error => {
      this.handleError(error);
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Cet agent possède déjà une note : impossible de lui attribuer une autre note !', life: 4000});

    } );

  }

  onRejeter(fonctionnaire?: Fonctionnaire) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir retirer cet agent de votre liste ?',
      acceptLabel:"Oui",
      rejectLabel:"Non",
      accept: () => {
        this.rejeter(fonctionnaire);
      }
    });
  }

  rejeter(fonctionnaire?: Fonctionnaire){
    this.isOpInProgress = true;
    let matricule = fonctionnaire!.matricule;
    this.fonctionnaireService.rejeterFonctionnaire(fonctionnaire!,matricule!).subscribe(() => {
      this.load();
      this.isOpInProgress = false;
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Agent rejeter avec succès', life: 5000 });
    }, error => {
      console.error(JSON.stringify(error));
      this.isOpInProgress = false;
      this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Le rejet a échoué', life: 5000 });
    });
  }

  

  edit() {
    // this.clearDialogMessages();
    // this.isDialogOpInProgress = true;
    // this.fonctionnaireService.update(this.fonctionnaire).subscribe(response => {
    //   let index = this.notes.findIndex(note => note.id === response.id);
    //   this.fonctionnaires[index] = response;
    //   this.isDialogOpInProgress = false;
    //   this.showDialog = false;
    //   this.showMessage({ severity: 'success', summary: 'MinistereInstitution agent modifié avec succes' });
    // }, error => this.handleError(error));
  }

  // Errors
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

  /** Permet d'afficher un modal pour voir les détails */
  openModalDetail(fonctionnaire:IFonctionnaire): void {
    this.dialogService.open(DetailAgentComponent,
      {
        header: 'Details de categorie',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: fonctionnaire
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

  //test 

  get idFonctionnaire() { return this.dynamicForm.get('idFonctionnaire'); }
  get f() { return this.dynamicForm.controls; }
  // get t() { return this.f.criteres as FormArray; }
  get t() { return this.f['criteres'] as FormArray; }
  get critereGroup() { 
    return this.t.controls as FormGroup[]; 
  }
}

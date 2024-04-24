import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, NgForm } from '@angular/forms';
import { Critere } from 'src/app/models/critere';
import { Fonctionnaire } from 'src/app/models/fonctionnaire';
import { CritereService } from 'src/app/services/critere.service';
import { FonctionnaireService } from 'src/app/services/fonctionnaire.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message, MessageService } from 'primeng/api';
import { NotesService } from 'src/app/services/notes.service';
import { Note, NoteSuperieur } from 'src/app/models/note';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mes-agents',
  templateUrl: './mes-agents.component.html',
  styleUrls: ['./mes-agents.component.css'],
  providers: [MessageService]
})
export class MesAgentsComponent implements OnInit {



  @ViewChild('dtf')
  form!: NgForm;
  fonctionnaires: Fonctionnaire[] = [];
  listcriteres: Critere[] = [];
  fonctionnaire: Fonctionnaire = {};
  notes: NoteSuperieur[] = [];
  enableCreate:boolean=false;
  enableBtnEdit: boolean=true;
  enableBtnInfo:boolean=true;
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

  enableBtnDelete = true;


  constructor(
    private fonctionnaireService: FonctionnaireService,
    private critereService: CritereService, 
    private noteService: NotesService, 
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
    this.loadCritere();

  }

  viewActivite(matricule:string) {
   this.router.navigate(['/superieur/proposer/'+matricule])
  }


  load() {
    this.fonctionnaireService.getAllAgent().subscribe(response => {
      this.fonctionnaires = response.fonctionnaires;
      console.log(response)
    }, error => {
      console.error(JSON.stringify(error));
    });
  }

  loadCritere(event?: LazyLoadEvent) {
    // this.isLoading = true;
    this.critereService.getAll(event).subscribe(response => {
      // this.isLoading = false;
      this.listcriteres = response.criteres;

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


  onSubmit() {
    let noteData: any[] = [];
    console.log(this.myFormGroup.value);
    for (let i in this.dynamicForm.value.criteres) {
      noteData.push(this.dynamicForm.value.criteres[i].noteData)


    }
    console.log("Bonjour: ", noteData)
  }

  onInfo(selection:any){
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
      message: 'Etes-vous sûr de vouloir rejeter cet agent ?',
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
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Agent rejeter avec succès', life: 5000 });
  }, error => {
    console.error(JSON.stringify(error));
    this.isOpInProgress = false;
    this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Le rejet a échoué', life: 5000 });
  });
}
  // // Edit

  onEdit(fonctionnaire?: Fonctionnaire) {
    if (fonctionnaire) this.selection = fonctionnaire;

    this.dynamicForm.patchValue({
      idFonctionnaire: this.selection.id,
    });

    this.clearDialogMessages();
    this.fonctionnaire = Object.assign({}, this.selection);
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.fonctionnaireService.update(this.fonctionnaire).subscribe(response => {
      let index = this.notes.findIndex(note => note.id === response.id);
      this.fonctionnaires[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'MinistereInstitution agent modifié avec succes' });
    }, error => this.handleError(error));
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






  //test 

  get idFonctionnaire() { return this.dynamicForm.get('idFonctionnaire'); }
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.criteres as FormArray; }
  get critereGroup() { return this.t.controls as FormGroup[]; }





}

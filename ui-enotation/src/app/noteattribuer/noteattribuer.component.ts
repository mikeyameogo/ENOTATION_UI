import { Component } from '@angular/core';
import { Note } from '../shared/model/note';
import { Critere } from '../shared/model/critere';
import { Fonctionnaire } from '../shared/model/fonctionnaire';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../shared/service/token-storage.service';
import { NoteService } from '../shared/service/note.service';
import { FonctionnaireService } from '../shared/service/fonctionnaire.service';
import { CritereService } from '../shared/service/critere.service';
import { LazyLoadEvent, Message, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-noteattribuer',
  templateUrl: './noteattribuer.component.html',
  styleUrls: ['./noteattribuer.component.scss']
})
export class NoteattribuerComponent {

    isLoggedIn = false;
  username?: string;
  note!: Note;
  matricule?:string;
  saveSuccess: boolean = false;
  message: any;
  code: boolean = false;
  notes: Note[]=[];
  isLoading: boolean = false;
  submitted!: boolean;
  showDialog: boolean = false;
  showDialogAgent: boolean = false;
  checked: boolean = false;
  selection: any;
  listcriteres: Critere[] = [];
  fonctionnaire!: Fonctionnaire;
  form?: NgForm;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  enableBtnPrint = true;
  enableBtnDownload = true;
  enableCreate = true;
  enableBtnAccepter = true;
  enableBtnRejeterNote = true;
  //enableBtnRejeter:boolean=true;

  noteRejetee: boolean = false;
  anneeCourante: Date = new Date();
  noteC! : Note;
  noteAvecCriteres: Note = {};
  noteActivite!: number;

  // recordsPerPage = environment.recordsPerPage;
  totalRecords!: number;
  critere: Critere = {};
  template: any = [];
  dynamicForm!: FormGroup;
  myFormGroup: FormGroup = new FormGroup({});
  timeoutHandle: any;
  dialogErrorMessage: any;
  recordsPerPage = environment.recordsPerPage;

  constructor(
    private tokenStorageService: TokenStorageService,
    private noteService: NoteService,
    private fonctionnaireService: FonctionnaireService,
    private critereService: CritereService,
    private messageService: MessageService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
      this.matricule = user.matricule;
      // this.getNotes(this.matricule);
    }

    this.load();
    console.log(this.matricule);

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

    this.getFonctionnaire(this.matricule!);
    this.loadCritere();
  }

  onInfo(selection:any){
    console.log(selection);
  }

  getFonctionnaire(matricule: string){
    this.fonctionnaireService.getFonctionnaireConnecte(matricule).subscribe(
      data => {
        this.fonctionnaire = data;
             },
      err => {
        this.message = err.message;
      }
    );

  }

  getNoteCourante(){
      this.getFonctionnaire(this.matricule!);
      console.log(this.getFonctionnaire(this.matricule!));
      this.noteService.getNoteCourante(this.fonctionnaire.id!).subscribe(response => {
        this.noteC = response;
      }, error => {
          this.message = {severity: 'error', summary: error.error};
          console.error(JSON.stringify(error));

      });
    }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.noteService.getAllNote(event).subscribe(response => {
      this.isLoading = false;
      this.notes = response.notes;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  viewNote(note?: Note) {
    if (note) this.selection = note;
    this.note = Object.assign({}, this.selection);


    this.noteService.getCritereNote(this.note).subscribe(data => {
          this.noteAvecCriteres = data;
        }, error => {
          this.message = { severity: 'error', summary: error.error };
          console.error(JSON.stringify(error));
        });

    this.noteService.getNoteActivite(this.matricule!, note?.annee).subscribe(data =>{
      this.noteActivite = data as number;
    }, error =>{
        this.message = { severity: 'error', summary: error.error };
        console.error(JSON.stringify(error));
    });

    this.showDialog = true;
  }


  onPrintNote(note?: Note){
    if (note) this.selection = note;
    this.note = Object.assign({}, this.selection);
    this.printNote(this.matricule!, note?.annee);
  }

  printNote(matricule: string, annee: any){
    this.noteService.printNote(matricule, annee).subscribe((response: any) => {

      // creer le fichier pdf de la note puis construire son url et l'ouvrir dans un nouvel onglet du navigateur
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });



  }

  onAcceptNote(note?: Note){
    if (note) this.selection = note;
    this.note = Object.assign({}, this.selection);
    this.acceptNote(note);
  }

  acceptNote(note?: Note){
    this.noteService.acceptNote(note!).subscribe(data => {
      this.note = data;
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Vous avez accepté la note proposée par votre supérieur !', life: 3000});
    }, error =>{
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Votre note n\'a pas été acceptée !', life: 3000});
      // this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
  });

  }


  onRejectNote(note?: Note){
    if (note) this.selection = note;
    this.note = Object.assign({}, this.selection);
    this.rejectNote(note);
  }

  rejectNote(note?: Note){

    this.noteService.rejectNote(note!).subscribe(data => {
      this.note = data;
      this.messageService.add({severity:'success', summary: 'Attention', detail: 'Vous avez rejeté la note proposée par votre supérieur !', life: 3000});
    }, error =>{
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Votre note n\'a pas été rejetée !', life: 3000});
      // this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
  });

  }


  loadCritere(event?: LazyLoadEvent) {
    // this.isLoading = true;
    this.critereService.findAll(event).subscribe(response => {
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


  onSubmit() {
    let noteData: any[] = [];
    console.log(this.myFormGroup.value);
    for (let i in this.dynamicForm.value.criteres) {
      noteData.push(this.dynamicForm.value.criteres[i].noteData)


    }
    console.log("Bonjour: ", noteData)
  }


  onCreate() {
    this.fonctionnaire = {};
    this.form?.resetForm();
    this.showDialogAgent = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;

    this.noteService.createNoteAgent(this.dynamicForm.value).subscribe(response => {
      if (this.notes.length !== this.recordsPerPage) {
        this.notes.push(response);
        this.notes = this.notes.slice();
        console.log("Hello Word: ", response);
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialogAgent = false;
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Votre proposition de note a été prise en compte avec succès !', life: 3000});

    }, error => {
      this.handleError(error);
      this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.message, life: 4000});

    } );

  }


  onEdit(fonctionnaire?: Fonctionnaire) {
    if (fonctionnaire) this.selection = fonctionnaire;

    this.dynamicForm.patchValue({
      idFonctionnaire: this.selection?.id,
    });

    this.clearDialogMessages();
    this.fonctionnaire = Object.assign({}, this.selection);
    this.showDialogAgent = true;

    console.log("Fonctionnaire: ", fonctionnaire);
  }

//   edit() {
//     this.clearDialogMessages();
//     this.isDialogOpInProgress = true;
//     this.fonctionnaireService.update(this.fonctionnaire).subscribe(response => {
//       let index = this.notes.findIndex(note => note.id === response.id);
//       // this.fonctionnaires[index] = response;
//       this.isDialogOpInProgress = false;
//       this.showDialogAgent = false;
//       this.showMessage({ severity: 'success', summary: 'MinistereInstitution agent modifié avec succes' });
//     }, error => this.handleError(error));
//   }


  onUpdate() {
    this.clearDialogMessages();
    this.showDialogAgent = true;

  }

  update() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    if(this.noteC.id != undefined){
      console.log("LA NOTE COURANTE EST :" + this.noteC)
    }
    this.noteService.updateNote(this.dynamicForm.value, this.noteC.id!).subscribe(response => {
      if (this.notes.length !== this.recordsPerPage) {
        this.notes.push(response);
        this.notes = this.notes.slice();
        console.log("Hello Word: ", response);
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialogAgent = false;
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Votre proposition de note a été prise en compte avec succès !', life: 3000});

    }, error => {
      this.handleError(error);
      this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.message, life: 4000});

    } );
  }

  onProposer() {
    this.dynamicForm.patchValue({
      idFonctionnaire: this.fonctionnaire!.id!,
    });

    this.clearDialogMessages();
    this.showDialogAgent = true;

    console.log("Fonctionnaire: ", this.fonctionnaire);
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
  get t() { return this.f['criteres'] as FormArray; }
  get critereGroup() { return this.t.controls as FormGroup[]; }

}

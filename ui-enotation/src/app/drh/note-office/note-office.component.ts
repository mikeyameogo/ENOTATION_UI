import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { NoteService } from 'src/app/shared/service/note.service';

@Component({
  selector: 'app-note-office',
  templateUrl: './note-office.component.html',
  styleUrls: ['./note-office.component.scss']
})
export class NoteOfficeComponent {

  @ViewChild('dtf')
  form!: NgForm;
  submitted!: boolean;
  saveSuccess: boolean = false;
  message: any;
  file: Blob | string = ''; 
  checked: boolean = false;

  noteRecours = {
    matricule: '',
    note: '',
    annee: '',
    urlRecours: ''
  }

  constructor(
    private notesService: NoteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }


  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'La note a été enregistrée avec succès !!! '});
}

showError() {
  this.messageService.add(
    {severity:'error', summary: 'Error', detail: 'Echec de l\'enregistrement de la note !!! '}
    );
}

reloadPage(){
  setTimeout(()=>{
    location.reload();
  }, 400);
}


  save() {
    const formData: FormData = new FormData();
    const dataAsJson: Blob = new Blob([JSON.stringify(this.noteRecours)], { type: 'application/json' });
    formData.append('data', dataAsJson );
    formData.append('file', this.file);
    this.notesService.createNoteOffice(formData).subscribe(data => {
        this.saveSuccess = true;
        this.showSuccess();
        this.reloadPage();
      },
      err => {
        this.message = err.message;
        this.saveSuccess = false;
        this.showError();
        this.reloadPage();
      }
    )
  }

  
  onSelectFile(event: any): void {
    // console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

}

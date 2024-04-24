import { Component, OnDestroy, OnInit} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Activite, IActivite } from 'src/app/shared/model/activite';
import { Note } from 'src/app/shared/model/note';
import { ActiviteService } from 'src/app/shared/service/activite.service';
import { NoteService } from 'src/app/shared/service/note.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.scss']
})
export class AgentHomeComponent {

  activites: IActivite[] =[];
  activite: IActivite = new Activite();
  isLoggedIn = false;
  matricule!: string;
  message: any ;
  notes: Note[]=[];
  isLoading: boolean = false;
  anneeActu! : Date;
  nbTache!: number;
  nbNote!: number;
  constructor(private activiteService: ActiviteService,
    private tokenStorageService: TokenStorageService,
    private noteService : NoteService) { }

  ngOnInit(): void {
    this.anneeActu = new Date();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    this.matricule = user.matricule;
     
    }
    this.load();
    this.loadNote();
  }

  load(event?: LazyLoadEvent) {
   
    this.isLoading = true;
    this.activiteService.getAll(this.matricule,this.anneeActu.getFullYear(),event).subscribe((response) => {
      this.isLoading = false;
      this.nbTache= response.activites.length;
       console.log(this.nbTache)
      // this.totalRecords = response.totalCount;
    }, (error: { error: any; }) => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadNote(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.noteService.getAllNote(event).subscribe((response: { notes: string | any[]; }) => {
      this.isLoading = false;
      this.nbNote = response.notes.length;
    }, (error: { error: any; }) => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

}

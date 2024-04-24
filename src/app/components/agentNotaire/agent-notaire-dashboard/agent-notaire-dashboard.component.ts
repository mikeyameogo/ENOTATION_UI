import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Activite } from 'src/app/models/activite';
import { Note } from 'src/app/models/note';
import { ActiviteService } from 'src/app/services/activite.service';
import { NotesService } from 'src/app/services/notes.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-agent-notaire-dashboard',
  templateUrl: './agent-notaire-dashboard.component.html',
  styleUrls: ['./agent-notaire-dashboard.component.css']
})
export class AgentNotaireDashboardComponent implements OnInit {

  activites: Activite[] =[];
  activite: Activite = {};
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
    private noteService : NotesService,
    private router: Router) { }

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
    this.activiteService.getAll(this.matricule,this.anneeActu.getFullYear(),event).subscribe(response => {
      this.isLoading = false;
      this.nbTache= response.activites.length;
       console.log(this.nbTache)
      // this.totalRecords = response.totalCount;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadNote(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.noteService.getAllNote(event).subscribe(response => {
      this.isLoading = false;
      this.nbNote = response.notes.length;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  tache(){
  this.router.navigate(['/superieur/activite']);
  }

  note(){
    this.router.navigate(['/superieur/mes-notes']);
    }
  
}

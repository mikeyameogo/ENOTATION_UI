import { Component, OnInit } from '@angular/core';
import { Fonctionnaire } from 'src/app/models/fonctionnaire';
import { FonctionnaireService } from 'src/app/services/fonctionnaire.service';

@Component({
  selector: 'app-mon-code',
  templateUrl: './mon-code.component.html',
  styleUrls: ['./mon-code.component.css']
})
export class MonCodeComponent {

  
  fonctionnaire!: Fonctionnaire;
  saveSuccess: boolean = false;
  message: any;
  code: boolean = false;

  constructor(private fonctionnaireService: FonctionnaireService) { }

  afficherMonCode(){
    this.fonctionnaireService.afficherCodeAffiliation().subscribe(
      data => {
        this.fonctionnaire = data;
        this.message = 'Le code a ete recupere avec succes ';
        if(this.fonctionnaire.codeGenere == null){
          this.code = false;
          this.message = 'Vous n\'avez pas encore généré un code.\nPour générer un code allez à l\'onglet \"Générer code\" !';
        } else { this.code = true}
        this.saveSuccess = true;
             },
      err => {
        this.message = err.message;
        this.saveSuccess = false;
      }
    );
  }

}

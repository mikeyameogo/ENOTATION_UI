import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Fonctionnaire } from 'src/app/models/fonctionnaire';
import { FonctionnaireService } from 'src/app/services/fonctionnaire.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-changer-affiliation',
  templateUrl: './changer-affiliation.component.html',
  styleUrls: ['./changer-affiliation.component.css']
})
export class ChangerAffiliationComponent implements OnInit {

  @ViewChild('dtf')
  form!: NgForm;
  submitted!: boolean;
  saveSuccess: boolean = false;
  message: any;
  superieur!: Fonctionnaire;
  timeoutHandle: any;
  newCodeAffiliation!: string;
  oldCodeAffiliation!: string;
  motif!: string;
  reference!: string;

  constructor(private fonctionnaireService: FonctionnaireService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutHandle);
  }

  verifier(){
    if(!this.reference || !this.motif || !this.oldCodeAffiliation || !this.newCodeAffiliation){
      this.messageService.add(
        {severity:'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires !!! ', life: 5000}
        );
    } else{
    this.fonctionnaireService.VerifierAffiliation(this.newCodeAffiliation).subscribe(
      data => {this.superieur=data},
      err => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Code incorrect, vérifiez le nouveau code que vous avez saisi !!!', life: 5000 });
      }
    );
  }
}

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Succès', detail: 'Vous avez changé de supérieur hiérarchique avec succès !!! ', life: 5000});
}

showError() {
  this.messageService.add(
    {severity:'error', summary: 'Erreur', detail: 'Echec du changement de supérieur, vérifiez votre code supérieur !!! ', life: 5000}
    );
}

reloadPage(){
  setTimeout(()=>{
    location.reload();
  }, 400);
}

  save(){
    this.submitted = true;
    if(!this.reference || !this.motif || !this.oldCodeAffiliation || !this.newCodeAffiliation){
      this.messageService.add(
        {severity:'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires !!! ', life: 5000}
        );
    } else{
    this.fonctionnaireService.changerAffiliation(this.oldCodeAffiliation, this.newCodeAffiliation, 
      this.reference, this.motif).subscribe(
      data => {
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
}
}

import { Critere } from "./critere"

export interface Note{
id?:number;
observation?:string;
pointDivergeance?:string;
statusRejete?:boolean;
propositionSuperieur?:boolean;
contraintesRealisation?:string;
noteGlobale?:number;
annee?:Date;
date_validation?:Date;
noteActivite?:number;
okSuperieur?:boolean;
okAgent?:boolean;
noteCritereList?: CritereNote[];
urlRecours?:string
}

export interface CritereNote{
    id?:number;
    note?:number;
    id_note?:Note;
    id_critere?:Critere;
   }

   export interface NoteParCritere{
    id?:number;
    note?:number;
    libelleCritere?: string;
   }

export interface NoteSuperieur{
    id?:number;
    annee?: Date;
    idFonctionnaire?: number;
    contraintesRealisation?: string;
    pointDivergeance?: string;
    observation?: string;
    noteCriteres?: CritereNote[]
}




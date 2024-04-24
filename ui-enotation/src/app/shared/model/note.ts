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

////////////////////////////////////////////////////////////////////////////////////////////////
export class Notation implements Note{
    constructor(
     public   id?:number,
     public  observation?:string,
     public   pointDivergeance?:string,
     public   statusRejete?:boolean,
     public   propositionSuperieur?:boolean,
     public   contraintesRealisation?:string,
     public  noteGlobale?:number,
     public  annee?:Date,
     public  date_validation?:Date,
     public  noteActivite?:number,
     public  okSuperieur?:boolean,
     public  okAgent?:boolean,
     public  noteCritereList?: CritereNote[],
     public  urlRecours?:string

    ){}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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




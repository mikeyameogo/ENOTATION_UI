import { Fonctionnaire } from "./fonctionnaire";


export interface Activite {
    id?:number;
    libelle?:string;
    ponderation?:number;
    taux_realisation?:number;
    observation?: string;
    annee?:number;
    fonctionnaire?:Fonctionnaire;

}

import { ProfilAgent } from "./profil-agent";

export interface Critere {
    id?:number;
    libelle?:string;
    ponderation?:number;
    typeAgent?:ProfilAgent;
    statut?:boolean;
}



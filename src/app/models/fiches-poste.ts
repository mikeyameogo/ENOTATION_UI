import { Categorie } from "./categorie";

export interface FichesPoste {
    id?: number;
    libelle?: string;
    code?: string;
    url?: string;
    categorie?: Categorie;
}

export interface IProfilAgent {
    id?: number;
    libelle?: string;
}

export class ProfilAgent implements IProfilAgent{
    constructor(
    public  id?: number,
    public libelle?: string
    ){}
}

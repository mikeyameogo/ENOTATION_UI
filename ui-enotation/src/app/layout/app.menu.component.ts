import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Tableau de bord',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin']
                    },
                    {
                        label: 'Code ministre',
                        icon: 'pi pi-fw pi-eye-slash',
                        routerLink: ['/admin/code-ministre']
                    },
                    
                    // {
                    //     label: 'Activité',
                    //     icon: 'pi pi-fw pi-eye-slash',
                    //     routerLink: ['/admin/activite']
                    // },
                    // {
                    //     label: 'Changé affliation',
                    //     icon: 'pi pi-fw pi-eye-slash',
                    //     routerLink: ['/admin/change-affiliation']
                        
                    // },
                    // },
                
                    {
                        label: 'Paramètres',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Fonctionnaire',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/fonctionnaire']
                            },
                            {
                                label: 'Ministere',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/ministere'] 
                            },
                            {
                                label: 'Fonction',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/fonction']
                            },
                            {
                                label: 'Categorie',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/categorie']
                            },
                            {
                                label: 'profil Agent',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/profil-agent']
                            },
                            {
                                label: 'Critere',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/critere']
                            },
                            {
                                label: 'Periode',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/periode']
                                
                            },
                           
                             // {
                            //     label: 'Outils',
                            //     icon: 'pi pi-fw pi-eye-slash',
                            //     routerLink: ['/admin/outils']
                            // },
                            
                            // {
                            //     label: 'fiche Postes',
                            //     icon: 'pi pi-fw pi-eye-slash',
                            //     routerLink: ['/admin/fiches-poste']
                            // },
                            // {
                            //     label: 'Notes',
                            //     icon: 'pi pi-fw pi-eye-slash',
                            //     routerLink: ['/admin/note']
                            // },
                            // {
                            //     label: 'Parametre',
                            //     icon: 'pi pi-fw pi-eye-slash',
                            //     routerLink: ['/admin/parametre']
                            // },
                           
                        ]
                    },
                    // {
                    //     label: 'DRH',
                    //     icon: 'pi pi-lock',
                    //     items: [
                    //         {
                    //             label: 'Accueil',
                    //             icon: 'pi pi-fw pi-eye-slash',
                    //             routerLink: ['/drh']
                    //         },
                    //         {
                    //             label: 'Note d\'office',
                    //             icon: 'pi pi-fw pi-eye-slash',
                    //             routerLink: ['/admin/note-office']
                    //         }
                    //     ]
                    // },
                    // {
                    //     label: 'Agent',
                    //     icon: 'pi pi-lock',
                    //     items: [
                    //         {
                    //             label: 'Accueil',
                    //             icon: 'pi pi-fw pi-eye-slash',
                    //             routerLink: ['/agent']
                    //         }
                    //     ]
                    // },
                    // {
                    //     label: 'Superieur hierarchique',
                    //     icon: 'pi pi-lock',
                    //     items: [
                    //         {
                    //             label: 'Accueil',
                    //             icon: 'pi pi-fw pi-eye-slash',
                    //             routerLink: ['/superieur-hierarchique']
                    //         }
                    //     ]
                    // },
                    //  {
                    //     label: 'Utilisateur',
                    //     icon: 'pi pi-lock',
                    //     items: [

                    //         {
                    //             label: 'compte',
                    //             icon: 'pi pi-fw pi-eye-slash',
                    //             routerLink: ['/admin/user']
                    //         }
                         
                    //     ]
                    // },
                    // {
                    //     label: 'Code',
                    //     icon: 'pi pi-lock',
                    //     items: [
                    //         {
                    //             label: 'Mon code',
                    //             icon: 'pi pi-fw pi-eye-slash',
                    //             routerLink: ['/admin/code']
                    //         }
                    //     ]
                    // },

                ]
            },

        ];
    }
}

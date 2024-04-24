import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/models/appconfig';
import { Stats } from 'src/app/models/stats';
import { Subscription } from 'rxjs';
import { AppconfigService } from 'src/app/services/appconfig.service';
import { StatistiqueService } from 'src/app/services/statistique.service';
import { navItems } from '../_nav';


@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
  loggedIn = false;
    dataNoteByFonctionnaire:any;
    NoteFonctionnaireOptions: any;
    dataLabelFonc: any[]=[];
    statParFonnaires : Stats[]=[];
    dataStatFonnaire:any[]=[];

  toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }
  dataRecours: any;
    dataOptions: any;
    dataOffice: any;
    OfficeOptions: any;
    RecoursOptions: any;
    config!: AppConfig;
    date10: Date = new Date();
    annee!: any;
    subscription!: Subscription;
    dataF: any;
    chartFOptions: any;
    message: any ;
    an:any;
    today!: Date;
    year:any;
    statComptes : Stats[]=[];
    recours : Stats = {};
    noteOffice : Stats = {};
    compteActif: Stats = {};
    compteNonActif: Stats = {};
    constructor(private configService: AppconfigService,
        private statService: StatistiqueService) {  }

    ngOnInit(): void {
        this.annee = new Date();
        this.year = this.annee.getFullYear();
        this.getAnnee(this.year);
        this.loadComptesActifs();
      //  this.loadOffice();
      //  this.loadRecours();
        this.config = this.configService.config;
        this.updateChartOptions();
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
            this.updateChartOptions2();
        });
    }


    updateChartOptions() {
        if (this.config.dark)
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }

    applyDarkTheme() {
        this.RecoursOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        };

        this.OfficeOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        };

        this.NoteFonctionnaireOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        };
    }

   /* getAnnee(an:Date){
        
        this.year = an.getFullYear();
        console.error("annee", this.year);
    }*/
    getAnnee(an:number){
        this.year = an;
        this.loadOffice(this.year);
        this.loadRecours(this.year);
        this.loadNbParnote(this.year);
    }
    applyLightTheme() {
        this.RecoursOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.OfficeOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.NoteFonctionnaireOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }
  
    loadNbParnote(year: any) {
        
        this.statService.getAllParFonctionnaire(year).subscribe(response => {
            this.statParFonnaires = response.stats;  
            //console.error("nombre ",this.statParFonnaires);
            for(let i=0; i<this.statParFonnaires.length; i++){
                this.dataStatFonnaire.push(this.statParFonnaires[i].label);
                this.dataLabelFonc.push(this.statParFonnaires[i].value)
            } 
          this.dataStatFonnaire = this.dataStatFonnaire;
          //console.error("nombre ",this.dataStatFonnaire);
            this.dataNoteByFonctionnaire = {
                labels: this.dataStatFonnaire,
                datasets: [
                    {
                        label: 'Nombre de fonctionnaire par note par an',
                        backgroundColor: ['#EC407A','#AB47BC', '#42A5F5','#7E57C2','#66BB6A',
                        '#FFCA28',
                        '#26A69A','#26A69E','#26A69X','#26A69Z'],
                        data: this.dataLabelFonc
                    }
                ]
            };
        }, error => {
          this.message = { severity: 'error', summary: error.error };
          console.error(JSON.stringify(error));
        });
      }
    getStatComptes(){

        this.dataF = {
            labels: ['Fonctionnaires actifs','Fonctionnaires non actifs'],
            datasets: [
                {
                    data: [this.compteActif.value, this.compteNonActif.value],
                    backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726"
                    ],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D"
                    ]
                }
            ]
        };
    }
    loadRecours(year: any) {
       
        this.statService.getAllRecours(year).subscribe(response => {
            this.recours = response;
            
            this.dataRecours = {
                labels: ['Janvier-Decembre'],
                datasets: [
                    {
                        label: 'Nombre de recours par an',
                        backgroundColor: '#FFA726',
                        data: [this.recours.value]
                    }
                ]
            };
        }
        , error => {
          this.message = { severity: 'error', summary: error.error };
          console.error(JSON.stringify(error));
        });
      }
    
      loadOffice(year: any) {
        
        this.statService.getAllOffices(year).subscribe(response => {
            this.noteOffice = response;   
            this.dataOffice = {
                labels: ['Janvier-Decembre'],
                datasets: [
                    {
                        label: 'Nombre de note office par an',
                        backgroundColor: '#42A5F5',
                        data: [this.noteOffice.value]
                    }
                ]
            };
        }, error => {
          this.message = { severity: 'error', summary: error.error };
          console.error(JSON.stringify(error));
        });
      }

      loadComptesActifs() {
        this.statService.getAllCompteActif().subscribe(response => {
            this.statComptes = response.stats;
            for (var i = 0; i < this.statComptes.length; i++) {
                if(this.statComptes[i].label){
                    this.compteActif = this.statComptes[i];
                } 
                if(!this.statComptes[i].label) {
                    this.compteNonActif = this.statComptes[i];
                }
            }
            this.dataF = {
                labels: ['Fonctionnaires actifs','Fonctionnaires non actifs'],
                datasets: [
                    {
                        data: [this.compteActif.value, this.compteNonActif.value],
                        backgroundColor: [
                            "#42A5F5",
                            "#66BB6A",
                            "#FFA726"
                        ],
                        hoverBackgroundColor: [
                            "#64B5F6",
                            "#81C784",
                            "#FFB74D"
                        ]
                    }
                ]
            };
        }, error => {
          this.message = { severity: 'error', summary: error.error };
          console.error(JSON.stringify(error));
        });
      }
     

      updateChartOptions2() {
        this.chartFOptions = this.config && this.config.dark ? this.getDarkTheme2() : this.getLightTheme2();
    }

    getLightTheme2() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        }
    }

    getDarkTheme2() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            }
        }


    }
}


import { INavData } from '@coreui/angular';



export const navItems: INavData[] = [
  {
    name: 'Tableau de bord',
    url: '/',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  // {
  //   title: true,
  //   name: 'Administration'
  // },
  {
      name: 'Parametrage',
      // url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
    name: 'Type agent',
    url: '/admin/profil-agents',
    icon: 'icon-map >'
  },
  {
    name: 'Profils',
    url: '/admin/profils',
    icon: 'icon-list'
  },
  {
    name: 'Ministères',
    url: '/admin/ministere-institution',
    icon: 'icon-directions '
  },
  {
    name: 'Critères',
    url: '/admin/criteres',
    icon: 'icon-list'
  },
  {
    name: 'Categorie metiers',
    url: '/admin/categories',
    icon: 'icon-list'
  },
  {
    name: 'Fonctionnaires',
    url: '/admin/fonctionnaires',
    icon: 'icon-list'
  },
  {
    name: 'Periodes',
    url: '/admin/periode',
    icon: 'icon-list'
  },
  {
    name: 'Affiliation',
    url: '/change-affiliation',
    icon: 'icon-list'
  },
  {
    name: 'Statistique',
    url: '/admin',
    icon: 'icon-list'
  },
],
  },
  
];

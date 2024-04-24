// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const domaineUrl="http://localhost:4200";
export const baseUrl="http://localhost:8089/evaluation/api";

export const environment = {
  production: false,
  domaine:`${domaineUrl}`,
  profilResource: `${baseUrl}/profils`,
  profilAgentResource: `${baseUrl}/type-agents`,
  authResource: `${baseUrl}/authenticate`,
  resetInitResource: `${baseUrl}/account/reset-password/init`,
  resetFinishResource:`${baseUrl}/account/reset-password/finish`,
  activateAccountResource:`${baseUrl}/activate-account`,
  changePassword: `${baseUrl}/account/change-password`,
  fonctionnaireResource:`${baseUrl}/fonctionnaires`,
  critereResource:`${baseUrl}/criteres`,
  categorieResource:`${baseUrl}/categories`,
  ministereInstitutionResource:`${baseUrl}/ministere-institutions`,
  fichesPosteResource:`${baseUrl}/fiche-postes`,
  fileResource:`${baseUrl}/resource`,
  activiteResourceAgent:`${baseUrl}/activites/matricule/`,
  activiteResource:`${baseUrl}/activites`,
  aproposResource:`${baseUrl}/apropos`,
  changeAffiliationResource:`${baseUrl}/fonctionnaires/change-affiliation`,
  rejeterFonctionnaireResource:`${baseUrl}/fonctionnaires/rejeter/`,
  verifierAffiliationResource:`${baseUrl}/fonctionnaires/get-superieur`,
  mesAgentsResource:`${baseUrl}/fonctionnaires/agents`,
  mesNotesResource:`${baseUrl}/notes/mes_notes`,
  noteOfficeResource:`${baseUrl}/notes/office`,
  noteCouranteResource:`${baseUrl}/notes/noteCourante`,
  noteSuperieurProposer:`${baseUrl}/notes/superieur/proposer`,
  genererCodeResource:`${baseUrl}/fonctionnaires/generate-code`,
  afficherCodeResource:`${baseUrl}/fonctionnaires/mon-code`,
  noteAgentProposer:`${baseUrl}/notes/agent/proposer`,
  noteUpdateResource:`${baseUrl}/notes`,
  printNoteResource:`${baseUrl}/download`,
  noteActiviteResource:`${baseUrl}/activites/note-activite`,
  acceptNoteResource:`${baseUrl}/notes/accepter`,
  rejectNoteResource:`${baseUrl}/notes/rejeter`,

  periodeResources:`${baseUrl}/periodes`,

  activiteSupResources:`${baseUrl}/activites/matricule/`,

  propositionActResources:`${baseUrl}/activites/superieur/proposer/`,

  modifierActResources:`${baseUrl}/activites/superieur/modifier/`,

  statRessource:`${baseUrl}/statistiques/`,

  recordsPerPage: 10,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

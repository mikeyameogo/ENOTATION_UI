export const baseUrl="http://localhost:8089/evaluation/api";
export const domaineUrl="http://localhost:4200";
export const environment = {
  production: true,
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

  periodeResources:`${baseUrl}/periodes`,

  activiteSupResources:`${baseUrl}/activites/matricule/`,

  propositionActResources:`${baseUrl}/activites/superieur/proposer/`,

  modifierActResources:`${baseUrl}/activites/superieur/modifier/`,

  statRessource:`${baseUrl}/statistiques/`,

  recordsPerPage: 10,
};

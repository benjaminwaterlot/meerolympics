Login: Firebase
Hosting: Firebase
Backend: Cloud Functions
API: /
DB: Firestore

## General

Pédagogie: Faire une appli 100% Firebase

## PLUS

**Layers entre le front et la DB:**
* Aucun pour les reads et write simples,
* Minimal (une simple cloud function) pour les writes complexes.

**Pas de serveur: moins de maintenance.**

**Coût de lancement:**
Gratuit.

## MOINS

**Traitement et aggregation des data:**
* Réaliser des aggrégations est relativement complexe (ex: un classement général, cf Notes)

**Maîtrise des coûts:**
* Il faudra peut-être faire des choix entre fonctionnalités et budget (beaucoup de reads pour les aggrégations régulières)


## Notes :
* La simple lecture d'un classement général déclenchera autant de `reads` que de joueurs dans le classement, à moins de tricher en le mettant dans un array dans un document. Mais dans ce cas, difficile de l'updater proprement à chaque match...
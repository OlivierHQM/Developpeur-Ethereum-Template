# Voting.sol

## Description

Ce projet organise un vote sur la blockchain

# Installation/Déploiement

```
npm install

truffle migrate

```

# Contrat





# Tests

Equipe référente : Olivier HUYNH-QUAN-MINH oliv.hqm@gmail.com
Date de création des tests : 28/06/2022
Nombre total de tests : 11



Pour lancer les tests : 

```
truffle test

```

## Description des tests

La stratégie de tests est de tester les 5 parties du code :
- GETTERS
- REGISTRATION
- PROPOSAL
- VOTE
- STATE


### GETTER voter tests
L'objectif est de tester les cas de bon fonctionnement de la fonction "getVoter" 
Plus test des "require onlyVoters"


### GETTER proposal tests
L'objectif est de tester les cas de bon fonctionnement de la fonction "getOneProposal" 
Plus test des "require onlyVoters"

### REGISTRATION voters test
L'objectif est de tester les cas de bon fonctionnement de la fonction "addVoter" 
Plus test des "require" et des "emit"


### REGISTRATION proposal test
L'objectif est de tester les cas de bon fonctionnement de la fonction "addProposal" 
Plus test des "require" et des "emit"


### VOTE tests
Travail en cours


### STATE test
Travail en cours



const Voting = artifacts.require('./Voting.sol');
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');




contract('Voting', function (accounts) {
    const owner = accounts[0];
    const user1 = accounts[1]; // "user" car une personne n'est à l'origine pas un "voter"
    const user2 = accounts[2];

    let votingInstance;


    // Description d'une catégorie de tests
    describe("Test de la fonction d'ajout d'une personne dans la liste des votants autorisés", function() {

        //Déploiement du contrat avant chaque nouveau test
        beforeEach(async function () {
            votingInstance = await Voting.new({from : owner});
            await votingInstance.addVoter(owner, {from : owner});
        });

            // Test de l'ajout d'une personne sur la liste des votants autorisés dans le mapping
            it ("... should add a voter in mapping", async function() {
             
                await votingInstance.addVoter(user1, {from : owner});
                // await WorkflowStatus.RegisteringVoters;    
                const storedData = await votingInstance.getVoter(user1, {from : user1});
                expect(storedData.isRegistered).to.be.true;

            });

            it ("... should add a voter in mapping", async function() {
             

                const storedData = await votingInstance.getVoter(user2, {from : owner});
                expect(storedData.isRegistered).to.be.false;

            });





            // Test de l'ajout d'une personne sur la liste des votants autorisés alors que le satut est sur "ProposalsRegistrationStarted"
            it ("... should not add a voter already registered, revert", async function () {
                await votingInstance.addVoter(user1, {from : owner});
                await expectRevert(votingInstance.addVoter(user1, {from : owner}), "Already registered");



            });
    });


    // Description d'une catégorie de tests
    describe("Test de l'ajout d'une proposition dans le tableau des propositions", function () {

        // Déploiement du contrat avec chaque test
        beforeEach(async function () {
            votingInstance = await Voting.new({from : owner});
            votingInstance.addVoter(user1, {from : owner});
        });

        // Test de l'ajout d'une propostion 
        it.skip ("... should store a proposal in array", async function() {
            await votingInstance.addProposal("Plus de frites", {from : user1});
            const storedData = await votingInstance.getOneProposal(0, {from : owner});
            expect(storedData).to.equal("Plus de frites");
        });
    
    });




    // Test des fonctions de récupération
    describe("Testing all GETTER functions", function () {

        beforeEach(async function () {
            votingInstance = Voting.new({from : owner});
            await votingInstance.addVoter(user1, {from : owner});
        });





        it.skip ("...should have Workflowstatus = registeringVoters at initialization", async function() {
            // TODO
        });




    });



    // Test des fonctions d'enregistrement
    describe("Testing all REGISTRATION functions", function () {

    


    });



    // Description d'une catégorie de tests
    describe("Test de l'émission des événements", function() {

        // Déploiement du contrat avec chaque test
        beforeEach(async function(){
            votingInstance = await Voting.new({from : owner});
        })

        // Test de l'émission de l'événement enregistrement d'un votant
        it.only ("... should emit voter registered", async function() {
            const findEvent =  await votingInstance.addVoter(user1, {from : owner});
            expectEvent(findEvent, "VoterRegistered", {voterAddress : user1}); // Pourquoi on ne renseigne pas le paramètre _addr ? 
        })


        // Test de l'émission de l'événement enregistrement d'une propostion
        it ("... should emit proposal registered", async function () {
            await votingInstance.addVoter(user1);
            await votingInstance.startProposalsRegistering();
            const findEvent = await votingInstance.addProposal("Plus de frites", {from : user1});
            expectEvent(findEvent, "ProposalRegistered"); // Pourquoi n'y a t-il pas d'argument ? 
        });


        // Test de l'émission de l'événement vote effectué
        it ("... should emit voted", async function () {
            await votingInstance.addVoter(owner, {from : owner});
            await votingInstance.addVoter(user1, {from : owner});
            await votingInstance.startProposalsRegistering({from : owner});            
            await votingInstance.addProposal("Plus de frites", {from : user1});
            await votingInstance.endProposalsRegistering({from : owner});
            await votingInstance.startVotingSession({from : owner});
            const findEvent = await votingInstance.setVote(0, {from : user1});
            expectEvent(findEvent, "Voted", {voter : user1, proposalId : (new BN(0))});
        });


    })

});    
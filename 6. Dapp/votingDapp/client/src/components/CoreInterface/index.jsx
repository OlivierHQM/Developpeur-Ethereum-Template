import AdministratorInterface from "../AdministratorInterface";
import VoterInterface from "../VoterInterface";
import PublicView from "../PublicView";
import {useEffect, useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import React from "react";
 
 
 
function CoreInterface() {
  const { state: { contract, accounts } } = useEth(); {/* Déclaration de ce hook pour récupérer des contrats et des adresses sur la blockchain via ETH provider (?) */}
 
  const [workflowStatus, setWorkflowStatus] = useState(""); {/* Déclaration de ces deux fonctions pour récupérer le workflow status sur la blockchain en appelant le contrat*/}
  const [connectedUser, setConnectedUser] = useState(""); {/* Déclaration de ces deux fonctions pour récupérer l'adresse de l'utisateur actuel en appelant le contrat*/}
  const [contractOwner, setContractOwner] = useState("");  
  const [registeredVoters, setRegisteredVoters] = useState([]); {/* Déclaration de ces deux fonctions pour récupérer l'état initial en appelant le contrat*/}
  const [proposalsList, setProposalsList] = useState([]); {/* Déclaration de ces deux fonctions pour récupérer la liste des propositions en appelant le contrat*/}
  const [publicViewMessage, setPublicViewMessage] = useState('No message to display'); {/* Déclaration de ces deux fonctions pour récupérer des événements en écoutant les emits du contrat + initialisation */}
  const [administratorInterfaceMessage, setAdministratorInterfaceMessage] = useState('No message to display'); {/* Déclaration de ces deux fonctions pour récupérer des événements en écoutant les emits du contrat + initialisation */}
  const [voterInterfaceMessage, setVoterInterfaceMessage] = useState('No message to display'); {/* Déclaration de ces deux fonctions pour récupérer des événements en écoutant les emits du contrat + initialisation */}
 
 
 
  useEffect(()=> { {/* Déclenchement du hook qui appelle le contrat après chaque affichage du DOM  */}
    const getWorkflowStatus = async () => {
      if (contract) {
        let wfs = await contract.methods.workflowStatus().call();
        const wfsAsString = [ 
          "RegisteringVoters",
          "ProposalsRegistrationStarted",
          "ProposalsRegistrationEnded",
          "VotingSessionStarted",
          "VotingSessionEnded",
          "VotesTallied"];{/* Déclaration d'un tableau qui récupère toutes les états possibles */}
        setWorkflowStatus(wfsAsString[wfs]); {/* Récupération d'une chaine de caractères à partir du positionnement de l'état dans le tablau d'état du contrat */}
      }
    }
 
    const getRegisteredvoters = async () => { {/* Déclenchement du hook qui appelle le contrat après chaque affichage du DOM */}
      if (contract) {
        let voters = await contract.methods.getAllVoters().call();
        setRegisteredVoters(voters);
      }
    }
 
    const getAllProposals = async () => { {/* Déclenchement du hook qui appelle le contrat après chaque affichage du DOM */}
      if (contract) {
        let proposals = await contract.methods.getAllProposals().call();
        setProposalsList(proposals);
      }
    }
 
    const getConnectedUser = async () => { {/* Déclenchement du hook qui appelle le contrat après chaque affichage du DOM */}
      if (accounts) {
        setConnectedUser(accounts[0]);
      }
    }
 
    const getContractOwner = async () => { {/* Déclenchement du hook qui appelle le contrat après chaque affichage du DOM */}
      if (contract) {
        const owner = await contract.methods.owner().call();
        setContractOwner(owner);
      }
    }
 
    getWorkflowStatus(); {/* Lancement de la fonction */}
    getConnectedUser(); {/* Lancement de la fonction */}
    getContractOwner(); {/* Lancement de la fonction */}
    getRegisteredvoters(); {/* Lancement de la fonction */}
    getAllProposals(); {/* Lancement de la fonction */}
  },[accounts, contract]); {/* ????  */}
 
 
 
  useEffect(()=> {
    if  (contract) {
      contract.events.VoterRegistered()
        .on('data', event => {
          const getRegisteredvoters = async () => {
            if (contract) {
              let voters = await contract.methods.getAllVoters().call();
              setRegisteredVoters(voters);
            }
          }
 
          setAdministratorInterfaceMessage('Voter Registered !')
          setPublicViewMessage('Voter Registered !');
          getRegisteredvoters();
        })
 
      console.log("Now listening to VoterRegistered Events !")
 
      const wfsAsString = [
        "RegisteringVoters",
        "ProposalsRegistrationStarted",
        "ProposalsRegistrationEnded",
        "VotingSessionStarted",
        "VotingSessionEnded",
        "VotesTallied"];
      contract.events.WorkflowStatusChange()
        .on("data", event => {
 
          const newStatus = event.returnValues.newStatus;
          setWorkflowStatus(wfsAsString[newStatus]);
 
        })
      console.log("Now listening to WorkflowStatusChange Events !")
 
      contract.events.ProposalRegistered()
        .on("data", event => {
          const getAllProposals = async () => {
            if (contract) {
              let proposals = await contract.methods.getAllProposals().call();
              setProposalsList(proposals);
            }
          }
          setPublicViewMessage('Proposal Registered !')
          setVoterInterfaceMessage('Proposal Registered !')
 
          getAllProposals();
        })
      console.log("Now listening to ProposalRegistered Events !")
    }
  },[contract])
 
 
  const getWinner= async () => {
    if (contract) {
      let  winnerId = await contract.methods.winningProposalID().call();
      setPublicViewMessage('... and the winner is :' + winnerId + ' : ' + proposalsList[winnerId])
      setVoterInterfaceMessage('... and the winner is :' + winnerId + ' : ' + proposalsList[winnerId])
      setAdministratorInterfaceMessage('... and the winner is :' + winnerId + ' : ' + proposalsList[winnerId])
    }
  }
 
 
 
  return (
    <>
      <div>
 
          <PublicView
              votingStatus={workflowStatus}
              votersList={registeredVoters}
              proposalsList={proposalsList}
              publicViewMessage={publicViewMessage}/>
             <div className="separator"></div>
          <hr />
          <VoterInterface
            connectedUser={connectedUser}
            voterInterfaceMessage={voterInterfaceMessage}/>
            <div className="separator"></div>
          <hr />
          <AdministratorInterface
              connectedUser={connectedUser}
              contractOwner={contractOwner}
              administratorInterfaceMessage={administratorInterfaceMessage}/>
      
          <div className="separator"></div>
        <button  onClick={getWinner} >getWinner</button>
        <div><span className="code-red">{administratorInterfaceMessage}</span></div>
        <div className="separator"></div>
        </div>
    </>
  );
}
 
export default CoreInterface;

import AdministratorInterface from "../AdministratorInterface";
import VoterInterface from "../VoterInterface";
import PublicView from "../PublicView";
import {useEffect, useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import React from "react";
 
 
 
function CoreInterface() {
  const { state: { contract, accounts } } = useEth();
 
  const [workflowStatus, setWorkflowStatus] = useState("");
  const [connectedUser, setConnectedUser] = useState("");
  const [contractOwner, setContractOwner] = useState("");
  const [registeredVoters, setRegisteredVoters] = useState([]);
  const [proposalsList, setProposalsList] = useState([]);
  const [publicViewMessage, setPublicViewMessage] = useState('No message to display');
  const [administratorInterfaceMessage, setAdministratorInterfaceMessage] = useState('No message to display');
  const [voterInterfaceMessage, setVoterInterfaceMessage] = useState('No message to display');
 
 
 
  useEffect(()=> {
    const getWorkflowStatus = async () => {
      if (contract) {
        let wfs = await contract.methods.workflowStatus().call();
        const wfsAsString = [
          "RegisteringVoters",
          "ProposalsRegistrationStarted",
          "ProposalsRegistrationEnded",
          "VotingSessionStarted",
          "VotingSessionEnded",
          "VotesTallied"];
        setWorkflowStatus(wfsAsString[wfs]);
      }
    }
 
    const getRegisteredvoters = async () => {
      if (contract) {
        let voters = await contract.methods.getAllVoters().call();
        setRegisteredVoters(voters);
      }
    }
 
    const getAllProposals = async () => {
      if (contract) {
        let proposals = await contract.methods.getAllProposals().call();
        setProposalsList(proposals);
      }
    }
 
    const getConnectedUser = async () => {
      if (accounts) {
        setConnectedUser(accounts[0]);
      }
    }
 
    const getContractOwner = async () => {
      if (contract) {
        const owner = await contract.methods.owner().call();
        setContractOwner(owner);
      }
    }
 
    getWorkflowStatus();
    getConnectedUser();
    getContractOwner();
    getRegisteredvoters();
    getAllProposals();
  },[accounts, contract]);
 
 
 
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
             
          <hr />
          <VoterInterface
            connectedUser={connectedUser}
            voterInterfaceMessage={voterInterfaceMessage}/>
          <hr />
          <AdministratorInterface
              connectedUser={connectedUser}
              contractOwner={contractOwner}
              administratorInterfaceMessage={administratorInterfaceMessage}/>
          <hr />
        <li><button  onClick={getWinner} >getWinner</button></li>
        <div><span className="code-red">{administratorInterfaceMessage}</span></div>
 
        </div>
    </>
  );
}
 
export default CoreInterface;

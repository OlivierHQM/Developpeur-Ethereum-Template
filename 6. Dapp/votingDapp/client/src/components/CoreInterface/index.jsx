import AdministratorInterface from "../AdministratorInterface";
import VoterInterface from "../VoterInterface";
import PublicView from "../PublicView";
import {useEffect, useState} from "react";
import useEth from "../../contexts/EthContext/useEth";



function CoreInterface() {
  const { state: { contract, accounts } } = useEth(); 

  const [workflowStatus, setWorkflowStatus] = useState("");
  const [connectedUser, setConnectedUser] = useState("");
  const [contractOwner, setContractOwner] = useState("");
  const [registeredVoters, setRegisteredVoters] = useState([]);

  const proposalsListMock = [];
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
      contract.events.WorkflowStatusChange()
        .on("data", event => {
          const newStatus = event.returnValues.newStatus;
          setWorkflowStatus(wfsAsString[newStatus]);
        })
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

  const setEventsListeners = () => {
    if (contract) {
        contract.events.VoterRegistered()
          .on('data', event => {

            setRegisteredVoters((pre) => {
              pre.push(event.returnValues.voterAddress)
              console.log(pre);
              return pre;

            })

            console.log("voter registered event received")
          })
          .on('changed', changed => console.log('changed' + JSON.stringify(changed)))
          .on('error', error => console.log(error))
          .on('connected', connected => console.log(connected))
    }
  }






  useEffect(()=> {
    getWorkflowStatus();
    getConnectedUser();
    getContractOwner();
  })

  useEffect(()=> {
    setEventsListeners();

  })


  return (
    <>
      <div className="core-interface-container">

          <PublicView 
              votingStatus={workflowStatus}
              votersList={registeredVoters} 
              proposalsList={proposalsListMock}  />
              
          <hr />
          <VoterInterface />
          <hr />
          <AdministratorInterface 
              connectedUser={connectedUser} 
              contractOwner={contractOwner}/>
          <hr />

        </div>
    </>
  );
}

export default CoreInterface;

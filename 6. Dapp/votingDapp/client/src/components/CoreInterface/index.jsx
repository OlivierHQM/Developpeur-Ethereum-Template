import AdministratorInterface from "../AdministratorInterface";
import VoterInterface from "../VoterInterface";
import PublicView from "../PublicView";
import {useEffect, useState} from "react";
import useEth from "../../contexts/EthContext/useEth";



function CoreInterface() {
  const [workflowStatus, setWorkflowStatus] = useState("");
  const { state: { contract } } = useEth();
  const votersListMock = ["address voter 1", "address voter 2"];
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


  useEffect(()=> {
    getWorkflowStatus();
  })


  return (
    <>
      <div className="container">

          <PublicView 
              votingStatus={workflowStatus}
              votersList={votersListMock} 
              proposalsList={proposalsListMock}  />
              
          <hr />
          <VoterInterface />
          <hr />
          <AdministratorInterface />
          <hr />

        </div>
    </>
  );
}

export default CoreInterface;

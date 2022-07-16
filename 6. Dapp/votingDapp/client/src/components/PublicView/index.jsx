import ProposalsList from "./ProposalsList";
import Title from "./Title";
import VotersList from "./VotersList";
import VotingStatus from "./VotingStatus";


function PublicView() {
  return (
    <>
      <Title />
      <br />
      <VotingStatus />
      <br />
      <VotersList />
      <br />
      <ProposalsList />
    </>
  );
}

export default PublicView;

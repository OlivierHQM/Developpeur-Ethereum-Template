function PublicView(props) {
  return (
    <>
      <div>
      <h2>Public view</h2>
    <h3>Voting status : {props.votingStatus}</h3>   
    <h3>Voters list : {props.votersList}</h3>
    <h3>Proposals list : {props.proposalsList}</h3>
    </div>
    </>
  );
}

export default PublicView;

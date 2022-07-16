function PublicView(props) {
  return (
    <>
      <div className="public-view-container">
      <h2>Public view</h2>
    <h3>Voting status : <span className="code">{props.votingStatus}</span></h3>   
    <h3>Voters list : <span className="code">{props.votersList}</span> </h3>
    <h3>Proposals list : <span className="code">{props.proposalsList}</span> </h3>
    </div>
    </>
  );
}

export default PublicView;

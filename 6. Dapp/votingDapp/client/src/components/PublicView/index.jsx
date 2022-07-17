function PublicView(props) {
 
  const voterListItems = props.votersList.map((d) => <li key={d}>{d}</li>);
  const porposalListItems = props.proposalsList.map((d,i) => <li key={d}>{'id= ' +i + ' => ' + d}</li>);
 

  return (
    <>
      <div className="generic-container">
 
        <div><h1>Public view</h1></div>
        <div><span className="code-red">{props.publicViewMessage}</span></div>
 
        <div><h3>Voting status : <span className="code">{props.votingStatus}</span></h3></div>
        <div><h3>Voters list : </h3></div>
        <div><span className="code">{voterListItems}</span></div>
        <div><h3>Proposals list :</h3></div>
        <div><span className="code">{porposalListItems}</span></div>
 

      </div>
    </>
  );
}
 
export default PublicView;

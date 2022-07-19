function PublicView(props) {
 
  const voterListItems = props.votersList.map((d) => <li key={d}>{d}</li>);
  const porposalListItems = props.proposalsList.map((d,i) => <li key={d}>{'id= ' +i + ' => ' + d}</li>); {/* Affectation à la variable ...Items d'une liste d'élément d'un tableau parcourru par la boucle map */}
 

  return (
    <>
      <div className="generic-container">
 
        <div><h2>Public view</h2></div>
        <div><span className="code-red">{props.publicViewMessage}</span></div>
 
        <div><h3>Voting status : <span className="code">{props.votingStatus}</span></h3></div>
        <div><h3>Voters list : </h3></div>
        <div><span className="code">{voterListItems}</span></div>
        <div><h3>Proposals list :</h3></div>  {/* Installation du texte à afficher lors de l'import du component public view par le component coreinterface*/}
        <div><span className="code">{porposalListItems}</span></div> {/* Affichage dynamique de la variable ...Items */}
 

      </div>
    </>
  );
}
 
export default PublicView;

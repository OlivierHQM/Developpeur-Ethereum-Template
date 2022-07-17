import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "../VoterInterface/Title";



function VoterInterface(props) {

  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [proposalDesc, setProposalDesc] = useState("");

  const Choice = async e => {
    console.log("Fonction exécutée");
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter an address.");
      return;
    }
    await contract.methods.setVote(inputValue).send({ from: accounts[0] });
  };

  const handleInputChange = e => {
    console.log(e.target.value);
      setInputValue(e.target.value);
      console.log(inputValue)
  };

  const addProposal = async e => {
    if (proposalDesc === "") {
      alert("Please enter a proposal description  to add.");
      return;
    }
  
  
    try {
      await contract.methods.addProposal(proposalDesc).send({ from: props.connectedUser });
    }
    catch(err) {
      console.log('error' + err)
    }
  };
  

  return (
    <div className="generic-container">
      <Title />

      
    
      <div><span className="code-red">{props.voterInterfaceMessage}</span></div>

      <br/>

      <input
          type="text"
          placeholder="Proposal descrition"
          value={proposalDesc}
          onChange={(e) => setProposalDesc(e.target.value)}
        />
      <button type="button" onClick={addProposal}>addProposal</button>        
      <br/>

      <input
          type="text"
          placeholder="Proposal number"
          value={inputValue}
          onChange={handleInputChange}
        />
      <button type="button" onClick={Choice}>Enter vote</button>        
      </div>
    
  );
}

export default VoterInterface;

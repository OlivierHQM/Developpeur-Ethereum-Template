import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "../VoterInterface/Title";



function VoterInterface() {

  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const Choice = async e => {
    console.log("Fonction exécutée");
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter an address.");
      return;
    }
    await contract.methods.Choice(inputValue).send({ from: accounts[0] });
  };

  const handleInputChange = e => {
    console.log(e.target.value);
      setInputValue(e.target.value);
      console.log(inputValue)
  };

  

  return (
    <div className="administrator_interface">
      <Title />

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

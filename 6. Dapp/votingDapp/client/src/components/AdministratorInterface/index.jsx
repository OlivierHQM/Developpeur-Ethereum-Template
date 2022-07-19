import {useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import React from 'react';
import Title from "./Title";
import Desc from "./Desc";


function AdministratorInterface(props) { // Création du component AdminstratorInterface qui sera utilisé par Coreinterface
  const { state: { contract } } = useEth(); // Déclaration d'un hook d'initialisation du contrat via EthProvider

  const [inputValue, setInputValue] = useState(""); // Déclaration d'un hook de récupération de valeur non initialisée 
  //const [registeredVoters, setRegisteredVoters] = useState([])

  const handleInputChange = e => {
    setInputValue(e.target.value); // Récupération d'une valeur saisie dans le DOM
  }; 

  const addVoter = async e => {
    if (inputValue === "") {
      alert("Please enter an address of a voter to add.");
      return;
    }

    
    try {
      await contract.methods.addVoter(inputValue).send({ from: props.connectedUser }); // Recherche dans l'Abi du contrat la méthode addVoter et envoi si le clic est déclenché 
    }
    catch(err) {
      console.log('error' + err)
    }
  };

  const startProposalsRegistering = async () => { // Fonction qui appelle le contrat et demande un changement d'état 
    await contract.methods.startProposalsRegistering().send({ from: props.connectedUser }); // 
  }

  const endProposalsRegistering = async () => {
    await contract.methods.endProposalsRegistering().send({ from: props.connectedUser });
  }


  const startVotingSession = async () => {
    await contract.methods.startVotingSession().send({ from: props.connectedUser });
  }

  const endVotingSession = async () => {
    await contract.methods.endVotingSession().send({ from: props.connectedUser });
  }

  const tallyVotes = async () => {
    await contract.methods.tallyVotes().send({ from: props.connectedUser });
  }


  return (
    <div className="generic-container">
      <Title /> 
      <br />
      <Desc />
      <br />
      <div><span className="code-red">{props.administratorInterfaceMessage}</span></div>
      <h3>Connected user:  <span className="code">{props.connectedUser}</span></h3>

      <h3>Contract owner:  <span className="code">{props.contractOwner}</span></h3>
      <br />

      <span>
        Address of voter to register:
        <input type="text" placeholder="address" value={inputValue} onChange={handleInputChange}/> {/* Installation d'un champ de récupération d'une valeur saisie dans ce champ */}
        <button onClick={addVoter} >Add</button>
      </span>
      <br />
     

      <div>
          <li><button  onClick={startProposalsRegistering} >startProposalsRegistering</button></li> {/* Création d'un bouton pour chaque changement d'état + déclenchement de chaque changement d'état au déclenchement de l'événement clic */}
          <li><button  onClick={endProposalsRegistering} >endProposalsRegistering</button></li>
          <li><button  onClick={startVotingSession} >startVotingSession</button></li>
          <li><button  onClick={endVotingSession} >endVotingSession</button></li>
          <li><button  onClick={tallyVotes} >tallyVotes</button></li>
      </div>
     



    </div>
  );
}
  

export default AdministratorInterface;




/*

(0) 0x1B52C31A69D7e2346E2411aF3eeD2B02FB2eb5D8 (1000 ETH)
(1) 0x62BF1c9f030191781755C35F427f911998101c75 (1000 ETH)
(2) 0xb4eE87830f38868A7776237CE8F60b6F72778e5A (1000 ETH)
(3) 0xEDF7e942D277C56cF556dF086436BDdecb10f51C (1000 ETH)
(4) 0x5495141384FAf6a8B0eE24Efa3AF63269A44c74d (1000 ETH)
(5) 0x2CD07fb0F22E11eF7342F2757407126A1E6776eA (1000 ETH)
(6) 0x0AC1E4F29C3980a291059b171a3144A21f0ae0b3 (1000 ETH)
(7) 0xdf52d866C056dd616e9EACd36e46A1A11DfB78c1 (1000 ETH)
(8) 0x98ad92ab5C5aEc6D02f57ce10C612E0a8d0e6763 (1000 ETH)
(9) 0x6860BEb98daEA1d20cA69D1ac6b59Ee9e4001A0C (1000 ETH)

Private Keys
==================
(0) 0x7392a1e3e22e967aab6f1be4040c162f34053b2aa3a4c00647eb89003e0f5574
(1) 0x36ef0f11b11e6157e0e951521efea771946a96d90a431531e6fce36babecc893
(2) 0xa1602886f168cd2d054a83ebf40f7365b8ef1cd4a49c04a3810b4589eb64f88e
(3) 0xb8d61204924947a2e3bff09d4c5586ec1b688a255311e196aadc56939830d392
(4) 0x3c827d35758ad23cae19a953c5f3910e1fa7a2aba47b57316e463bd6c87743a0
(5) 0x7fda75b96e30771a0f1a94bdbdcc61ba3bb8a3affcfb6152e655f42dba2c3fdd
(6) 0x52432822e5aae2bab8be308c05f49067ecd8361e8d2420e6a5bd9a41245fbcb7
(7) 0x24c2ba25df35e3e69769e0593735daea33e0bfc7b8ad1b5bae5d8cfd143ba500
(8) 0x3b317b3f87d414153ce3d542109271128281e15d39f321c822aab9b54d161603
(9) 0xc96788097f47fe524f264295969e815ca305b06d36430b33f684c5829b97382e



*/
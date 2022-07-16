import {useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import React from 'react';
import Title from "./Title";
import Desc from "./Desc";


function AdministratorInterface(props) {
  const { state: { contract } } = useEth();

  const [inputValue, setInputValue] = useState("");
  //const [registeredVoters, setRegisteredVoters] = useState([])

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const addVoter = async e => {
    if (inputValue === "") {
      alert("Please enter an address of a voter to add.");
      return;
    }

    
    try {
      await contract.methods.addVoter(inputValue).send({ from: props.connectedUser });
    }
    catch(err) {
      console.log('error' + err)
    }
  };

  const startProposalsRegistering = async () => {
    await contract.methods.workflowStatus().send({ from: props.connectedUser });
    await contract.methods.startProposalsRegistering().send({ from: props.connectedUser });
  }

  const endProposalsRegistering = async () => {
    await contract.methods.workflowStatus().send({ from: props.connectedUser });
    await contract.methods.endProposalsRegistering().send({ from: props.connectedUser });
  }


  const startVotingSession = async () => {
    await contract.methods.workflowStatus().send({ from: props.connectedUser });
    await contract.methods.startVotingSession().send({ from: props.connectedUser });
  }


  return (
    <div className="administrator-interface">
      <Title /> 
      <Desc />
      <p>Connected user:  <span className="code">{props.connectedUser}</span></p>

      <p>Contract owner:  <span className="code">{props.contractOwner}</span></p>

      <span>
        Address of voter to register:
        <input type="text" placeholder="address" value={inputValue} onChange={handleInputChange}/>
        <button onClick={addVoter} >Add</button>
      </span>

     

      <div>
         <button  onClick={startProposalsRegistering} >startProposalsRegistering</button>
          <button  onClick={endProposalsRegistering} >endProposalsRegistering</button>
          <button  onClick={startVotingSession} >startVotingSession</button>
      </div>
     



    </div>
  );
}
  

export default AdministratorInterface;




/*
(0) 0xFF5A0AEdA410c177A9E92699E64C901E4E9cE5f6 (1000 ETH)
(1) 0xA7764E933C56a354DaBE18C0533069F8bec03DAD (1000 ETH)
(2) 0xBBb9A11684df559ea3502042CfAD76F80B0525aD (1000 ETH)
(3) 0x49D0F255f00b6042bcA931C7b3939d6202bBeA6E (1000 ETH)
(4) 0xE25B8B6f51E4B75275CB18b4bbF29E1b3C03B7eA (1000 ETH)
(5) 0x9c51005a12d8166BB88ADbEd5CFbc5387e448861 (1000 ETH)
(6) 0x618621cD5A41CcfeA4B6f834F8a3E2c9c0F955dB (1000 ETH)
(7) 0x943CFFe6E69235AA2bd58bf1e8E1D7450b13c141 (1000 ETH)
(8) 0x15FDE0Ac64cAff49d9FCd66616A5d4255881736C (1000 ETH)
(9) 0x8aBaa38514a134451DccE380960B0E59B25D91b2 (1000 ETH)

Private Keys
==================
(0) 0xd25ace9fd988546586612a5054160a129a60a4398ae0f2e55bb8f184d5fa63af
(1) 0x373ff44cde8168d7a2c29ff1e17c9c04b22ffcd427b895505b9706f440c7489e
(2) 0x1bf98326261c4f3ee9f65ce80ec348fd94791827da2a1d6bf13f6b6525020e24
(3) 0x3173ce0dec92f655f5756ce4d95fedd348a89623e9877ee67bea916122c339c9
(4) 0xbda63300cbe32901062711fbc236609f530745a5d483839cd48aed551116d8c7
(5) 0x4da79f62c14fd7aec89273deb097e003ab5ab5020abc9d0fa24e63a6e9a03a7b
(6) 0x767b917db6d44a603611fcaa7c635ee3933c1af07a58d32db8da8cb8c82b2e8a
(7) 0x0cd0acba4dada1855bf4cc26573cec77883a82c14b05bd17cc31dae09398fbb0
(8) 0xcb3550a2a6b5b6dbd7cd689b9a9055c34c5a67ad2be24af5dbedcc10ced7f467
(9) 0x874e470b8b86d9b2e219c48c2c86e9a814451d2c5d6f17cc810e52b2a7dd6e56
*/
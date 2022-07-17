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
    await contract.methods.startProposalsRegistering().send({ from: props.connectedUser });
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
      <Desc />
      <div><span className="code-red">{props.administratorInterfaceMessage}</span></div>
      <h3>Connected user:  <span className="code">{props.connectedUser}</span></h3>

      <h3>Contract owner:  <span className="code">{props.contractOwner}</span></h3>
      <br />

      <span>
        Address of voter to register:
        <input type="text" placeholder="address" value={inputValue} onChange={handleInputChange}/>
        <button onClick={addVoter} >Add</button>
      </span>
      <br />
     

      <div>
          <li><button  onClick={startProposalsRegistering} >startProposalsRegistering</button></li>
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
(0) 0xceFEa953Ff6d1B8A8BC003Db67E3F1de893976Fc (1000 ETH)
(1) 0x9a1A559a9ba32b25f703c31c7DE23F347dE61Bb3 (1000 ETH)
(2) 0x2658d9c7B5b72d77460FCc853186E617b0f2277D (1000 ETH)
(3) 0x097039c816B8e60B75F4E54dEDc46D8238b0A252 (1000 ETH)
(4) 0x196b8cF389888fC1844Af6e1E5605DA86b928cc4 (1000 ETH)
(5) 0x69CAeDc5223c1D73a4660B49fdb19583956991a8 (1000 ETH)
(6) 0x9b6Dc9FD0bF83226090cAceD7fC1e66471fF5Fe0 (1000 ETH)
(7) 0x60786B21ac892a5Ee88605Bf2111E8587AbFE599 (1000 ETH)
(8) 0xeDD64b27bde0A7Da970f3a333ED42c0959191575 (1000 ETH)
(9) 0x38b5a56A517dfD479c19E49Fa1f9568a60C06Ec3 (1000 ETH)

Private Keys
==================
(0) 0xd79005b22954b89ffda9dabe95948a2b1e322838bf324108bf03f7b6a9800a91
(1) 0x345880743171721f8bb7e580e5505b5fb746bdc115548d960e984d3550d39a1a
(2) 0x5fd848e82b93cd1ce22a655961a824e3d802719b0dce70d786e339219efd070b
(3) 0xa23397a35e23400c1f3565f8d0161904f193718bb0bd645a3063c99f5009fa0b
(4) 0x472a9871dd6501a20a3071a3538b02864191d1b6223088698fa7d4928979ea9d
(5) 0xb63b1872db4074fa93c4336cd3005f4f54cd465d065acae97141f35fb6ccc49c
(6) 0x5887d7e89d96a2ceb7ecd7b1545ca91e9b0abc682ae6f5f054e64f812ec0a248
(7) 0x2202ced90ee97351464dc8a166495db3ec0add5e06e0694c4136231bbd2c2e71
(8) 0x149f348bee1478e7c1dcbaa97f1f8bf0be4105448a42cab8f707acda07b7f235
(9) 0x574a1bc999c68e52d9634b7c2cad0c5f5f0c253026a731a9a462fc7d238fd8f1
*/
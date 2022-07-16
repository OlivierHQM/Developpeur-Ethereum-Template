







import {useEffect, useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import React from 'react';
import Title from "./Title";
import Desc from "./Desc";







function AdministratorInterface() {
  const { state: { accounts, contract } } = useEth();

  const [inputValue, setInputValue] = useState("");
  const [owner, setOwner] = useState("")
  const [registeredVoters, setRegisteredVoters] = useState([])

   const  searchOwner = async () =>  {
    if (contract) {
      let ownerResp = await contract.methods.owner().call();
      setOwner(ownerResp)
      console.log(owner)
    }

   }

  useEffect( () => {
    searchOwner();

  });


  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const addVoter = async e => {
    if (inputValue === "") {
      alert("Please enter an address of a voter to add.");
      return;
    }





    contract.events.VoterRegistered()
      .on('data', event => {
        console.log(event)
        console.log(event.returnValues)
        console.log(event.returnValues.voterAddress)

        setRegisteredVoters((pre) => {
          pre.push(event.returnValues.voterAddress)
          return pre;
        })

        console.log(registeredVoters)
      })
      .on('changed', changed => console.log('changed' + JSON.stringify(changed)))
      .on('error', error => console.log(error))
      .on('connected', connected => console.log(connected))



    try {
      let addVoterResp = await contract.methods.addVoter(inputValue).send({ from: accounts[0] });
      console.log('addVoterResp' + addVoterResp)

    }
    catch(err) {
      console.log('error' + err)

    }
   //


  };

  const refresh = async () => {
    contract.getPastEvents('VoterRegistered').then(results => console.log(results)).catch(err => console.log(err));


  }

  const startProposalsRegistering = async () => {
    let  a = await contract.methods.workflowStatus().send({ from: accounts[0] });
    console.log("a");
    console.log(a);
    let  startProposalsRegisteringResp = await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
    
    console.log(startProposalsRegisteringResp);

  }

  const endProposalsRegistering = async () => {
    let  a = await contract.methods.workflowStatus().send({ from: accounts[0] });
    console.log("a");
    console.log(a);
    let  endProposalsRegisteringResp = await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
    
    console.log(endProposalsRegisteringResp);

  }


  const startVotingSession = async () => {
    let  a = await contract.methods.workflowStatus().send({ from: accounts[0] });
    console.log("a");
    console.log(a);
    let  startVotingSessionResp = await contract.methods.startVotingSession().send({ from: accounts[0] });
    
    console.log(startVotingSessionResp);

  }





  return (
    <div className="administrator-interface">
      <Title /> 
      <Desc />
      <p>Connected user address:  <span className="code">{accounts}</span></p>

      <p>The contract owner  address is: <span className="code">{owner}</span></p>

      <span>
        Address of voter to register:
        <input type="text" placeholder="address" value={inputValue} onChange={handleInputChange}/>
        <button onClick={addVoter} >Add</button>
      </span>


      <div className="btns">

      <button  onClick={refresh} >refresh</button>
      </div>
      <div className="container">
        RegisteredVoters:
        <p><span className="code">{registeredVoters}</span></p>
      </div>
     
      <div className="btns">

      <button  onClick={startProposalsRegistering} >startProposalsRegistering</button>
      </div>

      <div>
      <button  onClick={endProposalsRegistering} >endProposalsRegistering</button>
      </div>

      <div>
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
import React, { useState } from 'react';

import DataDAOExampleArtifact from "./contracts/DataDAOExample.json";
import SimpleCoinArtifact from "./contracts/SimpleCoin.json";
import MembershipNFTArtifact from "./contracts/MembershipNFT.json";


import { Buffer } from 'buffer';

// import { ethers } from "ethers";
const ethers = require("ethers")

function App() {
  // const [storedPrice, setStoredPrice] = useState('');
  // const [transaction, setTransaction] = useState('');
  const [isDAOMember, setisDAOMember] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum)



  const joinDAO = async () => {
    try {
      // const signer = provider.getSigner()
      var signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)
      console.log(provider, signer)


      console.log("Hello", signer.address)

      var MembershipNFTArtifactABI = MembershipNFTArtifact.abi;
      const MembershipNFTContract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS_MembershipNFT,
        MembershipNFTArtifactABI, signer)

      console.log("Minting Membership NFT ...");

      await MembershipNFTContract.mint(signer.address, {
        gasLimit: 200000054   //1000000000
        // maxPriorityFeePerGas: priorityFee
      })

      var contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_DataDaoExample;
      console.log(contractAddress);

      var ABI = DataDAOExampleArtifact.abi;
      var contract = new ethers.Contract(contractAddress, ABI, signer);

      console.log(contract);

      console.log("running joinDAO...")
      // const transaction = await contract.joinDAO();
      const transaction = await contract.joinDAO(
        {
          gasPrice: provider.getGasPrice(),
          gasLimit: 200000054,
        });
      // await transaction.wait();   // sc: this works with or without await. not sure why. original code includes await
      console.log("transaction: ");
      console.log(transaction);
      console.log(parseInt(transaction.value));

      // setTransaction(transaction);

    } catch (error) {
      console.log("joinDAO Error: ", error);
    }
  }


  // joinDAO()
  //   .catch(console.error)


  // /////////////////////////////////////////////////////////////////
  const [deal, setDeal] = useState('');

  const createDataSetDealProposal = async () => {

    try {

      console.log("running createDataSetDealProposal...")

      var signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)
      console.log(provider, signer)

      var contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_DataDaoExample;
      console.log(contractAddress);
      var ABI = DataDAOExampleArtifact.abi;
      var contract = new ethers.Contract(contractAddress, ABI, signer);

      var cid = Buffer.from('Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu', 'ascii');
      var size = 1;
      var dealdurationindays = 1;
      var dealstoragefees = 0;

      const deal = await contract.createDataSetDealProposal(
        cid,
        size,
        dealdurationindays,
        dealstoragefees,
        {
          // value: ethers.utils.parseEther(dealstoragefees),  
          // gasLimit: 1000000000,
          // gasPrice: provider.getGasPrice(),
          gasPrice: provider.getGasPrice(),
          gasLimit: 2000000,
        });
      // {
      //   gasPrice: provider.getGasPrice(),
      //   gasLimit: 2000000,
      // });
      console.log("deal: ");
      console.log(deal);
      console.log("Deal created");
      setDeal("Deal created");

    } catch (error) {
      console.log("createDataSetDealProposal Error: ", error);
    }
  }


  // /////////////////////////////////////

  const IsDAOMember = async () => {

    try {

      // // console.log("networkVersion: ", window.ethereum.networkVersion);
      // const selectedAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // console.log(selectedAddress[0]);


      console.log("running IsDAOMember...")

      var signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)
      // var signer = new ethers.Wallet(selectedAddress, provider)
      console.log(provider, signer)

      var contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_DataDaoExample;
      console.log(contractAddress);

      var ABI = DataDAOExampleArtifact.abi;
      // const DataDAOExample = await ethers.getContractFactory("DataDAOExample")
      const DataDAOExampleContract = new ethers.Contract(contractAddress, ABI, signer)
      // var contract = new ethers.Contract(contractAddress, ABI, signer);

      console.log(DataDAOExampleContract);

      const is_dao_member = await DataDAOExampleContract.isDAOMember({
        gasPrice: provider.getGasPrice(),
        gasLimit: 2000000,
      });
      // const is_dao_member = await DataDAOExampleContract.isDAOMember();
      console.log("is_dao_member", is_dao_member);

      if (is_dao_member === true) {
        setisDAOMember(true);
      } else {
        console.log(signer.address, "is a not member of the Data DAO");
        setisDAOMember(false);
      }

    } catch (error) {
      console.log("isDAOMember Error: ", error);
    }
  }





  // // createDataSetDealProposal()
  // // .catch(console.error)

  // /////////////////////////////////////////////////////////////////

  // // const membershipNFT = async () => {

  // //   try {
  // //     console.log("running membershipNFT...")
  // //     // const transaction = await contract.tokenCount();
  // //     const transaction = await contract.tokenCount;
  // //     console.log(parseInt(transaction));

  // //   } catch (error) {
  // //     console.log("membershipNFT Error: ", error);
  // //   }
  // //   }



  // //   membershipNFT()
  // //   .catch(console.error)


  ////////////////////////////////
  // const checkTokenOwner = async () => {
  //   try {
  //     var signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)
  //     console.log(provider, signer)


  //     console.log("Hello", signer.address)

  //     var MembershipNFTArtifactABI = MembershipNFTArtifact.abi;
  //     const MembershipNFTContract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS_MembershipNFT,
  //       MembershipNFTArtifactABI, signer)

  //     const tokenOwner = await MembershipNFTContract.methods.ownerOf(5).call()
  //     const hasToken = signer.address === tokenOwner

  //     console.log("hasToken: ", hasToken)
  //   } catch (error) {
  //     console.log("checkTokenOwner Error: ", error);
  //   }
  // }

  // checkTokenOwner()
  //   .catch(console.error)


  // /////////////////////////////////////
  const [balance, setBalance] = useState('');

  const SimpleCoin = async () => {
    try {

      var contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_SIMPLECOIN;
      // var contractAddress = '0x1A0dB3C9B27CA0029ac6D35c538066Ee7AaAa62E';

      var ABI = SimpleCoinArtifact.abi;

      var signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)

      var contract = new ethers.Contract(contractAddress, ABI, signer);
      // const contract = new ethers.Contract(contractAddress, ABI, provider);
      // console.log(contract);

      console.log("running SimpleCoin...")
      const balance = await contract.getBalance('0xeA67cfe03d3f59B7dcD7B46CDf6Cf0C3d5089F12',
        {
          gasPrice: provider.getGasPrice(),
          gasLimit: 2000000,
        });

      // await balance.wait(); 
      setBalance(parseInt(balance) / 100000000);
      console.log("balance: ", parseInt(balance));
    } catch (error) {
      console.log("SimpleCoin Error: ", error);
    }
  }

  // SimpleCoin()
  //   .catch(console.error)


  /////////////////////////////////////
  // const [mintedTokenBalance, setMintedTokenBalance] = useState('');


  // const getMintedTokenBalance = async () => {
  //   try {
  //     console.log("running getMintedTokenBalance...")
  //     const getMintedTokenBalance = await contract.getMintedTokenBalance;
  //     // const getMintedTokenBalance = await contract.getMintedTokenBalance( 
  //     // {
  //     //   gasPrice: provider.getGasPrice(),
  //     //   gasLimit: 2000000,
  //     // });
  //     // await getMintedTokenBalance.wait();   // sc: this works with or without await. not sure why. original code includes await


  //     console.log(parseInt(getMintedTokenBalance));
  //     // setMintedTokenBalance(parseInt(getMintedTokenBalance));
  //     setMintedTokenBalance(getMintedTokenBalance);
  //     console.log('getMintedTokenBalance');
  //   } catch (error) {
  //     console.log("getMintedTokenBalance Error: ", error);
  //   }
  // }

  // getMintedTokenBalance()
  //   .catch(console.error)


  /////////////////////////////////////

  const [nftid, setNftid] = useState('');

  const returnCurrentNftId = async () => {

    try {

      // // console.log("networkVersion: ", window.ethereum.networkVersion);
      // const selectedAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // console.log(selectedAddress[0]);


      console.log("running returnCurrentNftId...")

      var signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)
      // var signer = new ethers.Wallet(selectedAddress, provider)
      console.log(provider, signer)

      var contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_MembershipNFT;
      console.log(contractAddress);

      var ABI = MembershipNFTArtifact.abi;
      // const DataDAOExample = await ethers.getContractFactory("DataDAOExample")
      const MembershipNFTContract = new ethers.Contract(contractAddress, ABI, signer)
      // var contract = new ethers.Contract(contractAddress, ABI, signer);

      console.log(MembershipNFTContract);

      const NftId = await MembershipNFTContract.returnCurrentNftId({
        gasPrice: provider.getGasPrice(),
        gasLimit: 2000000,
      });
      // const is_dao_member = await DataDAOExampleContract.isDAOMember();
      console.log("NftId", parseInt(NftId));
      setNftid(parseInt(NftId));

    } catch (error) {
      console.log("NftId Error: ", error);
    }
  }


  /////////////////////////////////////

  const [tokenCount, setTokenCount] = useState('');

  const transferNFT = async () => {

    try {

      // // console.log("networkVersion: ", window.ethereum.networkVersion);
      // const selectedAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // console.log(selectedAddress[0]);


      console.log("running transferNFT...")

      var signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)
      // var signer = new ethers.Wallet(selectedAddress, provider)
      console.log(provider, signer)

      var contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_MembershipNFT;
      console.log(contractAddress);

      var ABI = MembershipNFTArtifact.abi;
      // const DataDAOExample = await ethers.getContractFactory("DataDAOExample")
      const MembershipNFTContract = new ethers.Contract(contractAddress, ABI, signer)
      // var contract = new ethers.Contract(contractAddress, ABI, signer);

      console.log(MembershipNFTContract);

      const from = signer;
      // const to = "0x000000000000000000000000000000000000dEaD"  // burner address
      const to = "0x0000000000000000000000000000000000000000"  // burner address

      const tokenid = 1; // current NFT Id 

      const IdCount = await MembershipNFTContract.transferNft(
        from,
        to,
        tokenid,
        {
          gasPrice: provider.getGasPrice(),
          gasLimit: 2000000,
        });
      console.log("IdCount:", parseInt(IdCount));
      setTokenCount(parseInt(IdCount));

    } catch (error) {
      console.log("transferNFT Error: ", error);
    }
  }





  /////////////////////////////////////

  const burnNFT = async () => {

    try {

      // // console.log("networkVersion: ", window.ethereum.networkVersion);
      // const selectedAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // console.log(selectedAddress[0]);


      console.log("running burnNFT...")

      var signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)
      // var signer = new ethers.Wallet(selectedAddress, provider)
      console.log(provider, signer)

      var contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_MembershipNFT;
      console.log(contractAddress);

      var ABI = MembershipNFTArtifact.abi;
      // const DataDAOExample = await ethers.getContractFactory("DataDAOExample")
      const MembershipNFTContract = new ethers.Contract(contractAddress, ABI, signer)
      // var contract = new ethers.Contract(contractAddress, ABI, signer);

      console.log(MembershipNFTContract);


      const tokenid = 4; // current NFT Id 
      console.log("nftid: ", tokenid)

      await MembershipNFTContract.burnNft(
        tokenid,
        {
          gasPrice: provider.getGasPrice(),
          gasLimit: 2000000,
        });


    } catch (error) {
      console.log("burnNFT Error: ", error);
    }
  }


  /////////////////////////////////////
  // If the token data or the user's balance hasn't loaded yet, we show
  // a loading component.
  console.log("isDAOMember:", isDAOMember)
  if (isDAOMember === true) {
    return (

      <div className="container">
        <div className="row mt-5">

          <div className="col">
            <h3>Join DAO</h3>
            <button type="submit" className="btn btn-dark" onClick={joinDAO}>Join</button>
          </div>
          <div className="col">
            <h3>Response</h3>
            {/* <p>{transaction}</p> */}


            {/* {transaction.map(transaction => <div>{transaction.value}</div>)} */}
          </div>


          <div className="col">
            <h3>Deal</h3>
            <button type="submit" className="btn btn-dark" onClick={createDataSetDealProposal}>Create Deal</button>
            <p>{deal}</p>
          </div>


          <div className="col">
            <h3>Balance</h3>
            <button type="submit" className="btn btn-dark" onClick={SimpleCoin}>Get Balance</button>
            <p>{balance}</p>
          </div>


          <div className="col">
            <h3>isDAOMember</h3>
            <button type="submit" className="btn btn-dark" onClick={IsDAOMember}>isDAOMember</button>
            <p>{isDAOMember}</p>
            <input type="image" img src="https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu" alt="test image" />
          </div>



          <div className="col">
            <h3>returnCurrentNftId</h3>
            <button type="submit" className="btn btn-dark" onClick={returnCurrentNftId}>returnCurrentNftId</button>
            <p>{nftid}</p>
          </div>



          <div className="col">
            <h3>transferNFT</h3>
            <button type="submit" className="btn btn-dark" onClick={transferNFT}>transferNFT</button>
            <p>{tokenCount}</p>
          </div>



          <div className="col">
            <h3>burnNFT</h3>
            <button type="submit" className="btn btn-dark" onClick={burnNFT}>burnNFT</button>

          </div>

        </div>
      </div>

    );
  }

  return (
    <div className="container">
      <div className="row mt-5">

        <div className="col">
          <h3>Join DAO</h3>
          <button type="submit" className="btn btn-dark" onClick={joinDAO}>Join</button>
        </div>

        <div className="col">
          <h3>Response</h3>
          {/* <p>{transaction}</p> */}
          {/* {transaction.map(transaction => <div>{transaction.value}</div>)} */}
        </div>


        <div className="col">
          <h3>Deal</h3>
          <button type="submit" className="btn btn-dark" onClick={createDataSetDealProposal}>Create Deal</button>
          <p>{deal}</p>
        </div>


        <div className="col">
          <h3>Balance</h3>
          <button type="submit" className="btn btn-dark" onClick={SimpleCoin}>Get Balance</button>
          <p>{balance}</p>
        </div>


        <div className="col">
          <h3>isDAOMember</h3>
          <button type="submit" className="btn btn-dark" onClick={IsDAOMember}>isDAOMember</button>
          <p>{isDAOMember}</p>

        </div>

        <div className="col">
          <h3>returnCurrentNftId</h3>
          <button type="submit" className="btn btn-dark" onClick={returnCurrentNftId}>returnCurrentNftId</button>
          <p>{nftid}</p>
        </div>

        <div className="col">
          <h3>transferNFT</h3>
          <button type="submit" className="btn btn-dark" onClick={transferNFT}>transferNFT</button>
          <p>{tokenCount}</p>
        </div>


        <div className="col">
          <h3>burnNFT</h3>
          <button type="submit" className="btn btn-dark" onClick={burnNFT}>burnNFT</button>

        </div>

        {/* <input type="image" img src="https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu" alt="test image"/> */}


        {/* 
        <div className="col">
          <h3>createDataSetDealProposal</h3>
          <button type="submit" className="btn btn-dark" onClick={createDataSetDealProposal}>createDataSetDealProposal</button>
        </div>


    
        <div className="col">
          <h3>Balance</h3>
          <p>{balance}</p>
        </div>


         <div className="col">
           <h3>MintedTokenBalance</h3>
           <p>{mintedTokenBalance}</p>
         </div> 
         
         
         */}


      </div>
    </div>
  );
}

export default App;
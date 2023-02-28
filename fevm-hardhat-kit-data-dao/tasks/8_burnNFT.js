
const { task, types } = require("hardhat/config")
const ethers = require("ethers")
const util = require("util")
const request = util.promisify(require("request"))

task("burn-nft", "burn nft")
  .addParam("nftcontract", "The address of the NFT contract")
  .addParam("tokenid", "Token ID")
  .addOptionalParam("logs", "Print the logs", true, types.boolean)
  .setAction(async ({ nftcontract, tokenid }, { ethers }) => {

    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    // const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

    // async function callRpc(method, params) {
    //   var options = {
    //     method: "POST",
    //     url: "https://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       jsonrpc: "2.0",
    //       method: method,
    //       params: params,
    //       id: 1,
    //     }),
    //   };
    //   const res = await request(options);
    //   return JSON.parse(res.body).result;
    // }

    const MembershipNFT = await ethers.getContractFactory("MembershipNFT")
    console.log("Hello", signer.address)
 
    const MembershipNFTContract = new ethers.Contract(nftcontract, MembershipNFT.interface, signer)

    console.log("Burning NFT ...");

    await MembershipNFTContract.burnNft(
      tokenid,
      {
        gasLimit: 290000   //1000000000
        // maxPriorityFeePerGas: priorityFee
      })
 

  })
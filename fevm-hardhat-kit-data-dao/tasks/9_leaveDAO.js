
const { task, types } = require("hardhat/config")
const ethers = require("ethers")
const util = require("util")
const request = util.promisify(require("request"))

task("leave-dao", "Leave Data DAO")
  // .addParam("nftcontract", "The address of the DealRewarder contract")
  .addParam("daocontract", "The address of the DealRewarder contract")
  .addOptionalParam("logs", "Print the logs", true, types.boolean)
  // .setAction(async ({nftcontract, daocontract}, { ethers }) => {
  .setAction(async ({ daocontract }, { ethers }) => {

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

    // const MembershipNFT = await ethers.getContractFactory("MembershipNFT")
    // console.log("Hello", signer.address)
    // const MembershipNFTContract = new ethers.Contract(nftcontract, MembershipNFT.interface, signer)

    // console.log("Minting Membership NFT ...");

    // await MembershipNFTContract.mint(signer.address, {
    //   gasLimit: 1000000000,
    //   maxPriorityFeePerGas: priorityFee
    // })

    const DataDAOExample = await ethers.getContractFactory("DataDAOExample")
    const DataDAOExampleContract = new ethers.Contract(daocontract, DataDAOExample.interface, signer)

    await DataDAOExampleContract.leaveDAO({
      gasLimit: 2000000  //20000005   //1000000000
      // maxPriorityFeePerGas: priorityFee
    })
 

    // if (is_dao_member === "You are not a member of DataDAO") {
    //   console.log(signer.address, "is a not member of the Data DAO");
    // } else {
    //   console.log(signer.address, "Welcome to Data DAO!!!");
    // }


  })
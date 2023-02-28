
const { task, types } = require("hardhat/config")
const ethers = require("ethers")
const util = require("util")
const request = util.promisify(require("request"))

task("transfer-nft", "transfer nft")
  .addParam("nftcontract", "The address of the NFT contract")
  .addParam("from", "from address")
  .addParam("to", "to address")
  .addParam("tokenid", "Token ID")
  .addOptionalParam("logs", "Print the logs", true, types.boolean)
  .setAction(async ({ nftcontract, from, to, tokenid }, { ethers }) => {

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
    console.log("from", from);
    console.log("to", to);
    const MembershipNFTContract = new ethers.Contract(nftcontract, MembershipNFT.interface, signer)

    console.log("Transferring NFT ...");

    const NFTCount = await MembershipNFTContract.transferNft(
      from,
      to,
      tokenid,
      {
        gasLimit: 2900005   //1000000000
        // maxPriorityFeePerGas: priorityFee
      })
    console.log(NFTCount);
    console.log("This Token ID should match the tokenId parameter: ", parseInt(NFTCount.value))

  })
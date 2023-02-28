require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")
 
const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

 
module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", wallet.address)
    // const chainId = network.config.chainId
    // const tokensToBeMinted = networkConfig[chainId]["tokensToBeMinted"]

    // //deploy Simplecoin
    // const SimpleCoin = await ethers.getContractFactory('SimpleCoin', wallet);
    // console.log('Deploying Simplecoin...');
    // const simpleCoin = await SimpleCoin.deploy(tokensToBeMinted);
    // await simpleCoin.deployed()
    // console.log('SimpleCoin deployed to:', simpleCoin.address);

    // //deploy FilecoinMarketConsumer
    // const FilecoinMarketConsumer = await ethers.getContractFactory('FilecoinMarketConsumer', wallet);
    // console.log('Deploying FilecoinMarketConsumer...');
    // const filecoinMarketConsumer = await FilecoinMarketConsumer.deploy();
    // await filecoinMarketConsumer.deployed()
    // console.log('FilecoinMarketConsumer deployed to:', filecoinMarketConsumer.address);

    // //deploy DealRewarder
    // const DealRewarder = await ethers.getContractFactory('DealRewarder', wallet);
    // console.log('Deploying DealRewarder...');
    // const dealRewarder = await DealRewarder.deploy();
    // await dealRewarder.deployed()
    // console.log('DealRewarder deployed to:', dealRewarder.address);

    ///////////////////////////////////////////

    // sc: membershipNFT
    const membershipNFT = await ethers.getContractFactory("MembershipNFT", wallet);
    console.log('Deploying MembershipNFT...');
    const membershipNFTContract = await membershipNFT.deploy({
        gasLimit: 29000005  // 20000005   //1000000000
        // maxPriorityFeePerGas: priorityFee
    });
    // const membershipNFTContract = await membershipNFT.deploy();
    await membershipNFTContract.deployed();
    console.log('MembershipNFT deployed to:', membershipNFTContract.address);


    // ///////////////////////////////////////////
    //  // // sc: data-dao

    // // var admins = '0xeA67cfe03d3f59B7dcD7B46CDf6Cf0C3d5089F12';
    // var admins = wallet.address;
    // var adminsList = []
    // let accountsDao = admins.split(',');
    // for (let i = 0; i < accountsDao.length; i++) {
    //     adminsList.push(accountsDao[i])
    // };

    // const dataDAO = await ethers.getContractFactory('DataDAO', wallet);
    // console.log('Deploying DataDAO...');
    // const dataDAOContract = await dataDAO.deploy(adminsList); 
    // // await dataDAOContract.deployed();
    // await dataDAOContract.deployed( {
    //     gasLimit: 200000054 // 20000005   //1000000000
    //     // maxPriorityFeePerGas: priorityFee
    // } );
    // console.log('dataDAOContract deployed to:', dataDAOContract.address);



    ///////////////////////////////////////////

    // // sc: data-dao-example
    
    // var admins = '0xeA67cfe03d3f59B7dcD7B46CDf6Cf0C3d5089F12';
    var admins = wallet.address;

    var adminsList = []
    let accounts = admins.split(',');
    for (let i = 0; i < accounts.length; i++) {
        adminsList.push(accounts[i])
    };

    // var membershipnftaddress = '0x57a9179d4725B4567aad572Ba62fA137B94217ca';
    // var membershipnftaddress = process.env.CONTRACT_ADDRESS_MembershipNFT;
    var membershipnftaddress = membershipNFTContract.address;
    console.log("membershipnftaddress: ", membershipnftaddress)
    
    if (!membershipnftaddress) {
        var { address: membershipnftaddress } = await run("deploy:membershipnft", { logs })
        membershipnftaddress = membershipnftaddress;
    }

    const dataDAOExample = await ethers.getContractFactory("DataDAOExample", wallet);
    console.log('Deploying dataDAOExample...');
    const dataDAOExampleContract = await dataDAOExample.deploy(adminsList, membershipnftaddress);
    await dataDAOExampleContract.deployed( {
        gasLimit: 29000005  // 20000005   //1000000000
        // maxPriorityFeePerGas: priorityFee
    } );
    console.log('dataDAOExampleContract deployed to:', dataDAOExampleContract.address);
 
}


// // sc: data-dao
 
// const { task, types } = require("hardhat/config")
// // const ethers = require("ethers")
// const util = require("util")
// const request = util.promisify(require("request"))
// const DEPLOYER_PRIVATE_KEY = network.config.accounts[0];

// task("deploy:membershipnft", "Deploy Membership NFT Contract")
//     .addOptionalParam("logs", "Print the logs", true, types.boolean)
//     .setAction(async ( { logs }, { ethers }) => {
//         console.log("Deploying Membership NFT Contract")

//         const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

//         async function callRpc(method, params) {
//             var options = {
//               method: "POST",
//               url: " https://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 jsonrpc: "2.0",
//                 method: method,
//                 params: params,
//                 id: 1,
//               }),
//             };
//             const res = await request(options);
//             return JSON.parse(res.body).result;
//         }

//         const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY)
//         console.log("Deployer's Address : ", deployer.address);

//         const membershipNFT = await ethers.getContractFactory("MembershipNFT")
    
//             const membershipNFTContract = await membershipNFT.deploy({
//                 gasLimit: 1000000000,
//                 maxPriorityFeePerGas: priorityFee
//             })
    
//             await membershipNFTContract.deployed()
    
//             if (logs) {
//                 console.info(`MembershipNFT contract has been deployed to: ${membershipNFTContract.address}`)
//             }

//             return membershipNFTContract

//     })

// task("deploy", "Deploy DataDAOExample contract")
//     .addOptionalParam("admins", "List of Admins separated by comma(,)")
//     .addOptionalParam("membershipnftaddress", "Membership NFT contract address", undefined, types.string)
//     .addOptionalParam("logs", "Print the logs", on1, types.boolean)
//     .setAction(async ( { admins, membershipnftaddress, logs }, { ethers }) => {
        
//         var adminsList = []
//         let accounts = admins.split(',');

//         for (let i = 0; i < accounts.length; i++) {
//             adminsList.push(accounts[i])
//         };

//         const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

//         async function callRpc(method, params) {
//             var options = {
//               method: "POST",
//               url: " https://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 jsonrpc: "2.0",
//                 method: method,
//                 params: params,
//                 id: 1,
//               }),
//             };
//             const res = await request(options);
//             return JSON.parse(res.body).result;
//         }

//         const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY)
//         console.log("Deployer's Address : ", deployer.address);

//         if (!membershipnftaddress) {
//             var { address: membershipnftaddress } = await run("deploy:membershipnft", { logs })
//             membershipnftaddress = membershipnftaddress;
//         }

//             console.log("Deploying DataDAOExample Contract")

//             const dataDAOExample = await ethers.getContractFactory("DataDAOExample")

//             const dataDAOExampleContract = await dataDAOExample.deploy(adminsList, membershipnftaddress, {
//                 gasLimit: 1000000000,
//                 maxPriorityFeePerGas: priorityFee
//             })
    
//             await dataDAOExampleContract.deployed()

//             if (logs) {
//                 console.info(`DataDAOExample contract has been deployed to: ${dataDAOExampleContract.address}`)
//             }

//             return dataDAOExampleContract

//     })
# Papaya

================
Overview


Papaya is a pay to view an image web app built on the Filecoin FEVM ecosystem.  It runs smart contracts on FEVM to facilitate access control 
and then displays an IPFS image on a website.


================
Installation


git clone https://github.com/srblabotw69/papaya

cd fevm-hardhat-kit-data-dao
yarn install

cd ..

cd fevm-hardhat-kit-data-dao-frontend
npm install

put wallet private key in "\fevm-hardhat-kit-data-dao\.env"
e.g.   PRIVATE_KEY=<WALLET KEY>

put wallet private key in "\fevm-hardhat-kit-data-dao-frontend\.env"
e.g.   REACT_APP_PRIVATE_KEY=<WALLET KEY>


================
Smart Contracts


The following three smart contracts were modified where appropriate and then deployed to FEVM:


Deploying DataDAO...
dataDAOContract deployed to: 0x409Ca92Af26DA7a7D5719082CbcBDD0c4172FA2f
Deploying MembershipNFT...
MembershipNFT deployed to: 0x57a9179d4725B4567aad572Ba62fA137B94217ca
Deploying dataDAOExample...
dataDAOExampleContract deployed to: 0xE0F7eAdD59681f2121DaB546a030C3da57fdb1eF
 

================
Resources


https://github.com/filecoin-project/fevm-hardhat-kit

https://github.com/rk-rishikesh/DataDAO



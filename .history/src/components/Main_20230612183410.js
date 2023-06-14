import React from 'react'
import { useContract, useContractRead, useContractWrite, useNFTs } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';

import { Menu } from './';

const Main = () => {
    // const { ethers } = require('ethers');
    const contractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const mintContractAddress = '0x43247D35a25d97ebe1360030b8Da2CE5Dfe7FAd6';
    const { contract } = useContract(contractAddress);
    const { mintContract } = useContract(mintContractAddress);
    console.log(contract);
    
    const { mutateAsync: adminMintTo, isLoading } = useContractWrite(mintContract, "adminMintTo")

    const call = async () => {
        try {
          const data = await adminMintTo({ args: [0x59d2366B5961a5686Af406A83Cf90615B4229f78] });
          console.info("contract call successs", data);
        } catch (err) {
          console.error("contract call failure", err);
        }
      }
    // const {data: lastID } = useContractRead(contract, "getLastTokenID");
    // // const tokenID = lastID.toNumber();
    // console.log(lastID.toNumber());
    // const {data: nft, isLoading2 } = useContractRead(contract, "tokenURI", [0]);
    // console.log(nft);


  return (
    <div id='main__content' className='main__content'>
      <Menu />
      <button onClick={call}>MINT</button>
      {/* {nfts && nfts.map((nft) => (
                    <div className='nft-flex' key={nft.metadata.id}>
                        <img src={nft.metadata.image} alt={nft.metadata.name} />
                        <h3>NFT #{nft.metadata.id}</h3>
                        <p>Owner: {nft.owner}</p>
                    </div>
                ))} */}
    </div>
  )
}

export default Main

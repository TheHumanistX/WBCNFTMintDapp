import React from 'react'
import { useContract, useContractRead, useNFTs } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import { Menu } from './';

const Main = () => {

    const contractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const { contract } = useContract(contractAddress);
    console.log(contract);

    const {data: lastID, isLoading } = useContractRead(contract, "getLastTokenID");
    console.log(lastID.toNumber());
    // const {data: nft, isLoading2 } = useContractRead(contract, "tokenURI", [0]);
    // console.log(nft);


  return (
    <div id='main__content' className='main__content'>
      <Menu />
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

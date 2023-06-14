import React from 'react'
import { useContract, useNFTs } from '@thirdweb-dev/react';
import ABI from '../ABI/ABI.json';
import { Menu } from './';

const Main = () => {

    const contractAddress = '0x82D4567Be6537d8eB92A547c81bEdA170d54b832';
    const { contract } = useContract(contractAddress, ABI);
    console.log(contract)
    // const { data: nfts } = useNFTs(contract);
    // console.log(nfts);

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
;
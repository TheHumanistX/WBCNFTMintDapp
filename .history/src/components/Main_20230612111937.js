import React from 'react'
import { useContract, useNFTs } from '@thirdweb-dev/react';
import ABI from '../ABI/ABI.json';
import { Menu } from './';

const Main = () => {

    const contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    const { contract } = useContract(contractAddress);
    const { data: nfts } = useNFTs(contract);
    console.log(JSON.stringify(nfts));

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

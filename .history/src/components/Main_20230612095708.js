import React from 'react'
import { useContract, useNFTs } from '@thirdweb-dev/react';
import ABI from '../ABI/ABI.json';
import { Menu } from './';

const Main = () => {
  return (
    <div id='main__content' className='main__content'>
      <Menu />
      {nfts && nfts.map((nft) => (
                    <div className='nft-flex' key={nft.metadata.id}>
                        <img src={nft.metadata.image} alt={nft.metadata.name} />
                        <h3>Bored Ape #{nft.metadata.id}</h3>
                        <p>Owner: {nft.owner}</p>
                    </div>
                ))}
    </div>
  )
}

export default Main

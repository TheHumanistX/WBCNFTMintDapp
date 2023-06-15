import React from 'react'
import { useContract, useContractRead } from '@thirdweb-dev/react';

const MintBox = ({ crazyFacesContract, mintContract, WBCContract }) => {

    // console.log("WBC Contract: ", WBCContract);
    // console.log("Crazy Faces Contract: ", crazyFacesContract);
    // console.log("Mint Contract: ", mintContract);
    const { data: mintPrice } = useContractRead(mintContract, 'getPrice');
    console.log('Price: ', mintPrice)
  const mintCrazyFace = () => {
    console.log('MINTING CRAZY FACE');
  }

  return (
    <div className='mintbox__container'>
      <h1>READY TO MINT??</h1>
      <h2>WBC BALANCE: </h2>
      <h2>MINT COST: </h2>
      <h2>ABLE TO MINT: </h2>
      <button className='mint-button' onClick={mintCrazyFace()}>MINT</button>
    </div>
  )
}

export default MintBox

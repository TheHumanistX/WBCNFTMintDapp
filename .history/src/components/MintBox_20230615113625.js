import React from 'react'
import { ethers } from 'ethers';
import { useContract, useContractRead } from '@thirdweb-dev/react';

const MintBox = ({ crazyFacesContract, mintContract, WBCContract, walletAddress }) => {

    // console.log("WBC Contract: ", WBCContract);
    // console.log("Crazy Faces Contract: ", crazyFacesContract);
    // console.log("Mint Contract: ", mintContract);
    const { data } = useContractRead(mintContract, 'getPrice');
    const mintPrice = data ? (data / 1e18).toLocaleString() : '';
    console.log('Price: ', mintPrice)
    const { data: balance } = useContractRead(WBCContract, "balanceOf", [walletAddress]);
    const balanceOfWBC = balance ? (balance / 1e18).toLocaleString() : '';
  const mintCrazyFace = () => {
    console.log('MINTING CRAZY FACE');
  }

  return (
    <div className='mintbox__container'>
      <h1>READY TO MINT??</h1>
      <h2>WBC BALANCE: </h2>
      <h2>MINT COST: {mintPrice} WBC </h2>
      <h2>ABLE TO MINT: </h2>
      <button className='mint-button' onClick={mintCrazyFace()}>MINT</button>
    </div>
  )
}

export default MintBox

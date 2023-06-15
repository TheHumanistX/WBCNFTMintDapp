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
  console.log('Parse Balance: ', parseInt(balance / 1e18))
  const balanceOfWBC = balance ? parseInt(balance / 1e18) : '';
  console.log('Balance: ', balanceOfWBC)
  console.log('Balance of WBC: ', typeof(parseInt(balanceOfWBC, balanceOfWBC.length - 1)))
  const mintCrazyFace = () => {
    console.log('MINTING CRAZY FACE');
  }

  const canMint = () => {
    if (balanceOfWBC && balanceOfWBC >= 100) {
      return ('YES')
    } else {
      return ('NO')
    }
  }

  return (
    <div className='mintbox__container'>
      <h1>READY TO MINT??</h1>
      <h2>WBC BALANCE: {balanceOfWBC.toLocaleString()} WBC</h2>
      <h2>MINT COST: {mintPrice} WBC </h2>
      <h2>ABLE TO MINT: {canMint()}</h2>
      <button className='mint-button' onClick={mintCrazyFace()}>MINT</button>
    </div>
  )
}

export default MintBox;

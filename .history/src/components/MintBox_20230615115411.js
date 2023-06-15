import React from 'react'
import { ethers } from 'ethers';
import { useContract, useContractRead } from '@thirdweb-dev/react';

const MintBox = ({ crazyFacesContract, mintContract, WBCContract, walletAddress }) => {

  const { data } = useContractRead(mintContract, 'getPrice');
  const mintPrice = data ? (data / 1e18).toLocaleString() : '';
  
  const { data: balance } = useContractRead(WBCContract, "balanceOf", [walletAddress]);
  
  const balanceOfWBC = balance ? parseInt(balance / 1e18) : '';

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
      <h1 className='mintbox__title'>READY TO MINT??</h1>
      <div className='mintbox__flex'>
      <h2>WBC BALANCE: {balanceOfWBC.toLocaleString()} WBC</h2>
      <h2>MINT COST: {mintPrice} WBC </h2>
      <h2>ABLE TO MINT: {canMint()}</h2>
      <button className='mint-button' onClick={mintCrazyFace()}>MINT</button>
      </div>
    </div>
  )
}

export default MintBox;

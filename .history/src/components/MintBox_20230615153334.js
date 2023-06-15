import React from 'react'
import { ethers } from 'ethers'
import { useContractRead, useContractWrite } from '@thirdweb-dev/react';

const MintBox = ({ mintContractAddress, mintContract, WBCContract, walletAddress }) => {
  
  const { data: mintPriceBigNumber } = useContractRead(mintContract, 'getPrice');
  console.log('MintBoxBigNUmber: ' + mintPriceBigNumber);
  const mintPrice = mintPriceBigNumber ? parseInt(ethers.utils.formatEther(mintPriceBigNumber)).toLocaleString() : '';
  
  const { data: balance } = useContractRead(WBCContract, "balanceOf", [walletAddress]);
  
  const balanceOfWBC = balance ? parseInt(ethers.utils.formatEther(balance)) : '';

  
  const { mutateAsync: buyNFTs } = useContractWrite(mintContract, "buyNFTs");
  const { mutateAsync: approve, isLoading } = useContractWrite(WBCContract, "approve");

  const canMintCrazyFace = balanceOfWBC && balanceOfWBC >= mintPrice ? true : false;

  const callToMint = async () => {
    let approval;
    try {
        approval = await approve({ args: [mintContractAddress, mintPriceBigNumber] });
        console.log("wbc amount approval success", approval);
        console.log("approval status", approval.receipt.status)
    } catch (err) {
        console.log("wbc amount approval failure", err);
    }

    if (approval && approval.receipt.status === 1) {
        try {
            const data = await buyNFTs({ args: [1] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }
}

  const mintHandler = () => {
    // Check if user can mint
    if (canMintCrazyFace) {
        // Log minting action
        console.log('Minting...')
        // Return button element to mint token
        return (
            <button className='mint-crazyface' onClick={ callToMint }>MINT</button>
        )
    }

    // If user cannot mint, return disabled button
    return (
        <button className='mint-crazyface cannotMint' disabled>MINT</button>
    )
}

  return (
    <div className='mintbox__container'>
      <h1 className='mintbox__title'>READY TO MINT??</h1>
      <div className='mintbox__flex'>
      <span>WBC BALANCE: {balanceOfWBC.toLocaleString()} WBC</span>
      <span>MINT COST: {mintPrice} WBC </span>
      <span>ABLE TO MINT: {canMintCrazyFace ? 'YES' : 'NO'}</span>
      {mintHandler()}
      </div>
    </div>
  )
}

export default MintBox;

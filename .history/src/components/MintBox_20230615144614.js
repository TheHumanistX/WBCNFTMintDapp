import React from 'react'
import { ethers } from 'ethers'
import { useContractRead, useContractWrite } from '@thirdweb-dev/react';

const MintBox = ({ crazyFacesContract, mintContract, WBCContract, walletAddress }) => {
  
  const { data } = useContractRead(mintContract, 'getPrice');
  const mintPrice = data ? parseInt(ethers.utils.formatEther(data)).toLocaleString() : '';
  console.log('mintPrice: ', mintPrice);
  
  const { data: balance } = useContractRead(WBCContract, "balanceOf", [walletAddress]);
  
  const balanceOfWBC = balance ? parseInt(ethers.utils.formatEther(balance)) : '';
  console.log('balanceOfWBC: ', balanceOfWBC);
  
  const { mutateAsync: adminMintTo } = useContractWrite(mintContract, "adminMintTo");
  const { mutateAsync: approve, isLoading } = useContractWrite(WBCContract, "approve");

  const canMintCrazyFace = balanceOfWBC && balanceOfWBC >= mintPrice ? true : false;

  const WBCMintAmount = mintPrice.toString();
  const WBCAmountWithDecimals = ethers.utils.parseEther(WBCMintAmount);
  
  const callToMint = async () => {
    try {
      const approval = await approve({ args: [mintContract, WBCAmountWithDecimals] });
      console.log("wbc amount approval success", approval);
    } catch (err) {
      console.log("wbc amount approval failure", err);
    }
    try {
      const data = await adminMintTo({ args: [walletAddress] });
        console.info("contract call successs", data);
    } catch (err) {
        console.error("contract call failure", err);
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

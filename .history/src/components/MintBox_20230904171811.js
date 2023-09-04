import React, { useCallback } from 'react'
import { ethers } from 'ethers'
import { useNft, useToken } from '../context'
import { useContract } from '../hooks/useContract';

const MintBox = () => {

  const { mintContract, mintContractAddress } = useNft();
  const { formattedTokenBalance, tokenContract } = useToken();

      const fetchMintPrice = useCallback(async () => {

        if (mintContract) {
          const mintPriceBigNumber = await mintContract['getWBCPrice()']();
          if (!mintPriceBigNumber) {
            console.error("Failed to get mint price");
            return;
          }
          const mintPrice = mintPriceBigNumber ? parseInt(ethers.utils.formatEther(mintPriceBigNumber)).toLocaleString() : '';
          return {mintPriceBigNumber, mintPrice};

        }
      },[mintContract]);

      const { mintPriceBigNumber, mintPrice } = useContract(mintContract, fetchMintPrice);

  const canMintCrazyFace = formattedTokenBalance && formattedTokenBalance >= mintPrice ? true : false;

  const callToMint = async () => {
    console.log('Entered callToMint...')
    console.log('callToMint mintPriceBigNumber: ', mintPriceBigNumber)
    let approval;
    console.log('tokenContract: ', tokenContract)
    try {
      const approvalResponse = await tokenContract.approve(mintContractAddress, mintPriceBigNumber);
      const approvalReceipt = await approvalResponse.wait();
      console.log("wbc amount approval success", approvalReceipt);
      console.log("Approval status", approvalReceipt.status);
      if (approvalReceipt.status === 1) {
        approval = approvalReceipt;
      } else {
        console.log("Approval transaction failed");
      }
    } catch (err) {
      console.log("ERC20 amount approval failure", err);
    }

    if (approval) {
      try {
        console.log('Minting...')
        const transactionResponse = await mintContract.buyNFTs(1);
        const transactionReceipt = await transactionResponse.wait();
        console.info("Contract call success", transactionReceipt);
      } catch (err) {
        console.error("NFT mint failure", err);
      }
    }
  }

  const mintHandler = () => {
    // Check if user can mint
    if (canMintCrazyFace) {

      // Return button element to mint token
      return (
        <button className='mint-crazyface' onClick={callToMint}>MINT</button>
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
        <span>WBC BALANCE: {formattedTokenBalance} WBC</span>
        <span>MINT COST: {mintPrice} WBC </span>
        <span>ABLE TO MINT: {canMintCrazyFace ? 'YES' : 'NO'}</span>
        {mintHandler()}
      </div>
    </div>
  )
}

export default MintBox;

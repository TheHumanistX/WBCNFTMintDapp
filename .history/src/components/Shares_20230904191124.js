import React, { useCallback } from 'react'
import { useEthers, useNft } from '../context';
import { useContract } from '../hooks/useContract';

const Shares = () => {

  const { walletAddress } = useEthers()
  const { mintContract } = useNft()
   
    const getSharesData = useCallback(async () => {
      if (mintContract) {
        const totalShares = await mintContract.totalShares();
        const walletShares = await mintContract.shares(walletAddress);
        return {totalShares, walletShares};
      }
    }, [mintContract, walletAddress]);

    const {totalShares, walletShares} = useContract(mintContract, getSharesData);

  const totalSharesHeld = totalShares ? parseInt(totalShares) : '';
  const walletSharesHeld = walletShares ? parseInt(walletShares) : '';
  const percentHeld = walletShares ? (walletSharesHeld / totalSharesHeld) * 100 : '';

  return (
    <div className='shares__container'>
      <span>Total Shares Held: {totalSharesHeld}</span>
      <span>Wallet Shares Held: {walletSharesHeld}</span>
      <span>Percentage Held By You: {percentHeld}%</span>
    </div>
  )
}

export default Shares

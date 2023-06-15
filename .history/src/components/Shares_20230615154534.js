import React from 'react'
import { useContractRead } from '@thirdweb-dev/react';

const Shares = ({ mintContract, walletAddress }) => {

  const { data: totalShares } = useContractRead(mintContract, 'totalShares');
  const { data: walletShares } = useContractRead(mintContract, 'shares', [walletAddress]);

  const totalSharesHeld = totalShares ? parseInt(totalShares) : '';
  const walletSharesHeld = walletShares ? parseInt(walletShares) : '';

  return (
    <div className='shares__container'>
      <span>Total Shares Held: {totalSharesHeld}</span>
      <span>Wallet Shares Held: {walletSharesHeld}</span>
      <span>Percentage Held By You: {(walletSharesHeld / totalSharesHeld) * 100}%</span>
    </div>
  )
}

export default Shares

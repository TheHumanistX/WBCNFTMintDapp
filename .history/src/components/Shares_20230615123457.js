import React from 'react'
import { useContractRead } from '@thirdweb-dev/react';

const Shares = ({ mintContractAddress, walletAddress }) => {
  
    const { data: totalShares } = useContractRead(mintContractAddress, 'totalShares');
    const { data: walletShares } = useContractRead(mintContractAddress, 'shares', [walletAddress]);
    const totalSharesHeld = totalShares ? totalShares : '';
    const walletSharesHeld = walletShares ? walletShares : '';
    console.log('Total Shares Held: ', totalSharesHeld);
    console.log('Wallet Shares Held: ', walletSharesHeld);
  
    return (
    <div className='shares__container'>
      <span>Total Shares Held: </span>
      <span>Wallet Shares Held: </span>
    </div>
  )
}

export default Shares

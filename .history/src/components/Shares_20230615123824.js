import React from 'react'
import { useContractRead } from '@thirdweb-dev/react';

const Shares = ({ mintContract, walletAddress }) => {
  
    const { data: totalShares } = useContractRead(mintContract, 'totalShares');
    const { data: walletShares } = useContractRead(mintContract, 'shares', [walletAddress]);
    console.log('totalShares type: ', typeof(totalShares));
    console.log('walletShares type: ', typeof(walletShares));
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

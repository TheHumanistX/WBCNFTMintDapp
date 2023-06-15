import React from 'react'
import { useContractRead } from '@thirdweb-dev/react';

const Shares = ({ crazyFacesContract, walletAddress }) => {
  
    const totalSharesHeld = useContractRead(crazyFacesContract, 'totalShares');
    const walletSharesHeld = useContractRead(crazyFacesContract, 'shares', [walletAddress]);
  
    return (
    <div className='shares__container'>
      <span>Total Shares Held: </span>
      <span>Wallet Shares Held: </span>
    </div>
  )
}

export default Shares

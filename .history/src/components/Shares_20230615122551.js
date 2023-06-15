import React from 'react'
import { useContractRead } from '@thirdweb-dev/react';

const Shares = ({ crazyFacesContract, walletAddress }) => {
  
    const totalSharesHeld = useContractRead(crazyFacesContract, 'totalShares');
    const walletSharesHeld = useContractRead(crazyFacesContract, 'shares', [walletAddress]);
  
    return (
    <div className='shares__container'>
      
    </div>
  )
}

export default Shares

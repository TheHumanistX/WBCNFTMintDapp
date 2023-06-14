import React from 'react'
import { useAddress, useChain } from '@thirdweb-dev/react';

const MintWBCBox = () => {

    const walletAddress = useAddress();
    const currentChain = useChain();

  return (
    <div className='mintwbcbox__container'>
        
    </div>
  )
}

export default MintWBCBox

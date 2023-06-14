import React from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';

const LastMinted = ({ contract }) => {

    const contractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const { contract } = useContract(contractAddress);

  return (
    <div className='last-minted__container'>
      Last Minted:

    </div>
  )
}

export default LastMinted

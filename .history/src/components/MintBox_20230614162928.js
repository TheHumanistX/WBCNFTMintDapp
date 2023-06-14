import React from 'react'
import { useContract } from '@thirdweb-dev/react';

const MintBox = ({ crazyFacesContract, mintContract, WBCContract }) => {
    const WBCContractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const crazyFacesContractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const mintContractAddress = '0x43247D35a25d97ebe1360030b8Da2CE5Dfe7FAd6';
    const { contract: WBCContract } = useContract(WBCContractAddress);
    const { contract: crazyFacesContract } = useContract(crazyFacesContractAddress);
    const { contract: mintContract } = useContract(mintContractAddress);

    console.log("WBC Contract: ", WBCContract);
    console.log("Crazy Faces Contract: ", crazyFacesContract);
    console.log("Mint Contract: ", mintContract);


  return (
    <div className='mintbox__container'>
      
    </div>
  )
}

export default MintBox

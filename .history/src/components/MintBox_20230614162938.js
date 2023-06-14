import React from 'react'
import { useContract } from '@thirdweb-dev/react';

const MintBox = ({ crazyFacesContract, mintContract, WBCContract }) => {

    console.log("WBC Contract: ", WBCContract);
    console.log("Crazy Faces Contract: ", crazyFacesContract);
    console.log("Mint Contract: ", mintContract);


  return (
    <div className='mintbox__container'>
      
    </div>
  )
}

export default MintBox

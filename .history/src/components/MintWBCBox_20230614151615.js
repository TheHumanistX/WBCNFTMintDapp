import React from 'react'
import { useAddress, useChain } from '@thirdweb-dev/react';
import OpenSea from '../assets';

const MintWBCBox = () => {

    const walletAddress = useAddress();
    const currentChain = useChain();
    console.log("Wallet Address: ", walletAddress);
    console.log("Current Chain: ", currentChain);
    // create a new variable that is the first 5 characters and last 3 characters of walletAddress with '...' in the middle
    const shortWalletAddress = walletAddress ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}` : null;
    console.log("Short Wallet Address: ", shortWalletAddress);


    return (
        <div className='mintwbcbox__container'>
            <div className='chain__name'>
                CHAIN: <span>{currentChain ? currentChain.name : 'NOT CONNECTED'} </span>
            </div>
            <div className='wallet__address'>
                WALLET: <spam>{walletAddress ? shortWalletAddress : 'NO WALLET CONNECTED'}</spam>
            </div>
            <button className='mint-wbc'>MINT WBC</button>
            <div className='opensea__container'>
                CHECKOUT CRAZYFACES ON:
            </div>
            <a href="https://testnets.opensea.io/collection/crazyfaces-2"><img src={OpenSea} alt='OpenSea Logo' /></a>
        </div>
    )
}

export default MintWBCBox

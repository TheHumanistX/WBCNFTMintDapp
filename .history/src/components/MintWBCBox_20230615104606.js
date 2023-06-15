import React from 'react'
import { useChain, useContractRead } from '@thirdweb-dev/react';
import { OpenSea } from '../assets';

const MintWBCBox = ({ walletAddress, WBCContractAddress }) => {

    
    const currentChain = useChain();
    const { data: canMint } = useContractRead(WBCContractAddress, "checkIfUserCanMint", [walletAddress]);
    // console.log("Wallet Address: ", walletAddress);
    // console.log("Current Chain: ", currentChain);
    // create a new variable that is the first 5 characters and last 3 characters of walletAddress with '...' in the middle
    const shortWalletAddress = walletAddress ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}` : null;
    // console.log("Short Wallet Address: ", shortWalletAddress);


    return (
        <div className='mintwbcbox__container'>
            <div>
            <div className='chain__name'>
                CURRENT CHAIN: <span>{currentChain ? currentChain.name : 'NOT CONNECTED'} </span>
            </div>
            <div className='wallet__address'>
                WALLET: <span>{walletAddress ? <a href={'https://goerli.etherscan.io/address/' + walletAddress}>{shortWalletAddress}</a> : 'NO WALLET CONNECTED'}</span>
            </div>
            </div>
            <a href="#" className='mint-wbc'>MINT WBC</a>
            <div>
            <div className='opensea__container'>
                CHECKOUT CRAZYFACES ON:
            </div>
            <a href="https://testnets.opensea.io/collection/crazyfaces-2"><img src={OpenSea} alt='OpenSea Logo' className='opensea-logo' /></a>
            </div>
        </div>
    )
}

export default MintWBCBox

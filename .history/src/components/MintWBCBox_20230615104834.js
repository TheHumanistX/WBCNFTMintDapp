import React from 'react'
import { useChain, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { OpenSea } from '../assets';

const MintWBCBox = ({ walletAddress, WBCContractAddress }) => {


    const currentChain = useChain();
    const { data: canMint } = useContractRead(WBCContractAddress, "checkIfUserCanMint", [walletAddress]);
    // console.log("Wallet Address: ", walletAddress);
    // console.log("Current Chain: ", currentChain);
    // create a new variable that is the first 5 characters and last 3 characters of walletAddress with '...' in the middle
    const shortWalletAddress = walletAddress ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}` : null;
    // console.log("Short Wallet Address: ", shortWalletAddress);


     // Get mint function from the contract
     const { mutateAsync: mint, isLoading } = useContractWrite(WBCContractAddress, "mint")

     // Define function to call mint function in the contract
     const callToMint = async () => {
         try {
             const data = await mint([walletAddress]);
             console.info("contract call successs", data);
         } catch (err) {
             console.error("contract call failure", err);
         }
     }

    // Define mint handler function which returns button element depending on canMint status
    const mintHandler = () => {
        // Check if user can mint
        if (canMint) {
            // Log minting action
            console.log('Minting...')
            // Return button element to mint token
            return (
                <button className='mint-wbc' onClick={callToMint}>MINT</button>
            )
        }

        // If user cannot mint, return disabled button
        return (
            <button className='mintbox__button-mint cannotMint' disabled>MINT</button>
        )
    }

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
                {mintHandler()}
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

import React from 'react'
import { useChain, useContractRead, useContractWrite, useSwitchChain } from '@thirdweb-dev/react';
import { OpenSea } from '../assets';

const MintWBCBox = ({ walletAddress, WBCContract }) => {


    const currentChain = useChain();
    const switchChain = useSwitchChain();
    const { data: canMintWBC } = useContractRead(WBCContract, "checkIfUserCanMint", [walletAddress]);

    const shortWalletAddress = walletAddress ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}` : null;

    // Get mint function from the contract
    const { mutateAsync: mint } = useContractWrite(WBCContract, "mint")

    // Define function to call mint function in the contract
    const callToMint = async () => {
        try {
            const data = await mint([walletAddress]);
        } catch (err) {
        }
    }

    // Define mint handler function which returns button element depending on canMintWBC status
    const mintHandler = () => {
        // Check if user can mint
        if (canMintWBC) {
            // Return button element to mint token
            return (
                <button className='mint-wbc' onClick={callToMint}>MINT WBC</button>
            )
        }

        // If user cannot mint, return disabled button
        return (
            <button className='mint-wbc cannotMint' disabled>MINT WBC</button>
        )
    }

    // create a function that will check that the current chain is Goerli, if it is not then create a link to switch the chain to Goerli using `switchChain(Goerli.chainId)`
    const switchToGoerli = () => {

        if (currentChain && currentChain.chainId !== 5) {
            return (
                <span className='switch-to-goerli' onClick={() => switchChain(5)}>SWITCH TO GOERLI</span>
            )
        } else {
            return (
                <span>{currentChain && currentChain.name}</span>
            )
        }
    }




    return (
        <div className='mintwbcbox__container'>
            <div>
                <div className='chain__name'>
                    CURRENT CHAIN:&nbsp;&nbsp; {switchToGoerli()}
                </div>
                <div className='wallet__address'>
                    WALLET:&nbsp;&nbsp; <span>{walletAddress ? <a href={'https://goerli.etherscan.io/address/' + walletAddress}>{shortWalletAddress}</a> : 'NO WALLET CONNECTED'}</span>
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

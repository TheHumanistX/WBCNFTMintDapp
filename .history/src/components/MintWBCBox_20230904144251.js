import React, { useCallback } from 'react'
import { useEthers, useToken } from '../context'
import { OpenSea } from '../assets';

const MintWBCBox = () => {

    const { chainName, network, walletAddress } = useEthers();
    const { canMintERC20, tokenContract } = useToken();

    const shortWalletAddress = walletAddress ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}` : null;

    // Define function to call mint function in the contract
    const callToMint = async () => {
        try {
            const transaction = await tokenContract.mint();
            const transactionReceipt = await transaction.wait()
            if (transactionReceipt) {
                console.log("ERC20 Mint Successful", transaction);
            }
        } catch (err) {
            console.error("ERC20 Mint Failure", err.message);
        }
    }

    // Define mint handler function which returns button element depending on canMintWBC status
    const mintHandler = () => {
        // Check if user can mint
        if (canMintERC20) {
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
  
    const handleSwitchToGoerli = async () => {
        if (network && network.chainId !== 5) {
            try {
                // Request user to switch to the Goerli network
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x5' }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        // Add Goerli network
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x5',
                                chainName: 'Goerli',
                                nativeCurrency: {
                                    name: 'ETH',
                                    symbol: 'ETH',
                                    decimals: 18
                                },
                                rpcUrls: ['https://goerli.infura.io/v3/your-infura-project-id'],
                                blockExplorerUrls: ['https://goerli.etherscan.io']
                            }],
                        });
                    } catch (addError) {
                        // Handle error while adding the network
                        console.error(addError.message);
                    }
                }
                // handle other "switch" error
                else {
                    console.error(switchError.message);
                }
            }
        }
    };



    return (
        <div className='mintwbcbox__container'>
            <div>
                <div className='chain__name'>
                    CURRENT CHAIN:&nbsp;&nbsp; {chainName && chainName !== "goerli" ? <span
                        className='switch-to-goerli'
                        onClick={handleSwitchToGoerli}
                    >
                        SWITCH TO GOERLI
                    </span>
                        :
                        <span>Goerli</span>}
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

export default MintWBCBox;

import React from 'react'
import { ConnectWallet, useAddress, useContract, useContractRead } from '@thirdweb-dev/react';

import { LastMinted, MintBox, MintWBCBox, RecentMints, Shares } from './';

const Main = () => {
    
    const crazyFacesContractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const mintContractAddress = '0x43247D35a25d97ebe1360030b8Da2CE5Dfe7FAd6';
    const WBCContractAddress = '0xFB29697113015019c42E90fdBC94d9B4898D2602';
    const walletAddress = useAddress();
    const { contract: crazyFacesContract } = useContract(crazyFacesContractAddress);
    const { contract: mintContract } = useContract(mintContractAddress);
    const { contract: WBCContract } = useContract(WBCContractAddress);
    
  
    const { data } = useContractRead(crazyFacesContract, "getLastTokenID");
    const lastID = data ? data.toNumber() : '';

    console.log('Last Minted Token ID: ', lastID)

    return (
        <div id='main__content' className='main__content-grid'>
            <MintBox 
            crazyFacesContract={ crazyFacesContract }
            mintContract={ mintContract }
            WBCContract={ WBCContract }
            walletAddress={ walletAddress }
            />
            <div className='main__title'>
                <div className='main__title-one'>
                    <span className='title__one'>CRAZY</span>
                </div>
                <div className='main__title-two'>
                    <span className='title__two'>FACES</span>
                </div>
            </div>
            <div className='connect-wallet__container'>
                <ConnectWallet className='connect-wallet' />
            </div>
            <LastMinted 
            crazyFacesContract={ crazyFacesContract } 
            lastID={ lastID } 
            />
            <MintWBCBox 
            walletAddress={ walletAddress } 
            WBCContract={ WBCContract } 
            />
            <RecentMints 
            crazyFacesContract={ crazyFacesContract } 
            />
            <Shares 
            mintContractAddress={ mintContractAddress } 
            walletAddress={ walletAddress}            
            />
        </div>
    )
}

export default Main

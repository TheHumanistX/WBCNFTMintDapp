import React from 'react'
import { ConnectWallet, useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';

import { LastMinted, MintBox, MintWBCBox, RecentMints } from './';

const Main = () => {
    
    const crazyFacesContractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const mintContractAddress = '0x43247D35a25d97ebe1360030b8Da2CE5Dfe7FAd6';
    const WBCContractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const walletAddress = useAddress();
    const { contract: crazyFacesContract } = useContract(crazyFacesContractAddress);
    const { contract: mintContract } = useContract(mintContractAddress);
    const { contract: WBCContract } = useContract(WBCContractAddress);

  
    const { data } = useContractRead(crazyFacesContract, "getLastTokenID");
    const lastID = data ? data.toNumber() : '';

    console.log('Last Minted Token ID: ', lastID)

    // const { data: nft, isLoading2 } = useContractRead(crazyFacesContract, "tokenURI", [lastID]);
    // console.log('MAIN nft: ', nft);

    return (
        <div id='main__content' className='main__content-grid'>
            <MintBox 
            crazyFacesContract={ crazyFacesContract }
            mintContract={ mintContract }
            WBCContract={ WBCContract }
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
            <LastMinted crazyFacesContract={ crazyFacesContract } lastID={ lastID } />
            {/* <div className='temp-class'>
                <h1>{nftData.name}</h1>
                <p>{nftData.description}</p>
                <img src={`https://ipfs.io/ipfs/${nftData.image.split('ipfs://')[1]}`} alt={nftData.name} />
                <ul>
                    {nftData.attributes.map((attr, index) => (
                        <li key={index}>
                            {attr.trait_type}: {attr.value}
                        </li>
                    ))}
                </ul>
            </div> */}
            <MintWBCBox walletAddress={walletAddress} WBCContract={WBCContract} />
            <RecentMints crazyFacesContract={ crazyFacesContract } />
        </div>
    )
}

export default Main

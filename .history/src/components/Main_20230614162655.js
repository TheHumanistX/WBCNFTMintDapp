import React, { useEffect, useState } from 'react'
import { ConnectWallet, useContract, useContractRead, useContractWrite, useNFTs } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';

import { LastMinted, MintBox, MintWBCBox, RecentMints } from './';

const Main = () => {

    const [nftData, setNftData] = useState(null);
    const [allNftData, setAllNftData] = useState([]);

    // const { ethers } = require('ethers');
    const contractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const mintContractAddress = '0x43247D35a25d97ebe1360030b8Da2CE5Dfe7FAd6';
    const WBCContractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const { contract: crazyFacesContract } = useContract(contractAddress);
    const { contract: mintContract } = useContract(mintContractAddress);
    const { contract: WBCContract } = useContract(WBCContractAddress);
    // const { mintContract } = useContract(mintContractAddress);
    console.log("Contract: ", mintContract);
    // console.log("Mint Contract: ", mintContract);
    const { data } = useContractRead(contract, "getLastTokenID");
    const lastID = data.toNumber();
    // // const tokenID = lastID.toNumber();
    console.log(`lastID: ${lastID ? lastID : ''}`);

    const { data: nft, isLoading2 } = useContractRead(contract, "tokenURI", [1]);
    console.log(nft);

    useEffect(() => {
        const ipfsUrl = (ipfsUrl) => {
            if (!ipfsUrl) return '';
            // Convert the ipfs URL to a HTTP URL
            return `https://ipfs.io/ipfs/${ipfsUrl.split('ipfs://')[1]}`;
        };

        const fetchNftData = async () => {

            if (nft) {
                const url = ipfsUrl(nft);
                const response = await fetch(url);
                const json = await response.json();
                setNftData(json);
            }
        };

        fetchNftData();
    }, [nft]);



    if (!nftData) return <div>Loading...</div>;
    return (
        <div id='main__content' className='main__content-grid'>
            <MintBox />
            <div className='main__title'>
                <div className='main__title-one'>
                    <span className='title__one'>CRAZY</span>
                </div>
                <div className='main__title-two'>
                    <span className='title__two'>FACES</span>
                </div>
            </div>
            <LastMinted crazyFacesContract={crazyFacesContract} />
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
            <div className='connect-wallet__container'>
                <ConnectWallet className='connect-wallet' />
            </div>
            <MintWBCBox />
            <RecentMints crazyFacesContract={crazyFacesContract} />
        </div>
    )
}

export default Main

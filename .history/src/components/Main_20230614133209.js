import React, { useEffect, useState } from 'react'
import { ConnectWallet, useContract, useContractRead, useContractWrite, useNFTs } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';

import { MintBox } from './';

const Main = () => {

    const [nftData, setNftData] = useState(null);
    const [allNftData, setAllNftData] = useState([]);

    // const { ethers } = require('ethers');
    const contractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const mintContractAddress = '0x43247D35a25d97ebe1360030b8Da2CE5Dfe7FAd6';
    const { contract } = useContract(contractAddress);
    const { contract: mintContract } = useContract(mintContractAddress);
    // const { mintContract } = useContract(mintContractAddress);
    console.log("Contract: ", mintContract);
    // console.log("Mint Contract: ", mintContract);
    const { data: lastID } = useContractRead(contract, "getLastTokenID");
    // // const tokenID = lastID.toNumber();
    console.log(`${lastID ? lastID.toNumber() : ''}`);

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
                    <span className='crazyface__one'>CRAZY</span>
                </div>
                <div className='main__title-two'>
                    <span className='crazyface__two'>FACES</span>
                </div>
            </div>
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
            <ConnectWallet className='connect-wallet' />

        </div>
    )
}

export default Main

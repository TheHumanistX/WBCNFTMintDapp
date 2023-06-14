import React, { useEffect, useState } from 'react'
import { useContract, useContractRead, useContractWrite, useNFTs } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';

import { Menu } from './';

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
        const fetchAllNftData = async () => {
          const ipfsUrl = (ipfsUrl) => {
            if (!ipfsUrl) return '';
            return `https://ipfs.io/ipfs/${ipfsUrl.split('ipfs://')[1]}`;
          };
      
          // This will store all token URIs
          const allNftURIs = [];
      
          // Get all tokenURIs
          for (let i = 1; i <= lastID; i++) {
            const { data: nft } = useContractRead(contract, "tokenURI", [i]);
            allNftURIs.push(nft);
          }
      
          // Now we have all the token URIs, we can fetch the metadata
          const allNftMetadataPromises = allNftURIs.map(async (nftURI) => {
            const url = ipfsUrl(nftURI);
            const response = await fetch(url);
            return response.json();
          });
      
          // Wait for all metadata to be fetched
          const allNftMetadata = await Promise.all(allNftMetadataPromises);
          setAllNftData(allNftMetadata);
        };
      
        if (lastID > 0) {
          fetchAllNftData();
        }
      }, [lastID, contract]);


    if (!nftData) return <div>Loading...</div>;
    return (
        <div id='main__content' className='main__content'>
            <Menu />
            <div className='temp-class'>
                {allNftData.map((nftData, index) => (
                    <div key={index}>
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
                    </div>
                ))}
            </div>
            {/* {nfts && nfts.map((nft) => (
                    <div className='nft-flex' key={nft.metadata.id}>
                        <img src={nft.metadata.image} alt={nft.metadata.name} />
                        <h3>NFT #{nft.metadata.id}</h3>
                        <p>Owner: {nft.owner}</p>
                    </div>
                ))} */}
        </div>
    )
}

export default Main

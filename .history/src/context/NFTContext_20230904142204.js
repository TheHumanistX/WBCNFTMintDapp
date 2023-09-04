import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { mintABI, nftABI } from '../abi'
import { NFT_CONTRACT_ADDRESS, MINTING_CONTRACT_ADDRESS, ETHEREUM_NULL_ADDRESS } from '../constants';

const NftContext = createContext();

export const NftProvider = ({ signer, children }) => {

    const [crazyFacesContract, setCrazyFacesContract] = useState(null);
    const [mintContract, setMintContract] = useState(null);

    const nftContractAddress = NFT_CONTRACT_ADDRESS;
    const mintingContractAddress = MINTING_CONTRACT_ADDRESS;
    const ETH_NULL_ADDRESS = ETHEREUM_NULL_ADDRESS;

    const updateContracts = async () => {
        const crazyFacesContract = new ethers.Contract(nftContractAddress, nftABI, signer);
        const mintContract = new ethers.Contract(mintingContractAddress, mintABI, signer);
        setCrazyFacesContract(crazyFacesContract);
        setMintContract(mintContract);
    }

    return (
        <NftContext.Provider value={{

        }}>
            {children}
        </NftContext.Provider>
    )
}

export const useNft = () => {
    return useContext(NftContext);
}
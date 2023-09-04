import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { mintABI, nftABI } from '../abi'
import { NFT_CONTRACT_ADDRESS, MINTING_CONTRACT_ADDRESS } from '../constants';

const NftContext = createContext();

export const NftProvider = ({ isSignerReady, signer, children }) => {

    const [isNftContractReady, setIsNftContractReady] = useState(false);

    const [crazyFacesContract, setCrazyFacesContract] = useState(null);
    const [mintContract, setMintContract] = useState(null);
    const [totalSupply, setTotalSupply] = useState(null);

    const nftContractAddress = NFT_CONTRACT_ADDRESS;
    const mintingContractAddress = MINTING_CONTRACT_ADDRESS;

    const updateContracts = async () => {
        const crazyFacesContract = new ethers.Contract(nftContractAddress, nftABI, signer);
        const mintContract = new ethers.Contract(mintingContractAddress, mintABI, signer);
        setCrazyFacesContract(crazyFacesContract);
        setMintContract(mintContract);
    }

    const updateNftData = async () => {

    }

    useEffect(() => {
        if (isSignerReady) {
            const setupContracts = async () => {
                try {
                    await updateContracts();
                } catch (err) {
                    if (err.code === 4001) {
                        // User rejected request
                        console.log("User rejected request")
                    } else {
                        console.error(err)
                    }
                }
            }
            setupContracts()
        }
    }, [isSignerReady])

    useEffect(() => {
        if (isNftContractReady) {
            const setupNftData = async () => {
                try {
                    await updateNftData();
                } catch (err) {
                    console.error(err)
                }
            }
            setupNftData()
        }

    }, [isNftContractReady])

    return (
        <NftContext.Provider value={{
            crazyFacesContract,
            mintContract,
        }}>
            {children}
        </NftContext.Provider>
    )
}

export const useNft = () => {
    return useContext(NftContext);
}
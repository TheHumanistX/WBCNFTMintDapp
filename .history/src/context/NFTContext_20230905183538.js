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
    const mintContractAddress = MINTING_CONTRACT_ADDRESS;

    const updateContracts = async () => {
        if (!signer) return false;
        const crazyFacesContract = new ethers.Contract(nftContractAddress, nftABI, signer);
        const mintContract = new ethers.Contract(mintContractAddress, mintABI, signer);
        setCrazyFacesContract(crazyFacesContract);
        setMintContract(mintContract);
        return true;
    }

    const updateNftData = async () => {
        const totalSupply = await crazyFacesContract.totalSupply();
        console.log('NFTContext - totalSupply: ', totalSupply.toNumber())
        setTotalSupply(totalSupply.toNumber());
    }

    useEffect(() => {
        console.log('NFTContext - isSignerReady: ', isSignerReady)
        if (isSignerReady) {
            const setupContracts = async () => {
                try {
                    const nftContractReady = await updateContracts();
                    if (nftContractReady) setIsNftContractReady(true)
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
                    console.log('NFTContext - crazyFacesContract: ', crazyFacesContract)
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
            mintContractAddress,
            totalSupply
        }}>
            {children}
        </NftContext.Provider>
    )
}

export const useNft = () => {
    return useContext(NftContext);
}
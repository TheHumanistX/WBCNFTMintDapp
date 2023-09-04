import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { mintABI, nftABI, tokenABI } from '../abi'
import { TOKEN_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, MINTING_CONTRACT_ADDRESS, ETHEREUM_NULL_ADDRESS } from '../constants';

const NftContext = createContext();

export const NftProvider = ({ children }) => {

    return(
        <NftContext.Provider value={{
            
        }}>
            {children}
        </NftContext.Provider>
    )
}

export const useNft = () => {
    return useContext(NftContext);
}
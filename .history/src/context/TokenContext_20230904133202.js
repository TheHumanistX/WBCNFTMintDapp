import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { tokenABI } from '../abi'
import { TOKEN_CONTRACT_ADDRESS, ETHEREUM_NULL_ADDRESS } from '../constants';

const TokenContext = createContext();



export const TokenProvider = ({ provider, signer, walletAddress, children }) => {
    return (
        <TokenContext.Provider value={{

        }}>
            {children}
        </TokenContext.Provider>
    )
}

export const useToken = () => {
    return useContext(TokenContext);
}
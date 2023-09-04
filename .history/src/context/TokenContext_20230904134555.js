import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { tokenABI } from '../abi'
import { TOKEN_CONTRACT_ADDRESS, ETHEREUM_NULL_ADDRESS } from '../constants';

const TokenContext = createContext();

export const TokenProvider = ({ provider, signer, walletAddress, children }) => {

    const [tokenContract, setTokenContract] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(null);
    const [formattedTokenBalance, setFormattedTokenBalance] = useState(null);
    const [decimals, setDecimals] = useState(null);
    const [canMint, setCanMint] = useState(false);

    const updateTokenContract = async (signer) => {
        const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenABI, signer);
        setTokenContract(tokenContract);
    }

    const updateTokenData = async () => {
        const decimals = await tokenContract.decimals();
        const tokenBalance = await tokenContract.balanceOf(walletAddress);
        const canMint = await tokenContract.checkIfUserCanMint(walletAddress);
        const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
        setDecimals(decimals);
        setTokenBalance(tokenBalance);
        setCanMint(canMint);
        setFormattedTokenBalance(formattedBalance);
    }

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
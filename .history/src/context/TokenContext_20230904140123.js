import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { tokenABI } from '../abi'
import { TOKEN_CONTRACT_ADDRESS, ETHEREUM_NULL_ADDRESS } from '../constants';

const TokenContext = createContext();

export const TokenProvider = ({ isSignerReady, provider, signer, walletAddress, children }) => {

    const [isTokenContractReady, setIsTokenContractReady] = useState(false);

    const [tokenContract, setTokenContract] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(null);
    const [formattedTokenBalance, setFormattedTokenBalance] = useState(null);
    const [decimals, setDecimals] = useState(null);
    const [canMint, setCanMint] = useState(false);

    const updateTokenContract = async () => {
        const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenABI, signer);
        setTokenContract(tokenContract);
    }

    const updateTokenData = async () => {
        const decimals = await tokenContract.decimals();
        const tokenBalance = await tokenContract.balanceOf(walletAddress);
        const canMintERC20 = await tokenContract.checkIfUserCanMint(walletAddress);
        const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
        setDecimals(decimals);
        setTokenBalance(tokenBalance);
        setCanMintERC20(canMintERC20);
        setFormattedTokenBalance(formattedBalance);
    }

    useEffect(() => {
        if (isSignerReady) {
            const setupTokenContract = async () => {
                try {
                    await updateTokenContract();
                    setIsTokenContractReady(true);
                } catch (err) {
                    if (err.code === 4001) {
                        // User rejected request
                        console.log("User rejected request")
                    } else {
                        console.error(err)
                    }
                }
            }
            setupTokenContract()
        }
    }, [isSignerReady])

    useEffect(() => {
        if (isTokenContractReady) {
            const setupTokenData = async () => {
                try {
                    updateTokenData();
                } catch (err) {
                    if (err.code === 4001) {
                        // User rejected request
                        console.log("User rejected request")
                    } else {
                        console.error(err)
                    }
                }
            }
            setupTokenData();
        }
    }, [isTokenContractReady])

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
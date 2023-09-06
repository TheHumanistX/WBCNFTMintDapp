import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ETHEREUM_NULL_ADDRESS, SUPPORTED_NETWORK_ID } from '../constants';
import { NftProvider, TokenProvider } from './';

const EthersContext = createContext();

export const EthersProvider = ({ setAppCanLoad, children }) => {

    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const [isProviderReady, setIsProviderReady] = useState(false);
    const [isSignerReady, setIsSignerReady] = useState(false);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [chainName, setChainName] = useState(null);
    const [network, setNetwork] = useState(null);

    const ETH_NULL_ADDRESS = ETHEREUM_NULL_ADDRESS;


    const updateProviderAndNetwork = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider?.getNetwork();

        if ( network?.chainId !== SUPPORTED_NETWORK_ID ) {
            setIsProviderReady(false)
            window.scrollTo(0, 0); 
            setAppCanLoad(false)
            return false;
        }

        setNetwork(network);
        setChainName(network ? network.name : null);
        setProvider(provider);
        return true;
    }

    const updateSignerAndAccount = async () => {
        if (!provider) return false;
        const signer = provider?.getSigner();
        const walletAddress = await signer?.getAddress();
        setSigner(signer);
        setWalletAddress(walletAddress);
        return true;
    }

    const handleChainChange = async (networkIdHex) => {
        const networkId = parseInt(networkIdHex, 16)

        if (networkId === SUPPORTED_NETWORK_ID) {
            setTriggerUpdate(prevState => !prevState);
            setIsProviderReady(false);
            setIsSignerReady(false);
            window.scrollTo(0, 0); 
            window.location.hash = "";
            window.location.reload()
        } else {
            setAppCanLoad(false)
        }

    };

    const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask.')
            alert('Your MetaMask is not connected anymore. Please unlock or reconnect.') 
            setWalletAddress(null)
            setSigner(null)
        } else if (accounts[0] !== walletAddress) {
            setTriggerUpdate(prevState => !prevState)
            setIsProviderReady(false)
            setIsSignerReady(false)
        }
    };

    useEffect(() => {
        window.ethereum.on('chainChanged', handleChainChange);
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Cleanup
        return () => {
            window.ethereum.removeListener('chainChanged', handleChainChange);
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);


    useEffect(() => {
        if (window.ethereum) {
            const setupProviderAndNetwork = async () => {
                try {
                    const providerReady = await updateProviderAndNetwork()
                    if (providerReady) setIsProviderReady(true);
                } catch (err) {
                    if (err.code === 4001) {
                        // User rejected request
                        console.log("User rejected request")
                    } else {
                        console.error(err)
                    }
                }
            }
            setupProviderAndNetwork()
        }
    }, [triggerUpdate])

    useEffect(() => {

        if (isProviderReady) {
            const setupSignerAndAccount = async () => {
                try {
                    console.log('EthersContext - Entered second try block in ethersDataSetup, right before setting up wallet.')
                    const signerReady = await updateSignerAndAccount(provider)
                    if (signerReady) setIsSignerReady(true);
                } catch (err) {
                    if (err.code === 4001) {
                        // User rejected request
                        console.log("User rejected request")
                    } else {
                        console.error(err)
                    }
                }
            }
            setupSignerAndAccount()
        }
    }, [isProviderReady])

    return (
        <EthersContext.Provider value={{
            chainName,
            ETH_NULL_ADDRESS,
            network,
            provider,
            signer,
            walletAddress,
        }}>
            <TokenProvider isSignerReady={isSignerReady} provider={provider} signer={signer} walletAddress={walletAddress}>
                <NftProvider isSignerReady={isSignerReady} provider={provider} signer={signer} walletAddress={walletAddress}>
                    {children}
                </NftProvider>
            </TokenProvider>
        </EthersContext.Provider>
    )
}


export const useEthers = () => {
    return useContext(EthersContext)
}
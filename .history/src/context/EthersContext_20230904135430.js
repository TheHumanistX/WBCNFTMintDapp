import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { mintABI, nftABI, tokenABI } from '../abi'
import { TOKEN_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, MINTING_CONTRACT_ADDRESS, ETHEREUM_NULL_ADDRESS } from '../constants';
import { TokenProvider } from './';

const EthersContext = createContext();

export const EthersProvider = ({ children }) => {

    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const [isProviderReady, setIsProviderReady] = useState(false);
    const [isSignerReady, setIsSignerReady] = useState(false);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [crazyFacesContract, setCrazyFacesContract] = useState(null);
    const [mintContract, setMintContract] = useState(null);
    const [chainName, setChainName] = useState(null);
    const [network, setNetwork] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(null);
    const [formattedTokenBalance, setFormattedTokenBalance] = useState(null);
    const [decimals, setDecimals] = useState(null);
    const [canMint, setCanMint] = useState(false);
    const tokenContractAddress = TOKEN_CONTRACT_ADDRESS;
    const nftContractAddress = NFT_CONTRACT_ADDRESS;
    const mintingContractAddress = MINTING_CONTRACT_ADDRESS;
    const ETH_NULL_ADDRESS = ETHEREUM_NULL_ADDRESS;

    const updateProviderAndNetwork = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        setNetwork(network);
        setChainName(network ? network.name : null);
        setProvider(provider);
    }

    const updateSignerAndAccount = async () => {
        const signer = provider.getSigner();
        const walletAddress = await signer.getAddress();
        setSigner(signer);
        setWalletAddress(walletAddress);
    }

    const handleChainChange = async (networkIdHex) => {
        const networkId = parseInt(networkIdHex, 16)

        if (networkId === 5) {
            setTriggerUpdate(prevState => !prevState);
            setIsProviderReady(false);
            setIsSignerReady(false);
            window.location.reload()
        } else {
            alert('Please switch to the Goerli network!')
        }

    };

    const handleAccountsChanged = async (accounts) => {
        console.log('EthersContext accountsChanged entered on account change...')
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask.');
            alert('Your MetaMask is not connected anymore. Please unlock or reconnect.'); // display an alert
            // handle account disconnection...
            setWalletAddress(null);
            setSigner(null);
        } else if (accounts[0] !== walletAddress) {
            setTriggerUpdate(prevState => !prevState);
            setIsProviderReady(false);
            setIsSignerReady(false);
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
                    await updateProviderAndNetwork()
                    setIsProviderReady(true);
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
                    await updateSignerAndAccount(provider)
                    setIsSignerReady(true);
                } catch (err) {
                    if (err.code === 4001) {
                        // User rejected request
                        console.log("User rejected request")
                    } else {
                        console.error(err)
                    }
                }
            }
            setupSignerAccountAndTokenContract()
        }
    }, [isProviderReady])

    useEffect(() => {
        const ethersDataSetup = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const network = await provider.getNetwork();
                setNetwork(network);
                setChainName(network ? network.name : null);
                setProvider(provider);

                if (networkId === 5) {
                    const signer = provider.getSigner();
                    const walletAddress = await signer.getAddress();
                    const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
                    const crazyFacesContract = new ethers.Contract(nftContractAddress, nftABI, signer);
                    const mintContract = new ethers.Contract(mintingContractAddress, mintABI, signer);
                    setSigner(signer);
                    setWalletAddress(walletAddress);
                    setCrazyFacesContract(crazyFacesContract);
                    setMintContract(mintContract);
                }
            }
            console.log('EthersContext initialized.... Ready for contract interactions....')
        };

        window.ethereum.on('chainChanged', (networkIdHex) => {
            const networkId = parseInt(networkIdHex, 16);
            ethersDataSetup(networkId);
            window.location.reload()
        });

        window.ethereum.on('accountsChanged', async (accounts) => {
            console.log('EthersContext accountsChanged entered on account change...')
            if (accounts.length === 0) {
                console.log('Please connect to MetaMask.');
                alert('Your MetaMask is not connected anymore. Please unlock or reconnect.'); // display an alert
                // handle account disconnection...
                setWalletAddress(null);
                setSigner(null);
            } else if (accounts[0] !== walletAddress) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log('EthersContext accountsChanged provider: ', provider)
                try {
                    const signer = await provider.getSigner();
                    const walletAddress = await signer.getAddress();
                    console.log('EthersContext walletAddress updated to: ', walletAddress)
                    setSigner(signer);
                    setWalletAddress(walletAddress);
                    window.location.reload()
                } catch (error) {
                    if (error.code === 4001) {
                        // User rejected request
                        console.log("User rejected request");
                        // Add some user-friendly notification logic here
                    } else {
                        console.error(error);
                        alert('Error when getting wallet address. Please check your MetaMask connection.');
                        setWalletAddress(null);
                        setSigner(null);
                    }
                }

            }
        });

        // Initial setup
        ethersDataSetup();
    }, [triggerUpdate]);

    return (
        <EthersContext.Provider value={{
            canMint,
            chainName,
            crazyFacesContract,
            decimals,
            ETH_NULL_ADDRESS,
            formattedTokenBalance,
            mintContract,
            network,
            provider,
            signer,
            tokenBalance,
            tokenContract,
            walletAddress,
        }}>
            <TokenProvider provider={provider} signer={signer} walletAddress={walletAddress}>
                {children}
            </TokenProvider>
        </EthersContext.Provider>
    )
}


export const useEthers = () => {
    const tokenContractData = useContext(EthersContext);
    return tokenContractData;
}
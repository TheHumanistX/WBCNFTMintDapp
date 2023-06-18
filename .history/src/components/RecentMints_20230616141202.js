import React, { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import { useContractEvents, useContractRead } from '@thirdweb-dev/react';
import abi from '../abi/abi';

const RecentMints = ({ crazyFacesContractAddress, lastID }) => {
    const [recentNFTTransactions, setRecentNFTTransactions] = useState({});
    const [crazyFacesContract, setCrazyFacesContract] = useState(null);


    const provider = useMemo(() => new ethers.providers.Web3Provider(window.ethereum), []);
    
    useEffect(() => {
        if(crazyFacesContractAddress && provider) {
            const contract = new ethers.Contract(crazyFacesContractAddress, abi, provider);
            setCrazyFacesContract(contract);
        }
    }, [crazyFacesContractAddress, provider]);

    useEffect(() => {
        const fetchRecentMints = async () => {
          if (lastID > 0 && crazyFacesContract) {
            let recentMints = {};
            for (let i = lastID - 1; i > lastID - 6; i--) {
              try {
                const owner = await crazyFacesContract.ownerOf(i);
                recentMints[i] = owner;
              } catch (error) {
                console.error("Failed to fetch owner", error);
              }
            }
            setRecentNFTTransactions(recentMints);
          }
        };
      
        fetchRecentMints();
      
      }, [lastID, crazyFacesContract]);
      

    // const { data: allTransferEvents } = useContractEvents(crazyFacesContract, "Transfer", {
    //     queryFilter: {
    //     fromBlock: 9168595,
    // },
    // subscribe: true,
    // });
    // const mintedToAddresses = allTransferEvents ? allTransferEvents.map(event => event.data ? event.data.to : null) : [];
    // console.log('mintedToAddresses.length', mintedToAddresses.length);
    // console.log('mintedToAddresses', mintedToAddresses);
    // const recentMints = mintedToAddresses.slice(0, 5);
    // console.log('recentMints',recentMints);

    // const getNftID = (index) => mintedToAddresses.length - index;


    return (
        <div className='recent-mints__container'>
            <div className='recent-mints__title'>
                RECENT TRANSACTIONS
            </div>
            {Object.entries(recentNFTTransactions).map(([nftID, owner], index) => (
      <div className='transaction__list' key={index}>
        <span><a href={'https://testnets.opensea.io/assets/goerli/0xf94a9747c20076d56f84320acf36431dae557fb7/' + nftID}>CRAZYFACE #{parseInt(nftID) + 1}</a></span>
        <p className='transaction__to'><a href={'https://goerli.etherscan.io/address/' + owner}>{owner}</a></p>
      </div>
    ))}
        </div>
    )
}

export default RecentMints

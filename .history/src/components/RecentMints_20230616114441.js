import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContractEvents, useContractRead } from '@thirdweb-dev/react';

const RecentMints = ({ crazyFacesContract, lastID }) => {
    const [recentNFTTransactions, setRecentNFTTransactions] = useState({});
    
    useEffect(() => {
        const fetchRecentMints = async () => {
          let recentMints = {};
          for (let i = lastID; i > lastID - 5; i--) {
            try {
              const owner = await crazyFacesContract.ownerOf(i);
              recentMints[i] = owner;
            } catch (error) {
              console.error("Failed to fetch owner", error);
            }
          }
          setRecentNFTTransactions(recentMints);
        };
    
        if (lastID) {
          fetchRecentMints();
        }
      }, [lastID, crazyFacesContract]);

    const { data: allTransferEvents } = useContractEvents(crazyFacesContract, "Transfer", {
        queryFilter: {
        fromBlock: 9168595,
    },
    subscribe: true,
    });
    const mintedToAddresses = allTransferEvents ? allTransferEvents.map(event => event.data ? event.data.to : null) : [];
    console.log('mintedToAddresses.length', mintedToAddresses.length);
    console.log('mintedToAddresses', mintedToAddresses);
    const recentMints = mintedToAddresses.slice(0, 5);
    console.log('recentMints',recentMints);

    const getNftID = (index) => mintedToAddresses.length - index;


    return (
        <div className='recent-mints__container'>
            <div className='recent-mints__title'>
                RECENT TRANSACTIONS
            </div>
            {recentMints.map((to, index) => (
                // `key` prop is required by React for optimal performance when rendering lists.
                // The transaction index and 'to' address are displayed for each transaction.
                <div className='transaction__list' key={index}>
                    <span><a href={'https://testnets.opensea.io/assets/goerli/0xf94a9747c20076d56f84320acf36431dae557fb7/' + (getNftID(index) - 1)}>CRAZYFACE #{getNftID(index)}</a></span>
                    <p className='transaction__to'><a href={'https://goerli.etherscan.io/address/' + to}>{to}</a></p>
                    {/* Displaying the transaction number, starting from the most recent transaction. */}
                </div>
            ))}
        </div>
    )
}

export default RecentMints

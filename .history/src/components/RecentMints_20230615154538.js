import React from 'react'
import { useContractEvents } from '@thirdweb-dev/react';

const RecentMints = ({ crazyFacesContract }) => {
    const { data: allTransferEvents } = useContractEvents(crazyFacesContract, "Transfer");
    const mintedToAddresses = allTransferEvents ? allTransferEvents.map(event => event.data ? event.data.to : null) : [];
    const recentMints = mintedToAddresses.slice(0, 5);

    const getNftID = (index) => mintedToAddresses.length - (mintedToAddresses.length - recentMints.length + index);


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

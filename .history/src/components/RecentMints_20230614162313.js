import React from 'react'
import { useContract, useContractRead, useContractEvents } from '@thirdweb-dev/react';

const RecentMints = ({ contract }) => {
    const { data: allEvents } = useContractEvents(contract, "Transfer");
    console.log(`All Events: ${JSON.stringify(allEvents)}`);
    const mintedToAddresses = allEvents ? allEvents.map(event => event.data ? event.data.to : null) : [];
    console.log(mintedToAddresses);
    const recentMints = mintedToAddresses.slice(0, 5);
    // const { data } = useContractRead(crazyFacesContract, 'getLastTokenID');
    // const lastIDMinted = data.toNumber();
    // console.log('LastIDMinted:', lastIDMinted);

    // const startID = lastIDMinted - 5 < 0 ? 1 : lastIDMinted - 5;

    return (
        <div className='recent-mints__container'>
            <div className='recent-mints__title'>
                Recent Transactions
            </div>
            {recentMints.map((to, index) => (
                // `key` prop is required by React for optimal performance when rendering lists.
                // The transaction index and 'to' address are displayed for each transaction.
                <div className='transaction__list' key={index}>
                    <span>CRAZYFACE #{recentMints.length - index}</span>
                    <p className='transaction__to'>{to}</p>
                    {/* Displaying the transaction number, starting from the most recent transaction. */}
                </div>
            ))}
        </div>
    )
}

export default RecentMints

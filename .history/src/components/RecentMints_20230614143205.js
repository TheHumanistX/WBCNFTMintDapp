import React from 'react'
import { useContract, useContractRead, useContractEvents } from '@thirdweb-dev/react';

const RecentMints = () => {

    const crazyFacesContractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const { contract: crazyFacesContract } = useContract(crazyFacesContractAddress);
    const { data: allEvents } = useContractEvents(crazyFacesContract);
    console.log(`All Events: ${JSON.stringify(allEvents)}`);
    // const { data } = useContractRead(crazyFacesContract, 'getLastTokenID');
    // const lastIDMinted = data.toNumber();
    // console.log('LastIDMinted:', lastIDMinted);

    // const startID = lastIDMinted - 5 < 0 ? 1 : lastIDMinted - 5;

    return (
        <div className='recent-mints__container'>

        </div>
    )
}

export default RecentMints

import React from 'react'
import { useContract, useContractRead } from '@thirdweb-dev/react';

const RecentMints = () => {

    const crazyFacesContractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    const { contract: crazyFacesContract } = useContract(crazyFacesContractAddress);

    const { data } = useContractRead(crazyFacesContract, 'getLastTokenID');
    const lastIDMinted = data.toNumber();
    console.log('LastIDMinted:', lastIDMinted);
    
    return (
        <div className='recent-mints__container'>

        </div>
    )
}

export default RecentMints

import React from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';

const LastMinted = ({ crazyFacesContract, lastID }) => {

    const { data: lastID } = useContractRead(crazyFacesContract, "getLastTokenID");

    return (
        <div className='last-minted__container'>
            Last Minted:

        </div>
    )
}

export default LastMinted

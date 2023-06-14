import React from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';

const LastMinted = ({ contract }) => {

    const { data: lastID } = useContractRead(contract, "getLastTokenID");

    return (
        <div className='last-minted__container'>
            Last Minted:

        </div>
    )
}

export default LastMinted

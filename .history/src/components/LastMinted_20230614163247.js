import React from 'react';
import { useContractRead } from '@thirdweb-dev/react';

const LastMinted = ({ crazyFacesContract, lastID }) => {
    const { data: nft } = useContractRead(crazyFacesContract, "tokenURI", [lastID]);
    console.log('NFT:', nft);

    return (
        <div className='last-minted__container'>
            Last Minted:

        </div>
    )
}

export default LastMinted

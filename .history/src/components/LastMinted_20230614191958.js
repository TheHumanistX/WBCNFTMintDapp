import React, { useEffect, useState } from 'react';
import { useContractRead } from '@thirdweb-dev/react';

const LastMinted = ({ crazyFacesContract, lastID }) => {
    const [nftData, setNftData] =useState(null);

    const { data: nft } = useContractRead(crazyFacesContract, "tokenURI", [lastID]);
    console.log('NFT:', nft);

    useEffect(() => {
        const ipfsUrl = (ipfsUrl) => {
            if (!ipfsUrl) return '';
            // Convert the ipfs URL to a HTTP URL
            return `https://ipfs.io/ipfs/${ipfsUrl.split('ipfs://')[1]}`;
        };

        const fetchNftData = async () => {

            if (nft) {
                const url = ipfsUrl(nft);
                const response = await fetch(url);
                const json = await response.json();
                setNftData(json);
            }
        };

        fetchNftData();
    }, [nft]);

    return (
        <div className='last-minted__container'>
            Last Minted:

        </div>
    )
}

export default LastMinted

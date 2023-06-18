import React, { useEffect, useState } from 'react';
import { useContractRead } from '@thirdweb-dev/react';

const LastMinted = ({ crazyFacesContract, lastID }) => {
    const [nftData, setNftData] = useState(null);

    const { data: nft } = useContractRead(crazyFacesContract, "tokenURI", [lastID > 0 ? lastID - 1 : 0]);

useEffect(() => {
    const ipfsUrl = (ipfsUrl) => {
        if (!ipfsUrl) return '';
        // Convert the ipfs URL to a HTTP URL
        return `https://ipfs.io/ipfs/${ipfsUrl.split('ipfs://')[1]}`;
    };

    const fetchNftData = async () => {
        if (!nft || !lastID || lastID < 1) return;
        const url = ipfsUrl(nft);
        const response = await fetch(url);
        const json = await response.json();
        setNftData(json);
    };

    fetchNftData();
}, [nft, lastID]);

    if (!nftData) return <div>Loading...</div>;

    return (
        <div className='last-minted__container'>
            <h1 className='last-minted__title'>Last Minted:</h1>
            <a href={'https://testnets.opensea.io/assets/goerli/0xf94a9747c20076d56f84320acf36431dae557fb7/' + (lastID - 1)}><img src={`https://ipfs.io/ipfs/${nftData.image.split('ipfs://')[1]}`} alt={nftData.name} className='lastMinted-nft' /></a>
            <span className='last-minted__name'><a href={'https://testnets.opensea.io/assets/goerli/0xf94a9747c20076d56f84320acf36431dae557fb7/' + (lastID - 1)}>#{lastID} {nftData.name}</a></span>
        </div>
    )
}

export default LastMinted

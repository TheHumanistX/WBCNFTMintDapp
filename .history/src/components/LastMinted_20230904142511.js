import React, {useCallback} from 'react';
// import { useContractRead } from '@thirdweb-dev/react';
import { useNft } from '../context';
import { useContract } from '../hooks/useContract';

const LastMinted = () => {
    const { crazyFacesContract } = useNft();

    // const { data: nft } = useContractRead(crazyFacesContract, "tokenURI", [lastID > 0 ? lastID - 1 : 0]);


    
    const ipfsUrl = useCallback((ipfsUrl) => {
        if (!ipfsUrl) return '';
        // Convert the ipfs URL to a HTTP URL
        return `https://ipfs.io/ipfs/${ipfsUrl.split('ipfs://')[1]}`;
    },[]);
    
    const fetchNftData = useCallback(async (nft, lastID) => {
        if (!nft || !lastID || lastID < 1) {
            console.log('Returning from fetchNftData function...')
            return;
        }
        const url = ipfsUrl(nft);
        const response = await fetch(url);
        const json = await response.json();
        return json;
    },[ipfsUrl]);
    
    
    const fetchLastMintedData = useCallback(async (contract) => {
        const lastID = await contract.getLastTokenID();
        const nft = await contract.tokenURI(lastID > 0 ? lastID - 1 : 0);
        const NftData = await fetchNftData(nft, lastID.toNumber());
        console.log('LastMinted nft: ', nft)
      
        return {
          lastID: lastID.toNumber(),
          nftData: NftData,
        };
      },[fetchNftData]);

    const { lastID, nftData } = useContract(crazyFacesContract, fetchLastMintedData);
    
    
    // useEffect(() => {
    //     console.log('Entered LastMinted second useEffect... values of crazyFacesContract and nft: ', crazyFacesContract, nft);
    //     if (crazyFacesContract && nft) {
    //         const ipfsUrl = (ipfsUrl) => {
    //             if (!ipfsUrl) return '';
    //             // Convert the ipfs URL to a HTTP URL
    //             return `https://ipfs.io/ipfs/${ipfsUrl.split('ipfs://')[1]}`;
    //         };

    //         const fetchNftData = async () => {
    //             console.log('Entering fetchNftData function in LastMinted.js...')
    //             console.log('fetchNftData nft, lastID: ', nft, lastID)
    //             if (!nft || !lastID || lastID < 1) {
    //                 console.log('Returning from fetchNftData function...')
    //                 return;
    //             }
    //             const url = ipfsUrl(nft);
    //             console.log('url: ' + url)
    //             const response = await fetch(url);
    //             const json = await response.json();
    //             setNftData(json);
    //             console.log('json: ' + json)
    //         };

    //         fetchNftData();
    //     }
    // }, [crazyFacesContract, nft, lastID]);

    if (!lastID) {
        return <div>Loading...</div>;
    }

    return (
        <div className='last-minted__container'>
            <span className='last-minted__title'>Last Minted:</span>
            {nftData &&
                <>
                    <a href={'https://testnets.opensea.io/assets/goerli/0xf94a9747C20076D56F84320aCF36431dAE557Fb7/' + (lastID - 1)}><img src={nftData.image ? `https://ipfs.io/ipfs/${nftData.image.split('ipfs://')[1]}` : ''} alt={nftData.name ? nftData.name : ''} className='lastMinted-nft' /></a>
                    <span className='last-minted__name'><a href={'https://testnets.opensea.io/assets/goerli/0xf94a9747c20076d56f84320acf36431dae557fb7/' + (lastID - 1)}>#{lastID} {nftData.name}</a></span>
                </>
            }
        </div>
    )
}

export default LastMinted
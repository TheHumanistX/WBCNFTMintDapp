import React, { useCallback } from 'react';
import { useNft } from '../context';
import { useContract } from '../hooks/useContract';

const LastMinted = () => {
    const { crazyFacesContract, totalSupply } = useNft()

    const ipfsUrl = useCallback((ipfsUrl) => {
        if (!ipfsUrl) return ''
        // Convert the ipfs URL to a HTTP URL
        return `https://ipfs.io/ipfs/${ipfsUrl.split('ipfs://')[1]}`
    }, []);

    const fetchNftData = useCallback(async (nft, lastID) => {
        console.log('fetchNftData - nft: ', nft, ' & lastID: ', lastID)
        if (!nft || lastID < 0) {
            console.log('Returning from fetchNftData function...')
            return
        }
        const url = ipfsUrl(nft)
        const response = await fetch(url)
        const json = await response.json()
        return json
    }, [ipfsUrl])


    const fetchLastMintedData = useCallback(async (contract) => {

        const lastID = totalSupply - 1
        console.log('LastMinted lastID: ', lastID)
        const nft = await contract.tokenURI(lastID > 0 ? lastID : 0)
        console.log('LastMinted nft: ', nft)
        const NftData = await fetchNftData(nft, lastID)
        console.log('LastMinted NftData: ', NftData)
        return {
            lastID: lastID,
            nftData: NftData,
        };

    }, [fetchNftData]);

    const { lastID, nftData } = useContract(crazyFacesContract, fetchLastMintedData)
    console.log('LastMinted - lastID: ', lastID, ' & nftData: ', nftData)
    if (!(lastID >= 0)) {
        return <div>Loading...</div>
    }

    console.log(`NFT Image: https://ipfs.io/ipfs/${nftData.image.split('ipfs://')[1]}`)

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

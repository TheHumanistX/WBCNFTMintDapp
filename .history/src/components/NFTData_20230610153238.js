import React, { useState } from 'react';
import { useContract, useNFTs } from '@thirdweb-dev/react';
import { crazyface3, crazyface19, crazyface41, crazyface43, crazyface67, crazyface71 } from '../assets';

import { SideMenu } from './';

const NFTData = () => {
    const contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    const [currentPage, setCurrentPage] = useState(0); // Initial page is 0
    const nftsPerPage = 250;

    const { contract } = useContract(contractAddress);
    const { data: nfts, isLoading, error } = useNFTs(contract, { start: currentPage * nftsPerPage, count: nftsPerPage });

    console.log(nfts);

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1); // Increase the current page by 1
        window.scrollTo(0, 0); // Scroll back to top
    };

    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); // Decrease the current page by 1 but don't go below 0
        window.scrollTo(0, 0); // Scroll back to top
    };

    return (
        <div className='hero'>
            <div className='crazyface__title'>
                <div className='title__one'>
                    <span className='crazyface__one'>CRAZY</span>
                </div>
                <div className='title__two'>
                    <span className='crazyface__two'>FACES</span>
                </div>
            </div>
            <img className='crazyface one' src={crazyface3} alt="crazyface3" />
            <img className='crazyface two' src={crazyface19} alt="crazyface19" />
            <img className='crazyface two' src={crazyface41} alt="crazyface41" />
            <img className='crazyface two' src={crazyface43} alt="crazyface43" />
            <img className='crazyface one' src={crazyface67} alt="crazyface67" />
            <img className='crazyface one' src={crazyface71} alt="crazyface71" />
            {/* <div className='button-div'>
            <button onClick={handlePrevious} disabled={currentPage === 0}>
                Previous
            </button>
            <button onClick={handleNext}>
                Next
            </button>
            </div> */}
            {/* <SideMenu /> */}
            {/* <div className="nft-grid">
                {nfts && nfts.map((nft) => (
                    <div className='nft-flex' key={nft.metadata.id}>
                        <img src={nft.metadata.image} alt={nft.metadata.name} />
                        <h3>Bored Ape #{nft.metadata.id}</h3>
                        <p>Owner: {nft.owner}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default NFTData;

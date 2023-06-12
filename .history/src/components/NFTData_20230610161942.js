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
                    <span className='turtlecat-collection'>A TURTLECAT COIN COLLECTION</span>
                </div>
            </div>
            <div className='mint-now'>
                <button className='mint-now__button'>
                    MINT NOW
                </button>
            </div>
            {/* <img className='crazyface one' src={crazyface3} alt="crazyface3" />
            <img className='crazyface two' src={crazyface19} alt="crazyface19" />
            <img className='crazyface three' src={crazyface41} alt="crazyface41" />
            <img className='crazyface four' src={crazyface43} alt="crazyface43" />
            <img className='crazyface five' src={crazyface67} alt="crazyface67" />
            <img className='crazyface six' src={crazyface71} alt="crazyface71" /> */}
        </div>
    );
};

export default NFTData;

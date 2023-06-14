import React from 'react';

import { crazyface3, crazyface19, crazyface41, crazyface43, crazyface67, crazyface71 } from '../assets';


import { SideMenu } from '.';

const NFTData = () => {
   
    
        // const handleNext = () => {
        //     setCurrentPage((prevPage) => prevPage + 1); // Increase the current page by 1
        //     window.scrollTo(0, 0); // Scroll back to top
        // };
    
        // const handlePrevious = () => {
        //     setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); // Decrease the current page by 1 but don't go below 0
        //     window.scrollTo(0, 0); // Scroll back to top
        // };
    // const [currentPage, setCurrentPage] = useState(0); // Initial page is 0
    // const nftsPerPage = 250;


    

    return (
        <div className='hero'>
            <div className='crazyface__title'>
                <div className='crazyface__title-one'>
                    <span className='crazyface__one'>CRAZY</span>
                </div>
                <div className='crazyface__title-two'>
                    <span className='crazyface__two'>FACES</span>
                    <span className='turtlecat-collection'>A TURTLECAT COIN COLLECTION</span>
                </div>
            </div>
            <div className='mint-now'>
                <button className='mint-now__button'>
                    <a href='#main__content'>MINT NOW</a>
                </button>
            </div>
            <img className='crazyface one' src={crazyface3} alt="crazyface3" />
            <img className='crazyface two' src={crazyface19} alt="crazyface19" />
            <img className='crazyface three' src={crazyface41} alt="crazyface41" />
            <img className='crazyface four' src={crazyface43} alt="crazyface43" />
            <img className='crazyface five' src={crazyface67} alt="crazyface67" />
            <img className='crazyface six' src={crazyface71} alt="crazyface71" />
        </div>
    );
};

export default NFTData;

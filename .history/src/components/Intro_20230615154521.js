import React from 'react';

import { crazyface3, crazyface19, crazyface41, crazyface43, crazyface67, crazyface71 } from '../assets';

const NFTData = () => {

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

import React from 'react'
import { ConnectWallet } from '@thirdweb-dev/react';
import { LastMinted, MintBox, MintWBCBox, RecentMints, Shares } from './';
import { useNft } from '../context';

const Main = () => {

    const { totalSupply } = useNft();

    return (
        <div id='main__content' className='main__content-grid'>

            <MintBox />
            <div className='main__title'>
                <div className='main__title-one'>
                    <span className='title__one'>CRAZY</span>
                </div>
                <div className='main__title-two'>
                    <span className='title__two'>FACES</span>
                </div>
            </div>
            <div className='connect-wallet__container'>
                <ConnectWallet className='connect-wallet' />
            </div>
            {totalSupply &&
                <>
                    <LastMinted />

                    <MintWBCBox />

                    <RecentMints />

                    <Shares />
                </>
            }

        </div>
    )
}

export default Main

import React from 'react'
import { ConnectWallet } from '@thirdweb-dev/react';
import { LastMinted, MintBox, MintWBCBox, RecentMints, Shares } from './';

const Main = () => {

    // const [lastID, setLastID] = useState(null)

    // const crazyFacesContractAddress = '0xf94a9747C20076D56F84320aCF36431dAE557Fb7';
    // const mintContractAddress = '0x43247D35a25d97ebe1360030b8Da2CE5Dfe7FAd6';
    // const tokenContractAddress = '0xFB29697113015019c42E90fdBC94d9B4898D2602';
    // const walletAddress = useAddress();
    // const { contract: crazyFacesContract } = useContract(crazyFacesContractAddress);
    // const { contract: mintContract } = useContract(mintContractAddress);
    // const { contract: tokenContract } = useContract(tokenContractAddress);


    // useEffect(() => {
    //     const fetchLastID = async () => {
    //         if (crazyFacesContract) {
    //             const lastID = await crazyFacesContract.getLastTokenID();
    //             console.log('lastID: ' + lastID)
    //             setLastID(lastID);
    //         }
    //     }
    //     fetchLastID();
    // }, [crazyFacesContract]);

    // const { data } = useContractRead(crazyFacesContract, "getLastTokenID");
    // const lastID = data ? data.toNumber() : '';

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

            <LastMinted />

            <MintWBCBox />

            <RecentMints />

            <Shares />

        </div>
    )
}

export default Main

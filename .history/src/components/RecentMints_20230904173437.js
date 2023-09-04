import React, { useCallback } from 'react';
import { useEthers, useNft } from '../context';
import { useContract } from '../hooks/useContract';

const RecentMints = () => {
  const { network, provider } = useEthers();
  const { mintContract, crazyFacesContract, totalSupply } = useNft();
  const startBlockForEvents = 8704594;
  
  const fetchEvents = useCallback(async (contract) => {

    if (crazyFacesContract) {
      // const filter = contract && contract.filters.NFTBought();
      // await provider.send("eth_requestAccounts", [])

      // const logs = await provider.getLogs({
      //   fromBlock: startBlockForEvents,
      //   toBlock: "latest",
      //   address: contract.address,
      //   topics: filter.topics,
      // });
      // const parsedLogs = logs.map((log) => contract.interface.parseLog(log));
      // const mintEvents = parsedLogs
      //   ? parsedLogs
      //     .map(event => (event.args[0]))
      //   : [];
      
      const lastID = totalSupply - 1
      console.log('RecentMints - lastID: ', lastID)
      const numberToShow = lastID > 4 ? 5 : lastID
      console.log('RecentMints - numberToShow: ', numberToShow)
      let mintEvents = []

      for (let i = lastID; i >= lastID - numberToShow; i--) {
        const mintEventObject = {
          tokenId: i,
          owner: await crazyFacesContract.ownerOf(i),
        }
        mintEvents.push(mintEventObject)
      }
      console.log('RecentMints - mintEvents: ', mintEvents)

      const recentMints = mintEvents.length >= 5 ? mintEvents.reverse().slice(0, 5) : mintEvents.reverse();
      console.log('RecentMints - Made past reverse and slice: ')
      return { mintEvents, recentMints };
    } else {
      console.log('Switched to a network other than Goerli. Unable to fetch logs.');
    }
  }, [provider]);

  const contractValues = useContract(crazyFacesContract, fetchEvents);
  const { mintEvents, recentMints } = contractValues ?? {};

  console.log('Recent Mints - after contractValues mintEvents: ', mintEvents.reverse(), ' & recentMints: ', recentMints);

  return (
    <div className='recent-mints__container'>
      <div className='recent-mints__title'>
        RECENT TRANSACTIONS
      </div>
      {mintEvents && mintEvents.map((mint, index) => {

        const getNftID = mint.tokenId;
        console.log('getNftID: ', getNftID)
        return (
          // `key` prop is required by React for optimal performance when rendering lists.
          // The transaction index and 'to' address are displayed for each transaction.
          <div className='transaction__list' key={index}>
            <span><a href={'https://testnets.opensea.io/assets/goerli/0xf94a9747c20076d56f84320acf36431dae557fb7/' + (getNftID)}>CRAZYFACE #{getNftID + 1}</a></span>
            <p className='transaction__to'><a href={'https://goerli.etherscan.io/address/' + mint.owner}>{mint.owner}</a></p>
            {/* Displaying the transaction number, starting from the most recent transaction. */}
          </div>
        )

      }
      )}

    </div>
  )
}

export default RecentMints

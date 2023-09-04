import React, { useCallback } from 'react';
// import { useContractEvents } from '@thirdweb-dev/react'
import { useEthers, useNft } from '../context';
import { useContract } from '../hooks/useContract';

const RecentMints = () => {
  const { network, provider } = useEthers();
  const { mintContract } = useNft();
  const startBlockForEvents = 8704594;
  // const [mintEvents, setMintEvents] = useState(null);
  // const [recentMints, setRecentMints] = useState(null);
  // const [getNftID, setGetNftID] = useState(null);
  // const { data: allTransferEvents } = useContractEvents(crazyFacesContract, "Transfer", {
  //   queryFilter: {
  //     fromBlock: 8904594,
  //   },
  //   subscribe: true
  // });
  // console.log('allTransferEvents: ', allTransferEvents)


  const fetchEvents = useCallback(async (contract) => {

    if (network.chainId === 5) {
      const filter = contract && contract.filters.NFTBought();
      await provider.send("eth_requestAccounts", [])

      const logs = await provider.getLogs({
        fromBlock: startBlockForEvents,
        toBlock: "latest",
        address: contract.address,
        topics: filter.topics,
      });
      const parsedLogs = logs.map((log) => contract.interface.parseLog(log));
      const mintEvents = parsedLogs
        ? parsedLogs
          .map(event => (event.args[0]))
        : [];
      const recentMints = mintEvents.reverse().slice(0, 5);
      return { mintEvents, recentMints };
    } else {
      console.log('Switched to a network other than Goerli. Unable to fetch logs.');
    }
  }, [provider]);

  const contractValues = useContract(mintContract, fetchEvents);
  const { mintEvents, recentMints } = contractValues ?? {};

  // const mintEvents = allTransferEvents
  // ? allTransferEvents
  //     .filter(event => event.data.from === '0x0000000000000000000000000000000000000000')
  //     .map(event => ({ to: event.data.to, tokenId: event.data.tokenId.toNumber() }))
  //   : [];
  // console.log('mintEvents: ', mintEvents)



  return (
    <div className='recent-mints__container'>
      <div className='recent-mints__title'>
        RECENT TRANSACTIONS
      </div>
      {recentMints && recentMints.map((mint, index) => {

        const getNftID = (index) => mintEvents.length - (index + 1);
        return (
          // `key` prop is required by React for optimal performance when rendering lists.
          // The transaction index and 'to' address are displayed for each transaction.
          <div className='transaction__list' key={index}>
            <span><a href={'https://testnets.opensea.io/assets/goerli/0xf94a9747c20076d56f84320acf36431dae557fb7/' + (getNftID(index))}>CRAZYFACE #{getNftID(index - 1)}</a></span>
            <p className='transaction__to'><a href={'https://goerli.etherscan.io/address/' + mint}>{mint}</a></p>
            {/* Displaying the transaction number, starting from the most recent transaction. */}
          </div>
        )

      }
      )}

    </div>
  )
}

export default RecentMints

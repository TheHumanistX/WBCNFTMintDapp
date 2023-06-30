import React, { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import { useContractEvents } from '@thirdweb-dev/react'
import abi from '../abi/abi';

const RecentMints = ({ crazyFacesContract }) => {
  const { data: allTransferEvents } = useContractEvents(crazyFacesContract, "Transfer");

  const mintEvents = allTransferEvents
  ? allTransferEvents
      .filter(event => event.data.from === '0x0000000000000000000000000000000000000000')
      .map(event => ({ to: event.data.to, tokenId: event.data.tokenId.toNumber() }))
  : [];
  console.log('mintEvents length: ', mintEvents.length);
  console.log('mintEvents: ', mintEvents);
const recentMints = mintEvents.slice(-5).reverse();
  console.log('allTransferEvents', allTransferEvents);
  const getNftID = (index) => mintEvents.length - (mintEvents.length - recentMints.length + index);

  return (
      <div className='recent-mints__container'>
          <div className='recent-mints__title'>
              RECENT TRANSACTIONS
          </div>
          {recentMints.map((mint, index) => (
              // `key` prop is required by React for optimal performance when rendering lists.
              // The transaction index and 'to' address are displayed for each transaction.
              <div className='transaction__list' key={index}>
                  <span><a href={'https://testnets.opensea.io/assets/goerli/0xf94a9747c20076d56f84320acf36431dae557fb7/' + (getNftID(index) - 1)}>CRAZYFACE #{getNftID(index)}</a></span>
                  <p className='transaction__to'><a href={'https://goerli.etherscan.io/address/' + mint.to}>{mint.to}</a></p>
                  {/* Displaying the transaction number, starting from the most recent transaction. */}
              </div>
          ))}
      </div>
  )
}

export default RecentMints

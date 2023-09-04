/**
 * A custom React hook for interacting with an Ethereum contract.
 *
 * This hook combines the useEffect and useState hooks to form a custom hook 
 * that can be used for interacting with Ethereum contracts. It abstracts 
 * away the logic of calling contract functions and handling responses.
 *
 * It requires an ethers.js contract instance and a function that makes the 
 * desired call to the contract and returns a promise that resolves to the response.
 *
 * It returns the data received from the contract call. 
 * It initializes as null and gets updated once the contract call has 
 * been completed. 
 *
 * Note that the hook relies on the provided callback to make the contract call. 
 * It's necessary to ensure this callback is a function that does indeed 
 * interact with the contract and return a promise. 
 *
 * useEffect is used to trigger the contract interaction as soon as the 
 * component mounts and whenever the contract or callback function changes.
 */

import { useEffect, useState } from 'react';

export const useContract = (contract, callback) => {

  const [data, setData] = useState({});

  useEffect(() => {
    console.log('useEffect in useContract triggered....')
    if (!contract || !callback) {
      return;
    }
    const fetchData = async () => {
      if (contract) {
        const response = await callback(contract);
        setData(response);
      }
    }
    fetchData();
  }, [contract, callback]);

  return data;
};
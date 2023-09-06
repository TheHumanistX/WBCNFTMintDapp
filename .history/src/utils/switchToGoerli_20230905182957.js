import { ethers } from 'ethers';

export const switchToGoerli = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const GOERLI_CHAIN_ID = '0x5'; // Chain ID for Goerli

      await provider.send("wallet_switchEthereumChain", [{ chainId: GOERLI_CHAIN_ID }]);
    } catch (err) {
      if (err.code === 4902) {
        try {
          // If the chain is not added, add it.
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x5',
                chainName: 'Goerli',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
                blockExplorerUrls: ['https://goerli.etherscan.io'],
              },
            ],
          });
        } catch (addError) {
          console.log('Was not able to add Goerli chain to your MetaMask: ', addError)
        }
      }
      console.log('Error switching to Goerli: ', err)
    }
  };